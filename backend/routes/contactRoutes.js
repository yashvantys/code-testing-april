const express = require('express');
const router = express.Router();
const { getAllContacts, createContact, updateContact, deleteContact } = require('../controllers/contactController');

router.get('/contacts', getAllContacts);
router.post('/contacts', createContact);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);

module.exports = router;
