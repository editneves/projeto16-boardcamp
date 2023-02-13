import joi from "joi";

export const customersSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11).regex(/^[0-9]+$/).required(),
  cpf:joi.string().length(11).regex(/^[0-9]+$/).required(),
  birthday: joi.date().required(),
});
