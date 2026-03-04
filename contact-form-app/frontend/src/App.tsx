import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./pages/ContactList";
import { Container, Row, Col, Card } from "react-bootstrap";

function App() {
  return (
    <div className="App bg-light min-vh-100">
      <header className="bg-primary text-white py-4 mb-4">
        <Container>
          <h1 className="display-4 mb-0">Contact Form</h1>
        </Container>
      </header>
      <Container>
        <Row>
          <Col lg={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title as="h2" className="mb-4">Send us a message</Card.Title>
                <ContactForm />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <ContactList />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
