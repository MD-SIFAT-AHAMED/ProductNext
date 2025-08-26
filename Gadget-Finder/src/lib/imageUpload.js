// Image upload utility using ImgBB API
export const uploadImageToImgBB = async (imageFile) => {
  const API_KEY =
    process.env.NEXT_IMGBB_API_KEY || "35d533c9830c979166daa6d60911d270"; // You'll need to set this

  if (!imageFile) {
    throw new Error("No image file provided");
  }

  // Create FormData for the API request
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("key", API_KEY);

  try {
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        url: data.data.url,
        displayUrl: data.data.display_url,
        deleteUrl: data.data.delete_url,
        size: data.data.size,
      };
    } else {
      throw new Error(data.error?.message || "Failed to upload image");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return {
      success: false,
      error: error.message || "Failed to upload image",
    };
  }
};

// Upload multiple images
export const uploadMultipleImages = async (imageFiles) => {
  const uploadPromises = Array.from(imageFiles).map((file) =>
    uploadImageToImgBB(file)
  );

  try {
    const results = await Promise.all(uploadPromises);
    const successful = results.filter((result) => result.success);
    const failed = results.filter((result) => !result.success);

    return {
      success: failed.length === 0,
      uploaded: successful,
      failed: failed,
      urls: successful.map((result) => result.url),
    };
  } catch (error) {
    console.error("Multiple image upload error:", error);
    return {
      success: false,
      error: error.message || "Failed to upload images",
      uploaded: [],
      failed: [],
      urls: [],
    };
  }
};
