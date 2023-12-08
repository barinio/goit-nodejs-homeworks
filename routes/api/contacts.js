const Joi = require("joi");

const express = require("express");
const app = express();

app.use(express.json());

const contactsData = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().integer().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await contactsData.listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await contactsData.getContactById(req.params.contactId);

    if (!contactById) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const result = schema.validate(req.body);

  try {
    if (result.error) {
      throw HttpError(400, "missing required name field");
    }

    const newContact = await contactsData.addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const isExist = await contactsData.getContactById(req.params.contactId);
    if (!isExist) {
      throw HttpError(404, "Not found");
    }

    await contactsData.removeContact(req.params.contactId);

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const result = schema.validate(req.body);

  try {
    if (result.error) {
      throw HttpError(400, "missing fields");
    }

    const isExist = await contactsData.getContactById(id);
    if (!isExist) {
      throw HttpError(404, "Not found");
    }

    const updateData = await contactsData.updateContact(id, req.body);

    res.status(200).json(updateData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
