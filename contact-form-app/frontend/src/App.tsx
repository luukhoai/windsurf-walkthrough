import React from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./pages/ContactList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Contact Form</h1>
      </header>
      <main>
        <ContactForm />
        <ContactList />
      </main>
    </div>
  );
}

export default App;
