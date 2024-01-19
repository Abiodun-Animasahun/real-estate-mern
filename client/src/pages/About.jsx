import React, { useContext } from "react";
import { DarkModeContext } from "../components/DarkModeContext";

export default function About() {
  const { isDarkMode } = useContext(DarkModeContext);

  

  return (
    <div className={`${isDarkMode && 'dark'}`}>
    <div className="dark:bg-gray-800 h-screen">
    <div
      className="py-20 px-4 max-w-6xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">
        About HumbleH Estate
      </h1>
      <p className="mb-4 text-slate-700 dark:text-white">
        HumbleH Estate offers an outstanding services to the home finders within
        the country and from abroad, we specialized in providing you a seemless 
        experience when it comes to looking for an apartment for living and office 
        purposes, and we have hundred of thousands beautiful homes or apartments
        either for sale or rent with an affordable prizes.
      </p>
      <p className="mb-4 text-slate-700 dark:text-white">
        Our mission is to help our clients achieve their real estate goals by
        providing expert advice, personalized service, and a deep understanding
        of the local market. Whether you are looking to buy, sell, or rent a
        property, we are here to help you every step of the way.
      </p>
      <p className="mb-4 text-slate-700 dark:text-white">
        Our team of agents has a wealth of experience and knowledge in the real
        estate industry, and we are committed to providing the highest level of
        service to our clients. We believe that buying or selling a property
        should be an exciting and rewarding experience, and we are dedicated to
        making that a reality for each and every one of our clients.
      </p>
    </div>
    </div>
    </div>
  );
}
