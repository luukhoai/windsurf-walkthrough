import React, { useState, useEffect } from "react";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/contacts");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError("Error loading contacts. Please try again later.");
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="contact-list">
      <h2>Submitted Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts submitted yet.</p>
      ) : (
        <div className="contacts-grid">
          {contacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <h3>{contact.name}</h3>
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <p>
                <strong>Message:</strong>
                <br />
                {contact.message}
              </p>
            </div>
          ))}
        </div>
      )}
      <button onClick={fetchContacts} className="refresh-button">
        Refresh List
      </button>
    </div>
  );
};

export default ContactList;
