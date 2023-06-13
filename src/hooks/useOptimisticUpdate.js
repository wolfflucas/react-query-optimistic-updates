import { useQueryClient } from "react-query";

const useOptimisticUpdate = () => {
  const queryClient = useQueryClient();

  const getPreviousData = async ({ cacheKey, newValue }) => {
    await queryClient.cancelQueries(cacheKey);

    // Snapshot the previous value
    const previousData = queryClient.getQueryData(cacheKey);

    // Optimistically update to the new value
    queryClient.setQueryData(cacheKey, (old) => [...old, newValue]);

    // Return a context object with the snapshotted value
    return { previousData };
  };

  return { getPreviousData };
};

export { useOptimisticUpdate };
