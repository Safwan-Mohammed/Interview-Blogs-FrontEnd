export const URL = import.meta.env.VITE_ENVIRONMENT === 'PROD' ? `URL` : `http://localhost:8000`
export const IF = import.meta.env.VITE_ENVIRONMENT === 'PROD' ? `URL/images` : `http://localhost:8000/images`