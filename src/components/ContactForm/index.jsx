'use client';
import { useState } from 'react';
import { submitChatlog } from '../../api/chatlog.js';
import styles from './style.module.scss';
export default function Index() {
    const [formData, setFormData] = useState({nom: '',email: '',tel: '',message_user: '',});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]: value,});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nom.trim() ||!formData.email.trim() ||!formData.tel.trim() ||!formData.message_user.trim()) {
            alert('All fields are required.');
            return;
        }
        try {
            await submitChatlog(formData);
            alert('Form submitted successfully!');
            setFormData({ nom: '', email: '', tel: '', message_user: '' });
        } catch (error) {
            alert(`Failed to submit the form: ${error.message}`);
        }
    };
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Contactez-nous</h1>
                <input type="text" name="nom" placeholder="Nom & Prénom" autoComplete="off" maxLength="30" className={styles.inputName} required value={formData.nom} onChange={handleChange} />
                <div className={styles.inputGroup}>
                    <input type="email" name="email" placeholder="Email" autoComplete="off" className={styles.input} required value={formData.email} onChange={handleChange} />
                    <input type="text" name="tel" placeholder="+216" autoComplete="off" className={styles.input} required value={formData.tel} onChange={handleChange} />
                </div>
                <textarea name="message_user" placeholder="Message" rows="5" className={styles.textarea} required value={formData.message_user} onChange={handleChange} ></textarea>
                <button type="submit" className={styles.submitButton}>
                    Envoyer le message
                </button>
            </form>
        </div>
    );
}