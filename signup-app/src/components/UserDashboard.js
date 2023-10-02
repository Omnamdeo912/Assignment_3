// src/components/UserDashboard.js
import React, { useState, useEffect } from 'react';
import UserHistoryPopup from './UserHistoryPopup';

const UserDashboard = ({ setRoute }) => {
  const [faqData, setFaqData] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showUserHistory, setShowUserHistory] = useState(false); // State for showing/hiding the user history popup

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:4000/faq/v1/fetchallfaqs', {
      method: 'GET',
      headers: {
        'accept': '/',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setFaqData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleQuestionClick = async (faq) => {
    // Concatenate the question and answer and add it to chatMessages
    const chatMessage = `${faq.question}\n${faq.answer}`;
    setChatMessages([...chatMessages, chatMessage]);
    setSelectedQuestion(faq);

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // Handle the case where the access token is not available
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/faq/v1/adduserhistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: "abcOp5@gmail.com", // Replace with the actual user's email
          question_id: faq.id, // Use the FAQ's ID here
        }),
      });

      if (response.status === 201) {
        // User history added successfully
        console.log('User history added successfully');
      } else {
        // Handle user history addition failure
        console.error('Failed to add user history');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    // Remove the access token from localStorage
    localStorage.removeItem('accessToken');

    // Route to the login page
    setRoute('/login');
  };

  const handleClearChat = () => {
    // Clear the chatMessages array
    setChatMessages([]);
  };

  const handleShowUserHistory = () => {
    setShowUserHistory(true);
  };

  const handleCloseUserHistory = () => {
    setShowUserHistory(false);
  };

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <div>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
        <button type="button" onClick={handleClearChat}>
          Clear
        </button>
        <button type="button" onClick={handleShowUserHistory}>
          User History
        </button>
      </div>
      <div className="question-buttons">
        {faqData.map((faq) => (
          <button
            key={faq.id}
            onClick={() => handleQuestionClick(faq)}
          >
            {faq.question}
          </button>
        ))}
      </div>
      <div className="chat">
        <h3>Chat</h3>
        {selectedQuestion && (
          <div className="chat-message">
            {chatMessages.map((message, index) => (
              <div key={index}>
                <p>{message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
      {showUserHistory && (
        <UserHistoryPopup
          email="abcOp5@gmail.com" // Replace with the actual user's email
          accessToken={localStorage.getItem('accessToken')}
          onClose={handleCloseUserHistory}
        />
      )}
      </div>
    </div>
  );
};

export default UserDashboard;
