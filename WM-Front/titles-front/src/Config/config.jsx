require('dotenv').config();

export const wmtConfig = { 
    apiBase: process.env.REACT_APP_WM_API_URL,  // set within .env.local file in root
    apiTitles: "/titles/",
    apiTitleSearch: "/titles/search/qtitle=",
    apiTitleDetail: "/titles/details/"
}