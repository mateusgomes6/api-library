// src/routes/authRoutes.ts
import express, { Router } from 'express';
import * as authController from '../controllers/authController';

const router: Router = express.Router();

router.post('/register', (req, res, next) => {
  Promise.resolve(authController.register(req, res))
	.catch(next);
});
router.post('/login', (req, res, next) => {
  Promise.resolve(authController.login(req, res))
	.catch(next);
});

export default router;