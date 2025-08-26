"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLoading } from "../../context/LoadingContext";
import { ProductCardSkeleton } from "../../components/ui/Skeleton";
import { OptimizedImage } from "../../components/ui/ImageLoader";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const productsPerPage = 9;

  // Fetch all products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          setError(data.error || "Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Enhanced loading skeleton component
  const ProductSkeleton = () => (
    <ProductCardSkeleton animation="shimmer" className="animate-fadeIn" />
  );

  // Product card component
  const ProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fallbackUsed, setFallbackUsed] = useState(false);

    // Enhanced fallback images for different categories
    const getFallbackImage = (category) => {
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

    // Get the current image to display
    const getCurrentImage = () => {
      if (fallbackUsed) {
        return getFallbackImage(product.category);
      }

      if (
        product.images &&
        Array.isArray(product.images) &&
        product.images.length > 0
      ) {
        return (
          product.images[currentImageIndex] ||
          getFallbackImage(product.category)
        );
      }

      return getFallbackImage(product.category);
    };

    const handleImageError = () => {
      console.warn(
        "Product image failed to load:",
        getCurrentImage(),
        "for product:",
        product.name
      );

      // Try next image in array if available
      if (product.images && currentImageIndex < product.images.length - 1) {
        setCurrentImageIndex((prev) => prev + 1);
        setImageLoading(true);
        return;
      }

      // Use fallback image
      setImageError(true);
      setImageLoading(false);
      setFallbackUsed(true);
    };

    const handleImageLoad = () => {
      setImageLoading(false);
      setImageError(false);
    };

    // Reset states when product changes
    React.useEffect(() => {
      setImageError(false);
      setImageLoading(true);
      setCurrentImageIndex(0);
      setFallbackUsed(false);
    }, [product._id]);

    return (
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
          <OptimizedImage
            src={product.images?.[0] || ""}
            alt={product.name || "Product image"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            fallbacks={product.images?.slice(1) || []}
            category={product.category}
            lazy={true}
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category Badge */}
          {product.category && (
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
              {product.category}
            </span>
          )}

          {/* Product Name */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
            {product.name || "Unnamed Product"}
          </h3>

          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              by {product.brand}
            </p>
          )}

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
            {product.description || "No description available"}
          </p>

          {/* Price and Stock */}
          <div className="flex items-center justify-between mb-4">
            <div>
              {product.price && (
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
              )}
              {product.stock && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {product.stock} in stock
                </p>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></div>
                ))}
                {product.colors.length > 3 && (
                  <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      +
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Features - Show top 2 */}
          {product.features && product.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                    +{product.features.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <Link
            href={`/Products/${product._id}`}
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  };

  // Pagination component
  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      }

      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center space-x-2 mt-12">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              page === currentPage
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : page === "..."
                ? "cursor-default text-gray-500 dark:text-gray-400"
                : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Discover our complete collection of premium products designed to
            enhance your lifestyle
          </p>

          {/* Products Count */}
          {!loading && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {currentProducts.length} of {filteredProducts.length}{" "}
              products
              {filteredProducts.length !== products.length &&
                ` (filtered from ${products.length} total)`}
            </p>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none pr-10"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              ▼
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <div className="text-red-600 dark:text-red-400 text-2xl mr-3">
                ❌
              </div>
              <p className="text-red-800 dark:text-red-200 font-medium text-center">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {loading
            ? // Loading skeletons
              Array.from({ length: 9 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : currentProducts.length > 0
            ? // Product cards
              currentProducts.map((product) => (
                <ProductCard
                  key={product._id || product.sku}
                  product={product}
                />
              ))
            : // No products found
              !loading && (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm || selectedCategory !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "No products are available at the moment"}
                  </p>
                  {(searchTerm || selectedCategory !== "all") && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("all");
                      }}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
        </div>

        {/* Pagination */}
        <Pagination />

        {/* Add Product CTA */}
        {!loading && products.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No Products Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start building your product catalog by adding your first product
            </p>
            <Link
              href="/AddProduct"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">➕</span>
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
