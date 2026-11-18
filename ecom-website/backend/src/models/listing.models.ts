import mongoose, { Schema, Document, Types } from "mongoose";


// The six categories of the design. They never change, so we keep them here
// instead of making a whole Category collection.
export const CATEGORIES = ['Cars', 'Electronics', 'Rentals', 'Jobs', 'Furniture', 'Phones'];

export const STATUSES = ['Live', 'Paused', 'Sold'];


export interface IListing extends Document {
    title: string;
    price: number;
    category: string;
    place: string;
    description: string;
    image?: string | null;
    status: string;
    views: number;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const listingSchema = new Schema<IListing>({

        title: {
            type: String,
            required: [ true, 'title is required' ]
        },
        price: {
            type: Number,
            required: [ true, 'price is required' ],
            min: [ 0, 'price cannot be negative' ]
        },
        category: {
            type: String,
            enum: CATEGORIES,
            required: [ true, 'category is required' ]
        },
        place: {
            type: String,
            required: [ true, 'location is required' ]
        },
        description: {
            type: String,
            required: [ true, 'description is required' ]
        },
        image: {
            type: String,
            default: null
        },
        status: {
            type: String,
            enum: STATUSES,
            default: 'Live'
        },
        views: {
            type: Number,
            default: 0
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [ true, 'userId is required' ]
        }

    },
    {
        timestamps: true
    }

)


export const Listing = mongoose.model<IListing>('Listing', listingSchema);