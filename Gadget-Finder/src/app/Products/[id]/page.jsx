"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const ProductDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageZoomed, setImageZoomed] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.product);
          setRelatedProducts(data.relatedProducts || []);
          setSelectedColor(data.product.colors?.[0] || "");
        } else {
          setError(data.error || "Failed to fetch product details");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  // Enhanced fallback images for different categories
  const getFallbackImage = (category) => {
    const fallbackImages = {
      Smartphones:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      "Laptops & Computers":
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      Tablets:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      "Smart Watches":
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      "Headphones & Audio":
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      "Gaming Consoles":
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      "Cameras & Photography":
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      "Smart Home Devices":
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      "Televisions & Displays":
        "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      Electronics:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      Gadgets:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      default:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
    };
    return fallbackImages[category] || fallbackImages.default;
  };

  // Get product images with fallbacks
  const getProductImages = () => {
    if (
      product?.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      return product.images;
    }
    return [getFallbackImage(product?.category)];
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8 animate-pulse"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery skeleton */}
          <div className="space-y-4">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
            <div className="flex space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Related product card
  const RelatedProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
      setImageError(true);
      setImageLoading(false);
    };

    const handleImageLoad = () => {
      setImageLoading(false);
      setImageError(false);
    };

    const getImage = () => {
      if (
        product.images &&
        Array.isArray(product.images) &&
        product.images.length > 0
      ) {
        return product.images[0];
      }
      return getFallbackImage(product.category);
    };

    return (
      <Link href={`/products/${product._id}`} className="group">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            )}
            <img
              src={getImage()}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ display: imageLoading ? "none" : "block" }}
            />
          </div>
          <div className="p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {product.name}
            </h4>
            {product.price && (
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                ${parseFloat(product.price).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  };

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link
            href="/Products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const productImages = getProductImages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <span>›</span>
          <Link
            href="/Products"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Products
          </Link>
          <span>›</span>
          {product.category && (
            <>
              <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {product.category}
              </span>
              <span>›</span>
            </>
          )}
          <span className="text-gray-900 dark:text-white font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              {product.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                    ⭐ Featured
                  </span>
                </div>
              )}
              <div
                className={`h-96 lg:h-[500px] relative overflow-hidden cursor-zoom-in ${
                  imageZoomed ? "cursor-zoom-out" : ""
                }`}
                onClick={() => setImageZoomed(!imageZoomed)}
              >
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    imageZoomed ? "scale-150" : "hover:scale-105"
                  }`}
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setImageZoomed(false);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category Badge */}
            {product.category && (
              <span className="inline-block px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                {product.category}
              </span>
            )}

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            {/* Brand */}
            {product.brand && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                by <span className="font-semibold">{product.brand}</span>
              </p>
            )}

            {/* Price and Stock */}
            <div className="flex items-center justify-between">
              <div>
                {product.price && (
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                    ${parseFloat(product.price).toFixed(2)}
                  </p>
                )}
                {product.stock && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {product.stock} in stock
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Available Colors
                </h3>
                <div className="flex space-x-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color
                          ? "border-gray-900 dark:border-white ring-2 ring-offset-2 ring-gray-400"
                          : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Selected: {selectedColor}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <RelatedProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
