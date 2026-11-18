import { Router } from "express";
import userRoute from './user.routes.ts';
import listingRoute from './listing.routes.ts';


const router = Router();


router.use('/users', userRoute);
router.use('/listings', listingRoute);


export default router;