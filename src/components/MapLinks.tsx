import { motion } from "framer-motion";

interface Props {
  name: string;
}

const MapLinks = ({ name }: Props) => {
  return (
    <section>
      <h3 className="text-lg font-bold mb-5">Maps:</h3>
      <div className="flex gap-4">
        {[
          {
            name: "Google",
            url: (name: string) => `https://www.google.com/maps/place/${name}`,
          },
          {
            name: "Bing",
            url: (name: string) => `https://www.bing.com/maps?q=${name}`,
          },
          {
            name: "Duck Duck Go",
            url: (name: string) =>
              `https://duckduckgo.com/?q=${name}&iaxm=maps`,
          },
        ].map((service) => (
          <motion.a
            key={service.name}
            href={service.url(name)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-md rounded-lg w-fit px-5 py-2 flex-1/3 flex items-center justify-center 
            text-center dark:bg-blue-900"
            whileHover={{ scale: 1.05 }}
          >
            {service.name}
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default MapLinks;
