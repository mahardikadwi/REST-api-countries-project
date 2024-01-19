import axios from "axios";

export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const searchCountries = async (name) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${name}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const filterCountryByContinent = async (region) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${region}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const fetchCountryByCode = async (code) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};


