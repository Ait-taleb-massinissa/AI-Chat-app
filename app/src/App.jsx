import React, { useEffect, useRef, useState } from 'react';
import ChatBubble from './Modules/ChatBubble';
import logo from "./assets/icons8-ai-48.png"

function App() {
  const API_Key = 'pk-hBxtJAbYuydLCsSElXlBgIviKztYYcMULPbFYgCHRzKdKgBf';
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [thinking, setThinking] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setThinking(true);

    const apiReq = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        ...messages,
        {
          role: 'user',
          content: message
        }
      ]
    };

    setMessages((prevMsg) => [
      ...prevMsg,
      {
        role: 'user',
        content: message
      }
    ]);

    setMessage('');

    await fetch('https://api.pawan.krd/pai-001-light/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_Key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiReq)
    })
      .then((data) => data.json())
      .then((data) => {
        setThinking(false);
        setMessages((prevMsg) => [...prevMsg, data.choices[0].message]);
      });
  };

  return (
    <>
      <div
        className="header"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          alignItems: 'center',
          margin: '5vh 0 5vh 0'
        }}
      >
        <img style={{width:"48px"}} src={logo} alt="logo" />
        <h3 style={{ margin: '0px' }}>Welcome to AI ask</h3>
        <h6 style={{ margin: '0px' }}>powered by GPT 3.5</h6>
      </div>
      <div className="messages" style={{ marginBottom: '15%' }}>
        {messages.length==0 && (
          <div className="container" style={{display:"flex",justifyContent:"center",marginTop:"20vh"}}>
            <div className="content">
              <span style={{fontWeight:"500"}} >ask me any thing I have answers for every thing </span>
            </div>
          </div>
        )}
        {messages &&
          messages.map((msg, index) => (
            <ChatBubble key={index} what={msg.content} who={msg.role} />
          ))}
        {thinking && <span style={{ margin: '10px' }}>AI is thinking . . .</span>}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#242424',
          marginLeft: '10vw',
          position: 'fixed',
          bottom: '5%',
          border: '1px solid grey',
          padding: '10px',
          borderRadius: '20px',
          width: '80vw'
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onFocus={(e) => (e.target.style = 'all: unset; width: 70vw; padding-left: 10px ')}
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            border: 'none',
            background: 'none',
            color: 'inherit',
            font: 'inherit',
            cursor: 'pointer',
            width: '70vw',
            paddingLeft: '10px'
          }}
        />
        <input
          type="submit"
          value="ask"
          style={{
            width: '8vw',
            height: '30px',
            borderRadius: '20px',
            border: '1px solid grey',
            cursor: 'pointer'
          }}
        />
      </form>
    </>
  );
}

export default App;
