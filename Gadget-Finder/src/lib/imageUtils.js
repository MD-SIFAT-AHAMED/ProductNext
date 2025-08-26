// Image utility functions for handling image loading and validation

/**
 * Validates if an image URL is accessible
 * @param {string} url - The image URL to validate
 * @returns {Promise<boolean>} - True if image is accessible, false otherwise
 */
export const validateImageUrl = async (url) => {
  if (!url || typeof url !== "string") {
    return false;
  }

  try {
    const response = await fetch(url, { method: "HEAD" });
    return (
      response.ok && response.headers.get("content-type")?.startsWith("image/")
    );
  } catch (error) {
    console.warn("Image validation failed for URL:", url, error);
    return false;
  }
};

/**
 * Preloads an image and returns a promise
 * @param {string} src - The image source URL
 * @returns {Promise<HTMLImageElement>} - Promise that resolves with the loaded image
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    if (!src) {
      reject(new Error("No image source provided"));
      return;
    }

    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Gets fallback image URL based on category
 * @param {string} category - Product category
 * @returns {string} - Fallback image URL
 */
export const getFallbackImage = (category) => {
  const fallbackImages = {
    Smartphones:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "Laptops & Computers":
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    Tablets:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "Smart Watches":
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "Headphones & Audio":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "Gaming Consoles":
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "Cameras & Photography":
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "Smart Home Devices":
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    "Televisions & Displays":
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    Electronics:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    Gadgets:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
    default:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center&auto=format&q=80",
  };

  return fallbackImages[category] || fallbackImages.default;
};

/**
 * Filters and validates image URLs from an array
 * @param {string[]} imageUrls - Array of image URLs
 * @returns {Promise<string[]>} - Array of valid image URLs
 */
export const filterValidImages = async (imageUrls) => {
  if (!Array.isArray(imageUrls)) {
    return [];
  }

  const validationPromises = imageUrls.map(async (url) => {
    const isValid = await validateImageUrl(url);
    return isValid ? url : null;
  });

  const results = await Promise.all(validationPromises);
  return results.filter((url) => url !== null);
};

/**
 * Gets the best available image for a product
 * @param {Object} product - Product object with images array and category
 * @returns {string} - Best available image URL or fallback
 */
export const getBestProductImage = (product) => {
  // Check if product has images array and it's not empty
  if (
    product.images &&
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {
    // Return the first image URL
    return product.images[0];
  }

  // If no images, return fallback based on category
  return getFallbackImage(product.category);
};

/**
 * Custom hook-like function for handling image loading states
 * @param {string} src - Image source URL
 * @param {string} fallbackSrc - Fallback image URL
 * @returns {Object} - Object with loading state and error handling
 */
export const createImageLoader = (src, fallbackSrc) => {
  let isLoading = true;
  let hasError = false;
  let currentSrc = src;

  const handleLoad = () => {
    isLoading = false;
    hasError = false;
  };

  const handleError = () => {
    isLoading = false;
    hasError = true;
    currentSrc = fallbackSrc;
  };

  return {
    src: currentSrc,
    isLoading,
    hasError,
    onLoad: handleLoad,
    onError: handleError,
  };
};
