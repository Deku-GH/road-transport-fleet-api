import joi from "joi";

export const signUpSchema = joi.object({
  firstname: joi.string().required().messages({
    "string.base": "Le prénom doit être une chaîne de caractères.",
    "string.empty": "Le prénom est obligatoire.",
    "any.required": "Le prénom est obligatoire.",
  }),

  lastname: joi.string().required().messages({
    "string.base": "Le nom doit être une chaîne de caractères.",
    "string.empty": "Le nom est obligatoire.",
    "any.required": "Le nom est obligatoire.",
  }),

  email: joi.string().email().lowercase().required().messages({
    "string.base": "L'adresse email doit être une chaîne de caractères.",
    "string.empty": "L'adresse email est obligatoire.",
    "string.email": "L'adresse email n'est pas valide.",
    "any.required": "L'adresse email est obligatoire.",
  }),

  password: joi
    .string()
    .min(6)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$!%*?&])[A-Za-z\d#$!%*?&]+$/,
    )
    .required()
    .messages({
      "string.base": "Le mot de passe doit être une chaîne de caractères.",
      "string.empty": "Le mot de passe est obligatoire.",
      "string.min": "Le mot de passe doit contenir au moins 6 caractères.",
      "string.pattern.base":
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
      "any.required": "Le mot de passe est obligatoire.",
    }),
});
