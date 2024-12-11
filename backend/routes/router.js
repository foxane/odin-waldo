import { Router } from 'express';
import {
  createImage,
  createScore,
  getAllImages,
  getScoreByImage,
  getSingleImage,
} from '../controllers/imageController.js';

const router = Router();
router.route('/images?/:id/scores').get(getScoreByImage).post(createScore);
router.route('/images?/:id').get(getSingleImage);
router.route('/images?').get(getAllImages).post(createImage);

export default router;
