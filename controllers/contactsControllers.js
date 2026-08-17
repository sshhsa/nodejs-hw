import contactsService from '../services/contactsServices.js';
// Імпортуємо всі функції для роботи з contacts.json.

import {
  addContactSchema,
  updateContactSchema,
} from '../schemas/contactsSchemas.js';
// Імпортуємо Joi-схеми для POST та PUT.

export const getAllContacts = async (req, res) => {
  // Контролер для GET /api/contacts.

  const contacts = await contactsService.listContact();
  // Просимо service отримати всі контакти.

  res.status(200).json(contacts);
  // Відправляємо масив контактів зі статусом 200.
};

export const getOneContact = async (req, res) => {
  // Контролер для GET /api/contacts/:id.

  const { id } = req.params;
  // Беремо id із параметрів URL.

  const contact = await contactsService.getContactById(id);
  // Передаємо id у service і шукаємо контакт.

  if (!contact) {
    // Якщо service нічого не знайшов.

    return res.status(404).json({ message: 'Not found' });
    // Повертаємо 404 та потрібний JSON.
  }

  res.status(200).json(contact);
  // Якщо контакт знайдений — повертаємо його зі статусом 200.
};

export const deleteContact = async (req, res) => {
  // Контролер для DELETE /api/contacts/:id.

  const { id } = req.params;
  // Отримуємо id контакту з URL.

  const contact = await contactsService.removeContact(id);
  // Просимо service видалити контакт.

  if (!contact) {
    // Якщо service повернув null.

    return res.status(404).json({ message: 'Not found' });
    // Відповідаємо статусом 404.
  }

  res.status(200).json(contact);
  // Якщо видалення успішне — повертаємо видалений контакт.
};

export const createContact = async (req, res) => {
  // Контролер для POST /api/contacts.

  const { error } = addContactSchema.validate(req.body);
  // Перевіряємо body за Joi-схемою.

  if (error) {
    // Якщо name, email або phone відсутні чи невалідні.

    return res.status(400).json({ message: error.message });
    // Повертаємо статус 400 та текст помилки Joi.
  }

  const newContact = await contactsService.addContact(req.body);
  // Передаємо валідний body у service для створення контакту.

  res.status(201).json(newContact);
  // Повертаємо створений контакт зі статусом 201 Created.
};

export const updateContact = async (req, res) => {
  // Контролер для PUT /api/contacts/:id.

  const { id } = req.params;
  // Беремо id контакту з URL.

  if (Object.keys(req.body).length === 0) {
    // Перевіряємо, чи передано хоча б одне поле в body.

    return (
      res
        // Починаємо формування відповіді.

        .status(400)
        // Встановлюємо статус Bad Request.

        .json({ message: 'Body must have at least one field' })
    );
    // Повертаємо саме повідомлення, яке вимагає завдання.
  }

  const { error } = updateContactSchema.validate(req.body);
  // Перевіряємо передані поля через Joi.

  if (error) {
    // Якщо якесь із переданих полів невалідне.

    return res.status(400).json({ message: error.message });
    // Повертаємо 400 та текст помилки.
  }

  const contact = await contactsService.updateContact(id, req.body);
  // Передаємо id та нові дані у service.

  if (!contact) {
    // Якщо контакту з таким id немає.

    return res.status(404).json({ message: 'Not found' });
    // Повертаємо 404.
  }

  res.status(200).json(contact);
  // Повертаємо оновлений контакт зі статусом 200.
};
