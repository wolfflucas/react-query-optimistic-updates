import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "./Button";
import { getMessages, sendMessage } from "../services/messages";
import { MessagesList } from "./MessagesList";
import { useOptimisticUpdate } from "../hooks/useOptimisticUpdate";
import { Example } from "./Example";

const OptimisticUpdateReactQuery = () => {
  const cacheKey = "messages";
  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useQuery(cacheKey, getMessages);
  const { getPreviousData } = useOptimisticUpdate();
  const { mutateAsync } = useMutation(sendMessage, {
    onMutate: async (newMessage) => ({
      previousMessages: await getPreviousData({
        cacheKey,
        newValue: newMessage,
      }),
    }),
    onError: (_, __, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(cacheKey, context.previousMessages);
    },
    onSettled: (messages) => {
      // Always refetch after error or success:
      queryClient.invalidateQueries(cacheKey);
      console.log(`Message ${messages[messages.length - 1].id} added`);
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
    <Example title="Optimistic UI with React Query">
      {!isLoading && <MessagesList messages={messages} />}
      <Button text="Send message" onClick={handleClick} isLoading={isLoading} />
    </Example>
  );
};

export { OptimisticUpdateReactQuery };
