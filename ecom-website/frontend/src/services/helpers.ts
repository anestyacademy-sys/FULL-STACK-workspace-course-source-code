// Small helpers used by the pages, so we do not repeat them everywhere.

// 480000  ->  "₹4,80,000"    ( en-IN puts the commas the indian way )
export const formatPrice = (price: number) : string =>{
    return '$' + price.toLocaleString('en-US');
}

// "2026-09-22T10:00:00.000Z"  ->  "2 hours ago"
export const timeAgo = (date: string) : string =>{

    const seconds = ( Date.now() - new Date(date).getTime() ) / 1000;

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if(minutes < 1)  return 'just now';
    if(minutes < 60) return minutes === 1 ? '1 minute ago' : minutes + ' minutes ago';
    if(hours < 24)   return hours === 1 ? '1 hour ago' : hours + ' hours ago';
    if(days === 1)   return 'yesterday';

    return days + ' days ago';
}

// "2023-04-01T..."  ->  "2023"
export const yearOf = (date: string) : string =>{
    return new Date(date).getFullYear().toString();
}

// the backend gives "/uploads/listings/listing-123.jpg", the browser needs the full url
export const imageUrl = (image?: string | null) : string | null =>{
    return image ? 'http://localhost:5000' + image : null;
}