let messages = [
  {
    id: 1,
    message: "Existing message",
  },
  {
    id: 2,
    message: "Existing message",
  },
];

export const sendMessage = (message) =>
  new Promise((resolve) => {
    setTimeout(() => {
      messages.push(message);
      resolve(messages);
    }, 1500);
  });

export const getMessages = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(messages);
    }, 1500);
  });

export const emptyMessages = () =>
  (messages = [
    {
      id: 1,
      message: "Existing message",
    },
    {
      id: 2,
      message: "Existing message",
    },
  ]);
