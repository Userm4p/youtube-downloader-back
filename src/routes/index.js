import { Router } from 'express';
import getVideo from '../controllers/getVideo.js';

const router = Router();

router.get('/video', 
    getVideo
);

export default router;