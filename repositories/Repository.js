import axios from 'axios';
//const baseDomain = 'http://127.0.0.1:8000/api/v1'; // API 
const baseDomain = 'https://apitest.purplefare.com/api/v1'; // API 
export const baseStoreURL = 'https://demo.purplefare.com'; 
export const mediaBaseURL = 'https://apitest.purplefare.com';
export const assetBaseURL = 'https://apitest.purplefare.com/assets';
export const customHeaders = {
    Accept: 'application/json'
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
