// The author is populated by the backend, so it comes back as an object
export interface Author {
    _id: string;
    name: string;
    email: string;
}
export interface Post {
    _id: string;
    title: string;
    slug: string;
    tag: string;
    readTime: string;
    excerpt: string;
    body: string;
    quote?: string;
    image?: string | null;
    status: 'published' | 'draft';
    authorId: Author | string;
    createdAt: string;
    updatedAt: string;
}
