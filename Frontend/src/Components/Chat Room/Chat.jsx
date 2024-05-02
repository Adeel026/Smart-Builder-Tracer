import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './Chat.css'
const socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });

const Chat = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const location = useLocation();
  const { sender, receiver, project } = location.state || {};
  // console.log(project, sender, receiver)

  useEffect(() => {
    fetchChatMessages();
    fetchNames();
    socket.emit('joinRoom', userId);
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };

  }, [userId]);
  const fetchChatMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8000/chat/messages/${project._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Failed to fetch chat messages:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error.message);
    }
  };

  const fetchNames = async () => {
    try {
      const response1 = await fetch(`http://localhost:8000/chat/getname/${sender}`);
      if (response1.ok) {
        const data = await response1.json();
        console.log(data)
        setSenderName(data.name);
      } else {
        console.error('Failed to fetch chat messages:', response1.statusText);
      }

      const response2 = await fetch(`http://localhost:8000/chat/getname/${receiver}`);
      if (response2.ok) {
        const data = await response2.json();
        setReceiverName(data.name);
      } else {
        console.error('Failed to fetch chat messages:', response2.statusText);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error.message);
    }
  };

  const sendMessage = () => {
    socket.emit('sendMessage', { sender: sender, receiver: receiver, project: project._id, message: newMessage });
    setNewMessage('');
  };
  return (
    <div className="chat-container">
      <h1 style={{ fontWeight: 'bolder', fontSize: '2rem' }}>Discussion Board</h1>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div className="message" key={index}>
            <strong>{msg.sender === sender ? senderName : receiverName}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="message-input"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
