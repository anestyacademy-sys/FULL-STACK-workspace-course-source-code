import type { Request, Response } from 'express';

import { Listing } from '../models/listing.models.ts';
import type { AuthRequest } from '../middleware/auth.middleware.ts';
import type { CreateListingInput, EditListingInput, ListingIdInput } from '../schemas/listing.schema.ts';
import { sendSuccess, sendBadRequest, sendCreated, sendNoContent, sendNotFound, sendForbidden } from '../utils/response.ts';


// GET /api/listings/list?cat=Cars&q=swift&sort=price_asc
export const listListings = async ( req: Request, res: Response )=>{

    try {

        const { cat, q, sort } = req.query;

        // 1 - build the filter
        const filter: any = {};

        if(cat && cat !== 'All'){
            filter.category = cat;
        }

        if(q){
            // 'i' means case insensitive
            filter.title = { $regex: q, $options: 'i' };
        }

        // 2 - build the sort
        let sortBy: any = { createdAt: -1 };     // newest first

        if(sort === 'price_asc'){
            sortBy = { price: 1 };
        }
        if(sort === 'price_desc'){
            sortBy = { price: -1 };
        }

        const listings = await Listing.find(filter).sort(sortBy).populate('userId', 'name phone createdAt');

        sendSuccess(res, listings, 'list of listings');

    } catch (error) {
        sendBadRequest(res, 'error in list', error);
    }

}


// GET /api/listings/byid/:id
export const getListingById = async ( req: Request<ListingIdInput>, res: Response )=>{

    try {

        const { id } = req.params;

        // $inc adds 1 to the views counter every time the page is opened
        const listing = await Listing
            .findByIdAndUpdate( id, { $inc: { views: 1 } }, { new: true } )
            .populate('userId', 'name phone createdAt');

        if(!listing){
            return sendNotFound(res, 'listing not found');
        }

        sendSuccess(res, listing, 'listing detail');

    } catch (error) {
        sendBadRequest(res, 'error in detail', error);
    }

}


// GET /api/listings/mine   ( needs a token )
export const getMyListings = async ( req: AuthRequest, res: Response )=>{

    try {

        const listings = await Listing
            .find({ userId: req.user?.userId })
            .sort({ createdAt: -1 })
            .populate('userId', 'name phone createdAt');

        sendSuccess(res, listings, 'my listings');

    } catch (error) {
        sendBadRequest(res, 'error in my listings', error);
    }

}


// POST /api/listings/create   ( needs a token )
export const createListing = async ( req: AuthRequest, res: Response )=>{

    try {

        const body = req.body as CreateListingInput;

        // multer put the uploaded file in req.file
        const imagePath = req.file ? `/uploads/listings/${req.file.filename}` : null;

        const listing = new Listing({
            ...body,
            image: imagePath,
            userId: req.user?.userId
        });

        await listing.save();

        sendCreated(res, listing, 'listing published');

    } catch (error) {
        sendBadRequest(res, 'error in creation', error);
    }

}


// PUT /api/listings/edit/:id   ( needs a token, and you must own the listing )
export const editListing = async ( req: AuthRequest, res: Response )=>{

    try {

        const { id } = req.params;
        const updates = req.body as EditListingInput;

        const listing = await Listing.findById(id);

        if(!listing){
            return sendNotFound(res, 'listing not found');
        }

        if(listing.userId.toString() !== req.user?.userId){
            return sendForbidden(res, 'this listing is not yours');
        }

        const updated = await Listing
            .findByIdAndUpdate( id, updates, { new: true } )
            .populate('userId', 'name phone createdAt');

        sendSuccess(res, updated, 'listing updated');

    } catch (error) {
        sendBadRequest(res, 'error in edit', error);
    }

}


// DELETE /api/listings/delete/:id   ( needs a token, and you must own the listing )
export const deleteListing = async ( req: AuthRequest, res: Response )=>{

    try {

        const { id } = req.params;

        const listing = await Listing.findById(id);

        if(!listing){
            return sendNotFound(res, 'listing not found');
        }

        if(listing.userId.toString() !== req.user?.userId){
            return sendForbidden(res, 'this listing is not yours');
        }

        await Listing.findByIdAndDelete(id);

        sendNoContent(res);

    } catch (error) {
        sendBadRequest(res, 'error in delete', error);
    }

}