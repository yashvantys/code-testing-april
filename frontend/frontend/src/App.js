import React, { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { BACKEND_URL } from './utils/common';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(BACKEND_URL + '/api/contacts');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching contacts. Please try again later.');
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleAddContact = async (newContact) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      if (!response.ok) {
        throw new Error('Failed to add contact');
      }
      const data = await response.json();
      setContacts([...contacts, data]);
    } catch (error) {
      setError('Error adding contact. Please try again later.');
    }
    setLoading(false);
  };

  const handleEditContact = async (updatedContact) => {
    setLoading(true);
    console.log("updatedContact", updatedContact)
    try {
      const response = await fetch(`${BACKEND_URL}/api/contacts/${updatedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });
      if (!response.ok) {
        throw new Error('Failed to update contact');
      }
      const data = await response.json();
      const updatedContacts = contacts.map(contact =>
        contact._id === updatedContact.id ? data : contact
      );
      setContacts(updatedContacts);
      setSelectedContact(null);
      setIsEditing(false);
    } catch (error) {
      setError('Error updating contact. Please try again later.');
    }
    setLoading(false);
  };

  const handleDeleteContact = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/contacts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      setError('Error deleting contact. Please try again later.');
    }
    setLoading(false);
  };

  const handleEdit = (contact) => {
    console.log(contact)
    setSelectedContact(contact);
    setIsEditing(true);
  };

  return (
    <div className="App">
      <h1>Contact Management System</h1>
      {isEditing ? (
        <ContactForm
          contact={selectedContact} // Make sure selectedContact contains the required fields
          onFormSubmit={handleEditContact}
          onCancel={() => { setSelectedContact(null); setIsEditing(false); }}
          loading={loading}
        />
      ) : (
        <ContactForm onFormSubmit={handleAddContact} loading={loading} />
      )}
      {error && <div className="error-message">{error}</div>}
      <ContactList
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={handleDeleteContact}
        loading={loading}
      />
    </div>
  );
};

export default App;
