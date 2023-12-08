const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { randomUUID } = require("crypto");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contactsData = await listContacts();
  const contactById = contactsData.find((contact) => contact.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();

  const filteredList = await contactsList.filter((i) => i.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(filteredList, null, 2));
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: randomUUID(), name, email, phone };

  await fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, newContact], null, 2)
  );
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();

  const updatedContact = { id: contactId, name, email, phone };

  const index = contacts.findIndex((contact) => contact.id === contactId);
  const newContacts = [...contacts];
  newContacts[index] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
