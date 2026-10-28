export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://127.0.0.1:8080';

export const SESSION_COOKIE = 'santos_session';
export const REFRESH_COOKIE = 'santos_refresh';

export const SESSION_MAX_AGE_SECONDS = 60 * 15;
export const REFRESH_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
