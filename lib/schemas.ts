import { z } from "zod";

/**
 * Form validation schema for the register user form.
 *
 */
export const registerUserFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    passwordConfirmation: z.string().min(1, {
      message: "Password confirmation is required",
    }),
  })
  /**
   * Ensures the password confirmation matches the password.
   *
   * This refinement will check if the password confirmation matches the password.
   * If it does not, it will return an error with the message "Password confirmation
   * must match password" and set the path to ["passwordConfirmation"].
   *
   * @see https://zod.dev/?id=refine
   */
  .refine((ctx) => ctx.password === ctx.passwordConfirmation, {
    message: "Password confirmation must match password",
    path: ["passwordConfirmation"],
  });

/**
 * Form validation schema for the login user form.
 */
export const loginUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});
