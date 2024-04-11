import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import './ContactForm.css';

const ContactForm = ({ onFormSubmit, contact }) => {
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        phone: '',
        about: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (contact) {
            setFormData({
                id: contact._id || '',
                firstName: contact.firstName || '',
                lastName: contact.lastName || '',
                email: contact.email || '',
                country: contact.country || '',
                phone: contact.phone || '',
                about: contact.about || '',
            });
        }
    }, [contact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        // Clear validation error when input is changed
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        const { firstName, lastName, email } = formData;
        const newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'First Name is required.';
        }
        if (!lastName.trim()) {
            newErrors.lastName = 'Last Name is required.';
        }
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            onFormSubmit(formData);
            setFormData({
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                country: '',
                phone: '',
                about: '',
            });
            setErrors({});
        }
    };

    useMutation(handleSubmit);

    return (
        <form onSubmit={handleSubmit} noValidate>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About"></textarea>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ContactForm;
