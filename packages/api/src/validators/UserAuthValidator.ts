import { object, string } from "zod";

export default () =>
  object({
    email: string()
      .email({ message: "The email fieldmust be a valid email address" })
      .min(1, { message: "The email field is required" })
      .max(255, {
        message: "The email field must be less than 255 characters",
      }),
    password: string()
      .min(8, {
        message: "The password field must have 8 characters or more",
      })
      .max(255, {
        message: "The password field must be less than 255 characters",
      }),
  });
