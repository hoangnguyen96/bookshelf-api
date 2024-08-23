import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

/**
 * Clear error message when the users typing
 */
export const clearErrorOnChange = <T extends FieldValues>(
  fieldName: Path<T>,
  errors: FieldErrors<T>,
  clearErrorFunc: UseFormClearErrors<T>
): void => {
  errors[fieldName]?.message && clearErrorFunc(fieldName);
};

export const generateSevenDigitUUID = () => {
  const uuid = uuidv4().replace(/\D/g, "");
  return uuid.slice(0, 7);
};
