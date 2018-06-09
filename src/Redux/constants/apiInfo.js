export const API_KEY = '2fNXsD2f';

const apiUrls = {
    development: 'https://bitbookapi.azurewebsites.net',
    production: 'https://bitbookapi.azurewebsites.net'
};

export const BASE_URL = apiUrls[process.env.NODE_ENV];
