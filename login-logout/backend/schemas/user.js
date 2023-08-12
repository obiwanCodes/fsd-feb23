import Joi from "joi";
import { tlds } from "@hapi/tlds";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userSignupSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: tlds },
    })
    .required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: tlds },
    })
    .required(),
  password: Joi.string().pattern(passwordRegex).required(),
});

export { userSignupSchema, userLoginSchema };
