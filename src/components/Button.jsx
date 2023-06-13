const Button = ({ text, onClick, isLoading = false }) => (
  <button
    onClick={onClick}
    className={`bg-teal-800 border-2-teal-800 text-white font-medium rounded w-full py-2 ${
      isLoading && "pointer-events-none opacity-80"
    }`}
  >
    {isLoading ? "..." : text}
  </button>
);

export { Button };
