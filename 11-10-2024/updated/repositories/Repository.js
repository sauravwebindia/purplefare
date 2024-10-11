import axios from 'axios';
//const baseDomain = 'http://127.0.0.1:8000/api/v1'; // API 
const baseDomain = 'https://apitest.purplefare.com/api/v1'; // API 
export const baseStoreURL = 'https://purplefare.vercel.app'; 
export const mediaBaseURL = 'https://purplefare.vercel.app';
export const assetBaseURL = 'https://purplefare.vercel.app/assets';
export const mediaThumbProductImage = 'https://purplefare.vercel.app/assets/products-images/thumb-image';
export const mediaEnlargeProductImage = 'https://purplefare.vercel.app/assets/products-images/enlarge-image';
export const mediaBigProductImage = 'https://purplefare.vercel.app/assets/products-images/big-image';
export const mediaBigMultiAngleImage = 'https://purplefare.vercel.app/assets/products-others-images/big';
export const mediaEnlargeMultiAngleImage = 'https://purplefare.vercel.app/assets/products-others-images/enlarge';
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
