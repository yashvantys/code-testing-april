const Contact = require('../models/Contact');

// GET all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST create new contact
const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PUT update contact by ID
const updateContact = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE contact by ID
const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        res.json(deletedContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getAllContacts, createContact, updateContact, deleteContact };
