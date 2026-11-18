import { Router } from "express";

import { listListings, getListingById, getMyListings, createListing, editListing, deleteListing } from "../controllers/listing.controllers.ts";
import { validateBody, validateParams } from "../middleware/validate.middleware.ts";
import { createListingSchema, editListingSchema, listingIdSchema } from "../schemas/listing.schema.ts";
import { authenticate } from "../middleware/auth.middleware.ts";
import { upload } from "../config/multer.ts";


const router = Router();


// public
router.get('/list', listListings);
router.get('/byid/:id', validateParams(listingIdSchema), getListingById);

// private - a token is required
router.get('/mine', authenticate, getMyListings);
router.post('/create', authenticate, upload.single('image'), validateBody(createListingSchema), createListing);
router.put('/edit/:id', authenticate, validateParams(listingIdSchema), validateBody(editListingSchema), editListing);
router.delete('/delete/:id', authenticate, validateParams(listingIdSchema), deleteListing);


export default router;