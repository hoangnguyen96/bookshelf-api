"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";

// Constants
import { MESSAGES } from "@app/constants";

// Models
import { BookType } from "@app/interface";

// Api
import { generateImageUpload } from "@app/features/dashboard/actions";

// Utils
import { clearErrorOnChange, isEnableSubmitButton } from "@app/utils";
import { UploadIcon } from "@app/assets/icons";
import { Button, Input } from "../common";
import isEqual from "react-fast-compare";

interface FormContributeProps {
  itemUpdate?: Partial<BookType>;
  onSubmit?: (book: Partial<BookType>) => void;
  onUpdate?: (id: string, book: Partial<BookType>) => void;
}

const FormContribute = ({
  itemUpdate,
  onSubmit,
  onUpdate,
}: FormContributeProps) => {
  const {
    id,
    title,
    author,
    category,
    imageUrl,
    description,
    createdDate,
    edition,
    publicationYear,
    rating,
    status,
  } = itemUpdate || {};
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    selectedImage ? URL.createObjectURL(selectedImage) : imageUrl || null
  );

  const REQUIRED_FIELDS = [
    "title",
    "author",
    "category",
    "imageUrl",
    "description",
  ];

  const formInitData: Partial<BookType> = useMemo(
    () => ({
      title: title || "",
      author: author || "",
      category: category || "",
      imageUrl: imageUrl || "",
      description: description || "",
    }),
    [title, author, category, description]
  );

  const {
    control,
    clearErrors,
    handleSubmit: submitForm,
    formState: { errors, isValid, dirtyFields, isSubmitting },
    reset,
  } = useForm<Partial<BookType>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: formInitData,
  });

  const dirtyItems = Object.keys(dirtyFields);

  const shouldEnable = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors]
  );

  const isDisableSubmit = !(shouldEnable || isValid);

  const handleFormSubmit = async (dataBook: Partial<BookType>) => {
    try {
      if (itemUpdate) {
        let finalImageUrl = imageUrl;
        if (selectedImage) {
          const data = await generateImageUpload(selectedImage as File);
          if (data.success) {
            finalImageUrl = data.data.url;
          } else {
            throw new Error("Upload failed:", data.error.message);
          }
        }
        onUpdate?.(id as string, {
          ...dataBook,
          createdDate,
          edition,
          publicationYear,
          rating,
          status,
          imageUrl: finalImageUrl,
        });

        return;
      }

      const data = await generateImageUpload(selectedImage as File);

      if (data.success) {
        onSubmit?.({
          ...dataBook,
          status: false,
          publicationYear: new Date().getFullYear(),
          rating: 0,
          createdDate: new Date().toISOString(),
          edition: "first",
          imageUrl: data.data.url,
        });
        reset();
        setSelectedImage(null);
        setImagePreview(null);
        return;
      } else {
        throw new Error("Error add book!");
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return MESSAGES.RESPONSE_ERROR;
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    reset(formInitData);
  }, [itemUpdate, reset, formInitData]);

  return (
    <Box as="form" pos="relative">
      <Flex justifyContent="space-between" gap="37px">
        <Flex
          flexDir="column"
          alignItems="center"
          gap="10px"
          width="100%"
          maxW={{ base: "unset", "2xl": 360 }}
        >
          {/* Book name */}
          <FormControl
            w="100%"
            isInvalid={!!errors.title}
            mb={errors.title?.message ? "0" : "22px"}
          >
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{
                required: MESSAGES.FIELD_REQUIRED,
              }}
              render={({
                field: { value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  id="title"
                  value={value}
                  placeholder="Book name"
                  isInvalid={!!error?.message}
                  onChange={(e) => {
                    onChange(e);
                    clearErrorOnChange("title", errors, clearErrors);
                  }}
                  {...rest}
                />
              )}
            />
            <FormErrorMessage pl="10px">
              {errors.title?.message && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          {/* Author name */}
          <FormControl
            w="100%"
            isInvalid={!!errors.author}
            mb={errors.author?.message ? "0" : "22px"}
          >
            <Controller
              name="author"
              control={control}
              defaultValue=""
              rules={{
                required: MESSAGES.FIELD_REQUIRED,
              }}
              render={({
                field: { value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  id="author"
                  value={value}
                  placeholder="Author Name"
                  isInvalid={!!error?.message}
                  onChange={(e) => {
                    onChange(e);
                    clearErrorOnChange("author", errors, clearErrors);
                  }}
                  {...rest}
                />
              )}
            />
            <FormErrorMessage pl="10px">
              {errors.author?.message && errors.author.message}
            </FormErrorMessage>
          </FormControl>

          {/* Reason */}
          <FormControl
            w="100%"
            h="130px"
            isInvalid={!!errors.description}
            mb={errors.description?.message ? "0" : "12px"}
          >
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({
                field: { value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Textarea
                  h="100%"
                  value={value}
                  border="1px solid"
                  borderColor="borderDefault"
                  placeholder="Reason For Your Contribution"
                  _placeholder={{ color: "dark.60" }}
                  _focusVisible={{ boxShadow: "unset" }}
                  onChange={(e) => {
                    onChange(e);
                    clearErrorOnChange("author", errors, clearErrors);
                  }}
                  {...rest}
                />
              )}
            />
            <FormErrorMessage pl="10px">
              {errors.description?.message && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex flexDir="column">
          {/* Category */}
          <FormControl
            maxW={170}
            w="100%"
            isInvalid={!!errors.category}
            mb={errors.category?.message ? "0" : "22px"}
          >
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{
                required: MESSAGES.FIELD_REQUIRED,
              }}
              render={({
                field: { value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <Select
                  data-testid="contribute-category"
                  placeholder="Category"
                  border="1px"
                  borderRadius="40px"
                  value={value}
                  w="100%"
                  h="50px"
                  borderColor="borderDefault"
                  bgColor="var(--chakra-colors-chakra-body-bg)"
                  aria-label="select-category"
                  _focusVisible={{ borderColor: "borderDefault" }}
                  onChange={(e) => {
                    onChange(e);
                    clearErrorOnChange("category", errors, clearErrors);
                  }}
                >
                  <Box as="option" value="SelfHelpBook">
                    SelfHelpBook
                  </Box>
                  <Box as="option" value="TextBook">
                    TextBook
                  </Box>
                </Select>
              )}
            />
            <FormErrorMessage pl="10px">
              {errors.category?.message && errors.category.message}
            </FormErrorMessage>
          </FormControl>

          {/* Upload Image */}
          <FormControl
            maxW={170}
            w="100%"
            isInvalid={!!errors.imageUrl}
            mb={errors.imageUrl?.message ? "0" : "12px"}
          >
            <Controller
              name="imageUrl"
              control={control}
              defaultValue=""
              rules={{
                required: MESSAGES.FIELD_REQUIRED,
              }}
              render={({
                field: { value, onChange, ...rest },
                fieldState: { error },
              }) => (
                <>
                  <FormLabel
                    htmlFor="fileInput"
                    cursor="pointer"
                    data-testid="fileInput"
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview || ""}
                        alt="Upload Image"
                        width={100}
                        height={100}
                        style={{ margin: "0 auto" }}
                        priority={true}
                        fetchPriority="high"
                      />
                    ) : (
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        w={176}
                        h={63}
                        bgColor="backgroundUpload"
                        borderRadius="20px"
                      >
                        <UploadIcon />
                      </Flex>
                    )}
                  </FormLabel>
                  <Input
                    data-testid="input-file-contribute"
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e);
                      handleFileChange(e);
                      clearErrorOnChange("author", errors, clearErrors);
                    }}
                    display="none"
                  />
                </>
              )}
            />
            <FormErrorMessage pl="10px">
              {errors.imageUrl?.message && errors.imageUrl.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>

      <Button
        data-testid="submit-contribute"
        type="submit"
        size="xl"
        text={itemUpdate ? "Update" : "Submit"}
        my="40px"
        isLoading={isSubmitting}
        isDisabled={isDisableSubmit || isSubmitting}
        onClick={submitForm(handleFormSubmit)}
      />
    </Box>
  );
};

const areEqual = (
  prevProps: FormContributeProps,
  nextProps: FormContributeProps
) => {
  return isEqual(prevProps.itemUpdate, nextProps.itemUpdate);
};

export default memo(FormContribute, areEqual);
