"use client";

import { avatar } from "@app/assets/images";
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Image uploaded successfully:", data.data.url);
      } else {
        console.error("Upload failed:", data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} encType="multipart/form-data">
      <FormControl id="myFile" mb={4}>
        <FormLabel htmlFor="fileInput">
          <Image
            src={imagePreview || avatar}
            alt="Upload"
            width={100}
            height={100}
          />
        </FormLabel>
        <Input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          display="none"
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Upload Image
      </Button>
    </Box>
  );
};

export default ImageUploadForm;
