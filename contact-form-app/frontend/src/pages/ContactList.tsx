import React, { useState, useEffect, useCallback } from "react";
import { fetchContacts as fetchContactsApi, searchContacts } from "../utils/api";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  Table,
  Badge,
  Modal,
  Alert,
  Spinner,
  Pagination,
} from "react-bootstrap";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  attachment?: {
    original_filename: string;
    size: number;
  };
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'id' | 'name' | 'email' | 'message' | 'created_at'>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const searchContactsData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const result = await searchContacts(searchTerm, 'all', sortField, sortDirection);
      if (result.success && result.data) {
        setContacts(result.data as unknown as Contact[]);
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
      if (result.success && result.data) {
        setContacts(result.data as unknown as Contact[]);
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

  const getFileIcon = (filename: string) => {
    if (!filename) return null;
    const extension = filename.split('.').pop()?.toLowerCase();
    
    const iconMap: Record<string, string> = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      txt: '📄',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️'
    };
    
    return iconMap[extension as keyof typeof iconMap] || '📎';
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSort = (field: 'id' | 'name' | 'email' | 'message' | 'created_at') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: 'id' | 'name' | 'email' | 'message' | 'created_at') => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <Card className="text-center p-4">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading contacts...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="d-flex align-items-center">
        <span className="me-2">⚠️</span>
        <div className="flex-grow-1">
          <h5 className="alert-heading">Oops! Something went wrong</h5>
          <p className="mb-2">{error}</p>
          <Button variant="outline-danger" onClick={fetchContacts}>
            Try Again
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <div className="contact-list">
      <Card className="mb-4">
        <Card.Header className="bg-white">
          <Row className="align-items-center">
            <Col>
              <h3 className="mb-0">Contact Management</h3>
              <div className="d-flex align-items-center mt-2">
                <Badge bg="primary" className="me-2">
                  {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
                </Badge>
                {searchTerm && (
                  <Badge bg="info">
                    Searching: "{searchTerm}"
                  </Badge>
                )}
              </div>
            </Col>
            <Col md={6}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search contacts"
                />
                <InputGroup.Text>🔍</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          {contacts.length === 0 ? (
            <div className="text-center p-5">
              <div className="mb-3">
                <span style={{ fontSize: '3rem' }}>📭</span>
              </div>
              <h4>No contacts yet</h4>
              <p className="text-muted">Be the first to submit a contact form!</p>
            </div>
          ) : searchTerm && contacts.length === 0 ? (
            <div className="text-center p-5">
              <div className="mb-3">
                <span style={{ fontSize: '3rem' }}>🔍</span>
              </div>
              <h4>No matching contacts</h4>
              <p className="text-muted">Try adjusting your search criteria</p>
              <Button 
                variant="outline-primary"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th 
                      onClick={() => handleSort('name')} 
                      className="cursor-pointer user-select-none"
                    >
                      Name {getSortIcon('name')}
                    </th>
                    <th 
                      onClick={() => handleSort('email')} 
                      className="cursor-pointer user-select-none"
                    >
                      Email {getSortIcon('email')}
                    </th>
                    <th>Message</th>
                    <th>Attachment</th>
                    <th 
                      onClick={() => handleSort('created_at')} 
                      className="cursor-pointer user-select-none"
                    >
                      Submitted {getSortIcon('created_at')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr 
                      key={contact.id} 
                      className="contact-row cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Contact ${contact.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedContact(contact);
                        }
                      }}
                    >
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
                            {contact.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-semibold">{contact.name}</div>
                            <small className="text-muted">ID: {contact.id}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a 
                          href={`mailto:${contact.email}`} 
                          className="text-decoration-none"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {contact.email}
                        </a>
                      </td>
                      <td>
                        <div className="text-truncate" style={{ maxWidth: '200px' }}>
                          {contact.message}
                        </div>
                      </td>
                      <td>
                        {contact.attachment ? (
                          <div className="d-flex align-items-center">
                            <span className="me-2">{getFileIcon(contact.attachment.original_filename)}</span>
                            <div>
                              <div className="small fw-semibold">{contact.attachment.original_filename}</div>
                              <small className="text-muted">{formatFileSize(contact.attachment.size)}</small>
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        <div>
                          <div className="small">{formatDate(contact.created_at)}</div>
                          <small className="text-muted">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </small>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
      
      <Modal show={!!selectedContact} onHide={() => setSelectedContact(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <Row>
              <Col md={6}>
                <h6 className="text-muted">Name</h6>
                <p className="fw-semibold">{selectedContact.name}</p>
              </Col>
              <Col md={6}>
                <h6 className="text-muted">Email</h6>
                <p>
                  <a href={`mailto:${selectedContact.email}`} className="text-decoration-none">
                    {selectedContact.email}
                  </a>
                </p>
              </Col>
              <Col md={12}>
                <h6 className="text-muted">Message</h6>
                <p className="bg-light p-3 rounded">{selectedContact.message}</p>
              </Col>
              {selectedContact.attachment && (
                <Col md={12}>
                  <h6 className="text-muted">Attachment</h6>
                  <div className="d-flex align-items-center bg-light p-3 rounded">
                    <span className="me-2">{getFileIcon(selectedContact.attachment.original_filename)}</span>
                    <div>
                      <div className="fw-semibold">{selectedContact.attachment.original_filename}</div>
                      <small className="text-muted">{formatFileSize(selectedContact.attachment.size)}</small>
                    </div>
                  </div>
                </Col>
              )}
              <Col md={12}>
                <h6 className="text-muted">Submitted</h6>
                <p>{formatDate(selectedContact.created_at)}</p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedContact(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
      <div className="d-flex justify-content-end mt-3">
        <Button 
          variant="outline-primary"
          onClick={fetchContacts} 
          disabled={isRefreshing}
          className="d-flex align-items-center"
        >
          <span className={`me-2 ${isRefreshing ? 'spin' : ''}`}>🔄</span>
          {isRefreshing ? 'Refreshing...' : 'Refresh List'}
        </Button>
      </div>
      
      <style>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .user-select-none {
          user-select: none;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContactList;
