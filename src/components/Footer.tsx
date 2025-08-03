const Footer = () => {
  return (
    <footer
      className="border-t border-gray-400/50 mx-4 py-8 md:mx-10 2xl:mx-50
    flex justify-between"
    >
      <span>
        Made by{" "}
        <a href="https://github.com/TerenceCLZhang" target="_blank">
          Terence Zhang
        </a>
      </span>
      <a
        href="https://github.com/TerenceCLZhang/rest-countries-api-web-app"
        target="_blank"
      >
        GitHub Repo
      </a>
    </footer>
  );
};

export default Footer;
