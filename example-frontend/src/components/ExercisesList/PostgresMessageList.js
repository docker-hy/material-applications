import React, { useState } from "react";
import { Input, Button, List, ListItem } from '@material-ui/core';
import { axiosInstance } from "../../util/pingpong";

const PostgresConnection = () => {
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const res = await axiosInstance.get("/messages");
      setMessages(res?.data?.messages ?? []);
    } catch (e) {}
  };

  const postMessage = async () => {
    try {
      await axiosInstance.post("/messages", { body: messageBody });
      await getMessages();
      setMessageBody("");
    } catch (e) {}
  };

  const handleMessageChange = (event) => setMessageBody(event.target.value);

  return (
    <>
      <div>
        <Input 
          variant="outlined"
          id="message"
          placeholder="Write message here"
          value={messageBody}
          onChange={handleMessageChange}
        />
        <Button variant="outlined" onClick={postMessage}>
          Send message!
        </Button>
        <Button variant="outlined" onClick={getMessages}>
          Get all messages!
        </Button>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>{message.body}</ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default PostgresConnection;
