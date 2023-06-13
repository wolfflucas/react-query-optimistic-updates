import { PessimisticUpdate } from "./components/PessimisticUpdate";
import { OptimisticUpdate } from "./components/OptimisticUpdate";
import "./index.css";
import { PessimisticUpdateReactQuery } from "./components/PessimisticUpdateReactQuery";
import { QueryClient, QueryClientProvider } from "react-query";
import { OptimisticUpdateReactQuery } from "./components/OptimisticUpdateReactQuery";
import { useState } from "react";
import { emptyMessages } from "./services/messages";

const queryClient = new QueryClient();

function App() {
  const [selectedType, setSelectedType] = useState("pessimistic");

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
    emptyMessages();
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 w-screen h-screen">
      <select
        onChange={handleChangeType}
        className="border border-gray-200 p-4 rounded-lg text-xl"
      >
        <option value="pessimistic">Pessimistic UI</option>
        <option value="optimistic">Optimistic UI</option>
        <option value="pessimistic-rq">Pessimistic UI - React Query</option>
        <option value="optimistic-rq">Optimistic UI - React Query</option>
      </select>

      {selectedType === "pessimistic" && <PessimisticUpdate />}
      {selectedType === "optimistic" && <OptimisticUpdate />}
      <QueryClientProvider client={queryClient}>
        {selectedType === "pessimistic-rq" && <PessimisticUpdateReactQuery />}
        {selectedType === "optimistic-rq" && <OptimisticUpdateReactQuery />}
      </QueryClientProvider>
    </main>
  );
}

export default App;
