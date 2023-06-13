const MessagesList = ({ messages }) => (
  <ul className="border border-gray-200 rounded-lg mb-4">
    {messages.map(({ id, message }) => (
      <li
        className="font-light text-lg border-b border-gray-200 px-4 py-2 odd:bg-gray-100 first-of-type:rounded-t-lg last-of-type:rounded-b-lg last-of-type:border-none"
        key={id}
      >
        {message} - {id}
      </li>
    ))}
  </ul>
);

export { MessagesList };
