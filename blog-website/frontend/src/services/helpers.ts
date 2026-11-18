// "2026-09-14T10:00:00.000Z"  ->  "Sep 14, 2026"
export const formatDate = (date: string) : string =>{
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

// the backend gives "/uploads/posts/post-123.jpg", the browser needs the full url
export const imageUrl = (image?: string | null) : string | null =>{
    return image ? 'http://localhost:4000' + image : null;
}