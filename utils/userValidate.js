const Joi = require("joi");
const regexPhoneNumber = /^\(\d{3}\)\d{3}-\d{4}$/;

exports.validateData = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().trim().min(3).max(30).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().regex(regexPhoneNumber).required(),
      favorite: Joi.boolean(),
    })
    .validate(data);
