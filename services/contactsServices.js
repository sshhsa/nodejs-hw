import fs from 'fs/promises';
// Імпортуємо promises-версію fs для асинхронного читання та запису файлів.

import { randomUUID } from 'crypto';
// randomUUID буде створювати унікальний id для нового контакту.

const contactsPath = new URL('../db/contacts.json', import.meta.url);
// Створюємо правильний абсолютний шлях до файлу contacts.json.

const listContact = async () => {
  // Функція повертає всі контакти.

  const data = await fs.readFile(contactsPath, 'utf-8');
  // Читаємо contacts.json і отримуємо його вміст як текст.

  const contacts = JSON.parse(data);
  // Перетворюємо JSON-текст у звичайний JavaScript-масив.

  return contacts;
  // Повертаємо масив контактів.
};

const getContactById = async (contactId) => {
  // Функція отримує id контакту, який треба знайти.

  const contacts = await listContact();
  // Отримуємо всі контакти.

  const contact = contacts.find((item) => item.id === contactId);
  // Шукаємо один контакт, id якого збігається з contactId.

  return contact;
  // Повертаємо знайдений контакт або undefined, якщо його немає.
};

const removeContact = async (contactId) => {
  // Функція видаляє контакт за id.

  const contacts = await listContact();
  // Отримуємо всі контакти.

  const index = contacts.findIndex((item) => item.id === contactId);
  // Знаходимо індекс потрібного контакту в масиві.

  if (index === -1) {
    // findIndex повертає -1, якщо контакт не знайдено.

    return null;
    // Повідомляємо контролеру, що такого контакту немає.
  }

  const [removedContact] = contacts.splice(index, 1);
  // Видаляємо один контакт із масиву та зберігаємо видалений об'єкт.

  await fs.writeFile(
    // Записуємо оновлений масив назад у contacts.json.

    contactsPath,
    // Вказуємо файл, куди потрібно записати дані.

    JSON.stringify(contacts, null, 2)
    // Перетворюємо JS-масив назад у JSON-текст із гарними відступами.
  );

  return removedContact;
  // Повертаємо видалений контакт.
};

const addContact = async (body) => {
  // Функція створює новий контакт із даних body.

  const contacts = await listContact();
  // Отримуємо існуючі контакти.

  const newContact = {
    // Створюємо новий об'єкт контакту.

    id: randomUUID(),
    // Генеруємо новий унікальний id.

    ...body,
    // Додаємо name, email та phone із body.
  };

  contacts.push(newContact);
  // Додаємо новий контакт у масив.

  await fs.writeFile(
    // Перезаписуємо contacts.json.

    contactsPath,
    // Шлях до файлу.

    JSON.stringify(contacts, null, 2)
    // Перетворюємо оновлений масив у JSON.
  );

  return newContact;
  // Повертаємо створений контакт контролеру.
};

const updateContact = async (contactId, body) => {
  // Функція оновлює існуючий контакт.

  const contacts = await listContact();
  // Отримуємо всі контакти.

  const index = contacts.findIndex((item) => item.id === contactId);
  // Шукаємо індекс контакту за id.

  if (index === -1) {
    // Якщо контакт не знайдено.

    return null;
    // Повертаємо null контролеру.
  }

  const updatedContact = {
    // Створюємо оновлений об'єкт.

    ...contacts[index],
    // Спочатку беремо всі старі значення контакту.

    ...body,
    // Потім замінюємо тільки ті поля, які прийшли в body.

    id: contacts[index].id,
    // Гарантуємо, що id контакту залишиться старим.
  };

  contacts[index] = updatedContact;
  // Замінюємо старий контакт у масиві на оновлений.

  await fs.writeFile(
    // Записуємо зміни у файл.

    contactsPath,
    // Шлях до contacts.json.

    JSON.stringify(contacts, null, 2)
    // Перетворюємо масив у JSON.
  );

  return updatedContact;
  // Повертаємо оновлений контакт.
};

export default {
  // Експортуємо всі функції одним об'єктом contactsService.

  listContact,
  // Отримати всі контакти.

  getContactById,
  // Отримати один контакт.

  removeContact,
  // Видалити контакт.

  addContact,
  // Створити контакт.

  updateContact,
  // Оновити контакт.
};
