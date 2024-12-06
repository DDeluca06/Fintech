import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const data = await fetchDataFromDatabase();
      res.render('dashboard', { data });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.get('/transactions', async (req, res) => {
    try {
      const transactions = await fetchTransactionsFromDatabase();
      res.render('transactions', { transactions });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

export default router;