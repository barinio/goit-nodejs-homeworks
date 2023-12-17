const express = require('express');

const ctrl = require('../../controllers');
const { schemas } = require('../../models/contactModel');
const { validBody, isValidId } = require('../../middlewares/');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', validBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', isValidId, ctrl.removeContact);

router.put('/:id', isValidId, validBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', isValidId, validBody(schemas.updStutusSchema), ctrl.updateStatusContact);

module.exports = router;
