// Client-side API function to post product data
export const Mdata = async (payload) => {
  try {
    const response = await fetch("/api/AddProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message,
        productId: data.productId,
      };
    } else {
      return {
        success: false,
        error: data.error || "Failed to add product",
      };
    }
  } catch (error) {
    console.error("Error posting data:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
};
