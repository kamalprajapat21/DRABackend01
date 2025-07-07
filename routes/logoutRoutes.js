// routes/logoutRoutes.js
import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });

});

export default router;
