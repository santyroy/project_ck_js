import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-green-800">
      <section className="container mx-auto px-5 min-h-16 flex flex-col justify-evenly items-center sm:flex-row sm:justify-between">
        <section>
          <p className="text-center text-white">
            &copy; 2024 CoinKeeper. All rights reserved.
          </p>
        </section>
        <section className="flex gap-3 text-xl text-white">
          <FaFacebook />
          <FaInstagram />
          <FaXTwitter />
          <FaYoutube />
        </section>
      </section>
    </footer>
  );
};

export default Footer;
