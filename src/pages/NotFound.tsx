import BackButton from "../components/BackButton";

const NotFound = () => {
  return (
    <div>
      <BackButton />

      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl">
          Oops! The page you’re looking for doesn’t exist.
        </p>
      </section>
    </div>
  );
};

export default NotFound;
