const Example = ({ title, children }) => (
  <section>
    <h1 className="font-bold text-xl mb-2 text-center">{title}</h1>
    {children}
  </section>
);

export { Example };
