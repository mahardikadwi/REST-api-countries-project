import React, { useEffect } from "react";
import {
  fetchCountries,
  searchCountries,
  filterCountryByContinent,
} from "../api/restApi";
import { useCountryContext } from "../context/CountryContext";
import Layout from "./Layout";
import DetailedCountry from "../pages/DetailedCountry";

const Home = () => {
  const {
    countries,
    setCountries,
    selectedContinent,
    setSelectedContinent,
    selectedCountry,
    setSelectedCountry,
  } = useCountryContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, [setCountries]);

  const searchCountry = async (name) => {
    if (name.trim() === "") {
      const allCountries = await fetchCountries();
      setCountries(allCountries.slice(0, 12));
    } else {
      try {
        const query = await searchCountries(name);
        setCountries(query);
      } catch (error) {
        console.error("Error searching countries:", error);
      }
    }
  };

  const handleContinentChange = async (event) => {
    const selectedContinent = event.target.value;
    setSelectedContinent(selectedContinent);

    if (selectedContinent === "All") {
      const allCountries = await fetchCountries();
      setCountries(allCountries.slice(0, 12));
    } else {
      try {
        const countriesByContinent = await filterCountryByContinent(
          selectedContinent
        );
        setCountries(countriesByContinent);
      } catch (error) {
        console.error("Error filtering countries by continent:", error);
      }
    }
  };

  const CountryList = () => {
    return (
      <article className="dark:bg-very-dark-blue-bg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 p-10 gap-12">
        {countries.map((country) => (
          <div
            key={country.cca2}
            className="bg-very-light-gray-bg dark:bg-slate-700 cursor-pointer h-full transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md dark:border-very-dark-blue-bg border-2 rounded-md"
            onClick={() => handleClickedCountry(country)}
          >
            <div className="image-container">
              <img
                src={country.flags.svg}
                alt="country flag"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="text-container font-sans px-5 py-6 text-homepage-items dark:text-white">
              <h3 className="text-lg font-bold mb-2">{country.name.common}</h3>
              <p className="mb-2">
                Population: {country.population.toLocaleString()}
              </p>
              <p className="mb-2">Region: {country.region}</p>
              <p className="mb-2">Capital: {country.capital}</p>
            </div>
          </div>
        ))}
      </article>
    );
  };

  const handleClickedCountry = (country) => {
    setSelectedCountry(country);
  };

  const handleBackButton = () => {
    setSelectedCountry(null);
  };

  return (
    <Layout>
      {selectedCountry ? (
        <DetailedCountry
          country={selectedCountry}
          onBack={handleBackButton}
          updateSelectedCountry={setSelectedCountry}
        />
      ) : (
        <div className="flex justify-between dark:bg-very-dark-blue-bg">
          <input
            type="text"
            name="search"
            id="search"
            onChange={({ target }) => searchCountry(target.value)}
            placeholder="Search a country...."
            className="p-4 mt-10 ml-10 dark:bg-very-dark-blue-bg dark:text-dark-gray-input border border-dark-gray-input rounded-md focus:outline-none focus:border-blue-500 w-1/3"
          />
          <select
            id="continent"
            value={selectedContinent}
            onChange={handleContinentChange}
            className="p-4 mt-10 mr-10 dark:bg-very-dark-blue-bg dark:text-dark-gray-input border border-dark-gray-input rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Continents</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
          </select>
        </div>
      )}
      {/* Conditionally render CountryList only if selectedCountry is null */}
      {!selectedCountry && <CountryList />}
    </Layout>
  );
};

export default Home;
