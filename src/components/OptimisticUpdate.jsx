import { Button } from "./Button";
import { getMessages, sendMessage } from "../services/messages";
import { useEffect, useState } from "react";
import { MessagesList } from "./MessagesList";
import { Example } from "./Example";

const OptimisticUpdate = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    getMessages().then((messages) => {
      setMessages(messages);
      setIsFetching(false);
    });
  }, []);

  const handleClick = () => {
    const newMessage = {
      id: messages.length + 1,
      message: "New message",
    };
    setMessages((previousMessages) => [...previousMessages, newMessage]);
    sendMessage(newMessage).then(() => {
      console.log(`Message ${newMessage.id} added`);
    });
  };

  return (
    <Example title="Optimistic UI">
      {!isFetching && <MessagesList messages={messages} />}
      <Button
        text="Send message"
        onClick={handleClick}
        isLoading={isFetching}
      />
    </Example>
  );
};

export { OptimisticUpdate };
