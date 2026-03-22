import client from './client';

/**
 * POST /register
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<UserResponse>}
 */
export const register = (data) => client.post('/register', data).then((r) => r.data);

/**
 * POST /login
 * Sets HttpOnly cookie "token" on success.
 * @param {{ email: string, password: string }} data
 * @returns {Promise<UserResponse>}
 */
export const login = (data) => client.post('/login', data).then((r) => r.data);
