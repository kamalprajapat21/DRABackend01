// // routes/alertRoutes.js

// import express from 'express';
// import { getAlert} from "../controllers/alertController.js";

// const router = express.Router();

// // GET urgent bookings
// router.post('/', getAlert);

// export default router;

///practise2
import express from 'express';
import { getAlert, clearAllAlerts } from "../controllers/alertController.js";

const router = express.Router();

router.post('/', getAlert);
router.put('/clearAll', clearAllAlerts);

export default router;