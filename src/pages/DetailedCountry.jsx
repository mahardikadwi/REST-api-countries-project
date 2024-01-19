import React, { useState, useEffect } from "react";
import { fetchCountryByCode } from "../api/restApi";

const NeighboringCountry = ({ neighbor, onClick }) => (
  <div
    className="border rounded-md p-2 cursor-pointer"
    onClick={() => onClick(neighbor.cca3)}
  >
    {neighbor.name.common}
  </div>
);

const CountryBorders = ({ neighboringCountries, onCountryClick }) => (
  <div className="flex flex-wrap gap-2">
    {neighboringCountries.length > 0 ? (
      neighboringCountries.map((neighbor) => (
        <NeighboringCountry
          key={neighbor.cca3}
          neighbor={neighbor}
          onClick={onCountryClick}
        />
      ))
    ) : (
      <p>No neighboring countries found</p>
    )}
  </div>
);

const DetailedCountry = ({ country, onBack, updateSelectedCountry }) => {
  const { name, flags, population, region, capital, currencies, languages, borders } = country;
  const [neighboringCountries, setNeighboringCountries] = useState([]);

  useEffect(() => {
    const fetchNeighboringCountries = async () => {
      if (borders && borders.length > 0) {
        const neighboringCountriesData = await Promise.all(
          borders.map(async (code) => {
            const data = await fetchCountryByCode(code);
            return data[0];
          })
        );
        setNeighboringCountries(neighboringCountriesData);
      }
    };

    fetchNeighboringCountries();
  }, [borders]);

  const handleBorderCountryClick = async (code) => {
    const data = await fetchCountryByCode(code);
    // Update the selected country in the Home component
    updateSelectedCountry(data[0]);
  };

  const handleBackButton = () => {
    // If a country is selected, go back to the previous detailed view
    // Otherwise, go back to the country list
    if (updateSelectedCountry) {
      updateSelectedCountry(null);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen dark:bg-slate-800">
      <button
        onClick={handleBackButton}
        className="text-black dark:text-dark-gray-input mt-5 ml-10 text-xs border p-2 dark:border-white-300 rounded-md"
      >
        Back to Country List
      </button>
      <div className="flex flex-col lg:flex-row mt-5 ml-5 mr-5 p-5 dark:text-white">
        {/* Display country details */}
        <div className="image-container lg:w-1/2 mx-auto mb-4 lg:mb-0">
          <img
            src={flags?.svg}
            alt={`Flag of ${name.common}`}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="text-container flex flex-col lg:gap-4 gap-2 lg:p-8 lg:w-1/2">
          <h2 className="text-2xl font-bold mb-2">{name.common}</h2>
          <p>Population: {population?.toLocaleString()}</p>
          <p>Region: {region}</p>
          <p>Capital: {capital}</p>
          <p>Currency: {currencies && Object.keys(currencies).map(currencyCode => currencies[currencyCode].name).join(", ")}</p>
          <p>Language: {languages && Object.keys(languages).map(language => languages[language]).join(", ")}</p>
          <div className=" mt-3">
            <h3 className="text-xl font-bold mb-2">Border Countries:</h3>
            {/* Display neighboring countries */}
            <CountryBorders
              neighboringCountries={neighboringCountries}
              onCountryClick={handleBorderCountryClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCountry;
