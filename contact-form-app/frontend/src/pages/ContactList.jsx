import React, { useState, useEffect, useCallback } from "react";
import { fetchContacts as fetchContactsApi, searchContacts } from "../utils/api";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const searchContactsData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await searchContacts(searchTerm, 'all', sortField, sortDirection);
      if (result.success) {
        setContacts(result.data);
        setError(null);
      } else {
        setError(result.error || "Error searching contacts. Please try again later.");
      }
    } catch (err) {
      setError("Error searching contacts. Please try again later.");
      console.error("Error searching contacts:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [searchTerm, sortField, sortDirection]);

  useEffect(() => {
    if (searchTerm.trim()) {
      searchContactsData();
    } else {
      fetchContacts();
    }
  }, [searchTerm, sortField, sortDirection, searchContactsData]);

  const fetchContacts = async () => {
    setIsRefreshing(true);
    try {
      const result = await fetchContactsApi();
      if (result.success) {
        setContacts(result.data);
        setError(null);
      } else {
        setError(result.error || "Error loading contacts. Please try again later.");
      }
    } catch (err) {
      setError("Error loading contacts. Please try again later.");
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const getFileIcon = (filename) => {
    if (!filename) return null;
    const extension = filename.split('.').pop()?.toLowerCase();
    
    const iconMap = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      txt: '📄',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️'
    };
    
    return iconMap[extension] || '📎';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="contact-list">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contact-list">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={fetchContacts} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-list">
      <div className="contact-list-header">
        <div className="header-content">
          <h2>Contact Management</h2>
          <div className="contact-stats">
            <span className="contact-count">
              {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
            </span>
            {searchTerm && (
              <span className="search-indicator">
                Searching: "{searchTerm}"
              </span>
            )}
          </div>
        </div>
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              aria-label="Search contacts"
            />
            <div className="search-icon">🔍</div>
          </div>
        </div>
      </div>
      
      {contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No contacts yet</h3>
          <p>Be the first to submit a contact form!</p>
        </div>
      ) : searchTerm && contacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No matching contacts</h3>
          <p>Try adjusting your search criteria</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="clear-search-button"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="contacts-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="sortable-header">
                  Name {getSortIcon('name')}
                </th>
                <th onClick={() => handleSort('email')} className="sortable-header">
                  Email {getSortIcon('email')}
                </th>
                <th>Message</th>
                <th>Attachment</th>
                <th onClick={() => handleSort('created_at')} className="sortable-header">
                  Submitted {getSortIcon('created_at')}
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr 
                  key={contact.id} 
                  className="contact-row"
                  onClick={() => setSelectedContact(contact)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Contact ${contact.name}`}
                >
                  <td className="contact-name">
                    <div className="name-cell">
                      <div className="contact-avatar">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="contact-details">
                        <span className="contact-name-text">{contact.name}</span>
                        <span className="contact-id">ID: {contact.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="contact-email">
                    <a 
                      href={`mailto:${contact.email}`} 
                      className="email-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {contact.email}
                    </a>
                  </td>
                  <td className="contact-message">
                    <div className="message-cell">
                      {contact.message}
                    </div>
                  </td>
                  <td className="contact-attachment">
                    {contact.attachment ? (
                      <div className="attachment-cell">
                        <span className="attachment-icon">
                          {getFileIcon(contact.attachment.original_filename)}
                        </span>
                        <div className="attachment-details">
                          <span className="attachment-name">
                            {contact.attachment.original_filename}
                          </span>
                          <span className="attachment-size">
                            {formatFileSize(contact.attachment.size)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="no-attachment">—</span>
                    )}
                  </td>
                  <td className="contact-time">
                    <div className="time-cell">
                      <span className="time-text">{formatDate(contact.created_at)}</span>
                      <span className="time-relative">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {selectedContact && (
        <div 
          className="contact-modal-overlay"
          onClick={() => setSelectedContact(null)}
        >
          <div 
            className="contact-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Contact Details</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedContact(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <div className="detail-row">
                <strong>Name:</strong> {selectedContact.name}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> 
                <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
              </div>
              <div className="detail-row">
                <strong>Message:</strong>
                <p>{selectedContact.message}</p>
              </div>
              {selectedContact.attachment && (
                <div className="detail-row">
                  <strong>Attachment:</strong>
                  <div className="attachment-detail">
                    <span className="attachment-icon">
                      {getFileIcon(selectedContact.attachment.original_filename)}
                    </span>
                    <div>
                      <div>{selectedContact.attachment.original_filename}</div>
                      <small>{formatFileSize(selectedContact.attachment.size)}</small>
                    </div>
                  </div>
                </div>
              )}
              <div className="detail-row">
                <strong>Submitted:</strong> {formatDate(selectedContact.created_at)}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={fetchContacts} 
        className={`refresh-button ${isRefreshing ? 'refreshing' : ''}`}
        disabled={isRefreshing}
      >
        <span className="refresh-icon">🔄</span>
        {isRefreshing ? 'Refreshing...' : 'Refresh List'}
      </button>
    </div>
  );
};

export default ContactList;
