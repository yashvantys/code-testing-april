import React from 'react';
import './ContactList.css';

const ContactList = ({ contacts, onEdit, onDelete, loading }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="contact-list">
            {contacts.map(contact => (
                <div key={contact._id} className="contact-card">
                    <h3>{`${contact.firstName} ${contact.lastName}`}</h3>
                    <p>Email: {contact.email}</p>
                    <p>Country: {contact.country}</p>
                    <p>Phone: {contact.phone}</p>
                    <p>About: {contact.about}</p>
                    <div className="card-buttons">
                        <button onClick={() => { console.log('Edit button clicked'); onEdit(contact); }}>Edit</button>
                        <button onClick={() => onDelete(contact._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactList;
