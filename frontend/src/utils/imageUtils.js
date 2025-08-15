// Utility function to get full image URL from Strapi response
export const getImageUrl = (imageData) => {
  if (!imageData?.data?.attributes?.url) {
    return null;
  }
  
  const imageUrl = imageData.data.attributes.url;
  
  // If the URL is already absolute (starts with http), return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // If it's a relative URL, prepend the server URL
  return `http://localhost:1337${imageUrl}`;
};

// Alternative function for background images in CSS
export const getImageUrlForCSS = (imageData) => {
  const url = getImageUrl(imageData);
  return url ? `url(${url})` : 'none';
}; 