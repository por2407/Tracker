import client from './client';

/**
 * GET /transactions/:userID?type=daily|monthly|yearly&date=YYYY-MM-DD
 * @param {number} userID
 * @param {'daily'|'monthly'|'yearly'} type
 * @param {string} date  – YYYY-MM-DD
 * @returns {Promise<SummaryResponse>}
 */
export const getSummary = (userID, type = 'monthly', date) =>
  client
    .get(`/transactions/${userID}`, { params: { type, date } })
    .then((r) => r.data);

/**
 * POST /transactions
 * amount > 0  → income
 * amount < 0  → expense  (pass a negative value)
 * @param {{ user_id, category_id, amount, note, date }} data
 * @returns {Promise<Transaction>}
 */
export const createTransaction = (data) =>
  client.post('/transactions', data).then((r) => r.data);

/**
 * PUT /transactions
 * @param {{ id, user_id, category_id, amount, note, date }} data
 * @returns {Promise<Transaction>}
 */
export const updateTransaction = (data) =>
  client.put('/transactions', data).then((r) => r.data);

/**
 * DELETE /transactions/:id
 * @param {number} id  – transaction id
 */
export const deleteTransaction = (id) =>
  client.delete(`/transactions/${id}`).then((r) => r.data);
