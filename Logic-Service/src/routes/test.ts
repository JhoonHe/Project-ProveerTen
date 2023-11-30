import { Router } from "express";
import authToken from '../middlewares/auth-token';
import { test } from '../controllers/test-controller';

const router = Router();

router.get('/', authToken, test);

export default router;