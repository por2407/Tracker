import client from './client';

/**
 * GET /categories
 * @returns {Promise<Category[]>}
 */
export const getCategories = () => client.get('/categories').then((r) => r.data);
