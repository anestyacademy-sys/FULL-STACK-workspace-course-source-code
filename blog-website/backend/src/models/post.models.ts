import mongoose, { Schema, Document, Types } from "mongoose";


export interface IPost extends Document {
    title: string;
    slug: string;
    tag: string;
    readTime: string;
    excerpt: string;
    body: string;
    quote?: string;
    image?: string | null;
    status: 'published' | 'draft';
    authorId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const postSchema = new Schema<IPost>({

        title: {
            type: String,
            required: [ true, 'post title is required' ]
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true
        },
        tag: {
            type: String,
            default: 'Notes'
        },
        readTime: {
            type: String,
            default: '5 min'
        },
        excerpt: {
            type: String,
            required: [ true, 'excerpt is required' ]
        },
        body: {
            type: String,
            required: [ true, 'body is required' ]
        },
        quote: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: null
        },
        status: {
            type: String,
            enum: ['published', 'draft'],
            default: 'published'
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [ true, 'author is required' ]
        }

    },
    {
        timestamps: true
    }

)


// build the slug from the title when the user did not type one
postSchema.pre('save', async function(){

    if( this.slug && !this.isModified('title') ){
        return;
    }

    const source = this.slug ? this.slug : this.title;

    this.slug = source
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

    const slugExist = await mongoose.models.Post?.findOne({
        slug: this.slug,
        _id: { $ne : this._id }
    })

    if(slugExist){
        this.slug = `${this.slug}-${Date.now()}`
    }

})


export const Post = mongoose.model<IPost>('Post', postSchema);


