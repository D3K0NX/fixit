import axios from 'axios';

export const API_BASE_URL = 'https://kindimanu.alwaysdata.net';
export const API_BASE = `${API_BASE_URL}/api`;
export const IMAGE_BASE_URL = `${API_BASE_URL}/static/images/`;

export const api = axios.create({
  baseURL: API_BASE,
});
