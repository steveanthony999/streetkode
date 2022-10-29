import axios from 'axios';

// GET SHIPPING COUNTRIES
const getShippingCountries = async () => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(
    `https://api.chec.io/v1/fulfillment/physical/zones`,
    config
  );

  return res.data.data;
};

// GET SHIPPING SUBDIVISIONS
const getShippingSubdivisions = async (chktCntryData) => {
  const config = {
    headers: {
      'X-Authorization': process.env.REACT_APP_COMMERCE_API_KEY_TEST,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(
    `https://api.chec.io/v1/services/locale/${chktCntryData.checkoutId}/countries/${chktCntryData.countryCode}/subdivisions`,
    config
  );

  return res.data.subdivisions;
};

const shippingService = {
  getShippingCountries,
  getShippingSubdivisions,
};

export default shippingService;
