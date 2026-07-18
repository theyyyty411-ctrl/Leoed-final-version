const isDevelopment = import.meta.env.DEV;
const hostApi = isDevelopment
  ? "https://leoedai.com"
  : "https://leoedai.com";
const portApi = isDevelopment ? "" : "";
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
const redirectUrl = isDevelopment
  ? "https://leoedai.com"
  : typeof window !== "undefined"
    ? window.location.origin
    : "https://leoedai.com";
const isBackend = String(import.meta.env.VITE_BACKEND).toLowerCase() === "true";

const appConfig = {
  hostApi,
  portApi,
  baseURLApi,
  redirectUrl,
  remote: "https://leoedai.com",
  isBackend,
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
