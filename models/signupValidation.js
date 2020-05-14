const Joi = require("joi");

const signupValidation = (data) => {
  const schema = {
    first_name: Joi.string().min(4).max(50).trim().required(),
    last_name: Joi.string().trim().min(4).max(50).required(),
    email: Joi.string().email().min(5).max(150).trim().required(),
    password: Joi.string().min(6).required(),
    phone_number: Joi.string().min(11).required(),
    address: Joi.string().trim().min(6).max(150).required(),
    city: Joi.string().trim().min(4).max(50).required(),
  };
  return Joi.validate(data, schema);
};
module.exports = signupValidation;
