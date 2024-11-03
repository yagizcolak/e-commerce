const { REACT_APP_JWT_SECRET, REACT_APP_API_BASE_URL } = process.env;

export const JWT_SECRET = REACT_APP_JWT_SECRET || 'default-secret';
export const API_BASE_URL = REACT_APP_API_BASE_URL || '/api';