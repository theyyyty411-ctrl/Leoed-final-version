const isDevelopment = import.meta.env.DEV;
const localApiUrl = import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3000";
const productionApiUrl = import.meta.env.VITE_API_URL || "https://leoed-final-version.onrender.com";
const localAppUrl = import.meta.env.VITE_LOCAL_APP_URL || "http://localhost:5173";
const hostApi = isDevelopment
  ? localApiUrl
  : productionApiUrl;
const portApi = isDevelopment ? "" : "";
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
const redirectUrl = isDevelopment
  ? localAppUrl
  : typeof window !== "undefined"
    ? window.location.origin
    : productionApiUrl;
const isBackend = String(import.meta.env.VITE_BACKEND).toLowerCase() === "true";

const appConfig = {
  hostApi,
  portApi,
  baseURLApi,
  redirectUrl,
  remote: productionApiUrl,
  isBackend,
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY,
  geminiModel: import.meta.env.VITE_GEMINI_MODEL || "gemini-3.5-flash-lite",
  auth: {
    email: 'test@test.com',
    password: 'password',
  },
  app: {
    colors: {
      dark: '#002B49',
      light: '#FFFFFF',
      sea: '#004472',
      sky: '#E9EBEF',
      wave: '#D1E7F6',
      rain: '#CCDDE9',
      middle: '#D7DFE6',
      black: '#13191D',
      salat: '#21AE8C',
    },
  },
};

export default appConfig;
