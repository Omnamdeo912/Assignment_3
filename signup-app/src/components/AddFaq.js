// src/components/AddFaq.js
import React, { useState } from 'react';

const AddFaq = ({ setRoute }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddFaq = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // Handle the case where the access token is not available
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/faq/v1/addfaq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          question,
          answer,
        }),
      });

      if (response.status === 201) {
        // FAQ added successfully
        setSuccessMessage('FAQ added successfully');
        setErrorMessage(''); // Clear any previous error message
        setQuestion(''); // Clear the input fields
        setAnswer('');
      } else {
        // Handle FAQ addition failure
        setSuccessMessage('');
        setErrorMessage('Failed to add FAQ');
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to add FAQ');
    }
  };

  const handleLogout = () => {
    // Remove the access token from localStorage
    localStorage.removeItem('accessToken');

    // Route to the login page
    setRoute('/login');
  };

  return (
    <div className="add-faq">
      <h2>Add FAQ</h2>
      <form>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label>Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAddFaq}>
          Submit
        </button>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddFaq;
