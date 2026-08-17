import Joi from 'joi';
// Підключаємо Joi для перевірки даних, які приходять від користувача.

export const addContactSchema = Joi.object({
  // Схема для створення нового контакту.

  name: Joi.string().required(),
  // name повинен бути рядком і є обов'язковим.

  email: Joi.string().email().required(),
  // email повинен бути валідною email-адресою і є обов'язковим.

  phone: Joi.string().required(),
  // phone повинен бути рядком і є обов'язковим.
});

export const updateContactSchema = Joi.object({
  // Схема для оновлення контакту.

  name: Joi.string(),
  // name можна передавати, але для PUT він не обов'язковий.

  email: Joi.string().email(),
  // email можна передавати, але якщо передали — він має бути валідним.

  phone: Joi.string(),
  // phone також необов'язковий.
});
