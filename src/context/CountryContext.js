import React, { createContext, useContext, useState } from "react";

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const contextValue = {
    countries,
    setCountries,
    selectedContinent,
    setSelectedContinent,
    selectedCountry,
    setSelectedCountry,
  };

  return (
    <CountryContext.Provider value={contextValue}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  return useContext(CountryContext);
};
