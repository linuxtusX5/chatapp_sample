import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/messages/getMessages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/messages/createMessage', { text: input });
        setMessages([...messages, response.data]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

const handleDeleteMessage = async (messageId) => {
  try {
    await axios.delete(`http://localhost:8080/api/v1/messages/deleteMessage/${messageId}`);
    const updatedMessages = messages.filter((message) => message._id !== messageId);
    setMessages(updatedMessages);
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};


  return (
    <div>
      <h1>Chat App</h1>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id}>
            <span>{message.text}</span>
            <span>{message.timestamp}</span>
            <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Home;
