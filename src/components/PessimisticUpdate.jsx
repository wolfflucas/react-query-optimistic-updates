import { useEffect, useState } from "react";
import { Button } from "./Button";
import { MessagesList } from "./MessagesList";
import { getMessages, sendMessage } from "../services/messages";
import { Example } from "./Example";

const PessimisticUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const newMessage = {
      id: messages.length + 1,
      message: "New message",
    };
    sendMessage(newMessage).then((updatedMessages) => {
      setMessages(updatedMessages);
      setIsLoading(false);
    });
  };

  return (
    <Example title="Pessimistic UI">
      {!isFetching && <MessagesList messages={messages} />}
      <Button
        text="Send message"
        onClick={handleClick}
        isLoading={isLoading || isFetching}
      />
    </Example>
  );
};

export { PessimisticUpdate };
