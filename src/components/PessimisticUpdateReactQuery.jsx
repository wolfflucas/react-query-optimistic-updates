import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "./Button";
import { getMessages, sendMessage } from "../services/messages";
import { MessagesList } from "./MessagesList";
import { Example } from "./Example";

const PessimisticUpdateReactQuery = () => {
  const cacheKey = "messages";
  const queryClient = useQueryClient();
  const { data: messages, isLoading: isFetching } = useQuery(
    cacheKey,
    getMessages
  );
  const { mutateAsync, isLoading } = useMutation(sendMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries(cacheKey);
    },
  });

  const handleClick = () => {
    const newMessage = {
      id: messages.length + 1,
      message: "New message",
    };
    mutateAsync(newMessage);
  };

  return (
    <Example title="Pessimistic UI with React Query">
      {!isFetching && <MessagesList messages={messages} />}
      <Button
        text="Send message"
        onClick={handleClick}
        isLoading={isLoading || isFetching}
      />
    </Example>
  );
};

export { PessimisticUpdateReactQuery };
