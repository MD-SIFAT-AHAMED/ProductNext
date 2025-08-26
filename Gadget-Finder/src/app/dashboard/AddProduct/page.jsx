"use client";

import { Mdata } from "@/lib/PostData";
import { uploadMultipleImages } from "@/lib/imageUpload";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useToast, ToastContainer } from "@/components/ui/Toast";

export default function AddElectronicProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    model: "",
    sku: "",
    stock: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    // Electronic-specific fields
    specifications: {
      processor: "",
      ram: "",
      storage: "",
      displaySize: "",
      resolution: "",
      batteryLife: "",
      operatingSystem: "",
      connectivity: [],
      ports: [],
      warranty: "",
    },
    features: [],
    colors: [],
    powerRequirements: {
      voltage: "",
      wattage: "",
      batteryType: "",
    },
    certifications: [],
    tags: "",
    status: "active",
    featured: false,
    images: [],
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const electronicCategories = [
    "Smartphones",
    "Laptops & Computers",
    "Tablets",
    "Smart Watches",
    "Headphones & Audio",
    "Gaming Consoles",
    "Cameras & Photography",
    "Smart Home Devices",
    "Televisions & Displays",
    "Networking Equipment",
    "Power Banks & Chargers",
    "Drones & RC",
    "VR & AR Devices",
    "Other Electronics",
  ];

  const connectivityOptions = [
    "WiFi",
    "Bluetooth",
    "5G",
    "4G LTE",
    "NFC",
    "USB-C",
    "Lightning",
    "Ethernet",
    "HDMI",
  ];

  const portOptions = [
    "USB-A",
    "USB-C",
    "Lightning",
    "HDMI",
    "3.5mm Audio",
    "Ethernet",
    "SD Card",
    "MicroSD",
    "Thunderbolt",
  ];

  const certificationOptions = [
    "CE",
    "FCC",
    "RoHS",
    "Energy Star",
    "IP67",
    "IP68",
    "MFi Certified",
    "Qi Certified",
  ];

  const colorOptions = [
    "Black",
    "White",
    "Silver",
    "Gold",
    "Rose Gold",
    "Blue",
    "Red",
    "Green",
    "Purple",
    "Pink",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const { toasts, showSuccess, showError, showWarning, showInfo, removeToast } =
    useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      showError("Product name is required");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      showError("Valid price is required");
      return;
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      showError("Valid stock quantity is required");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress("");

    try {
      let imageUrls = [];

      // Upload images to ImgBB if any images are selected
      if (uploadedImages.length > 0) {
        setUploadProgress("Uploading images...");
        showInfo(`Uploading ${uploadedImages.length} images...`, {
          duration: 3000,
        });

        const imageFiles = uploadedImages.map((img) => img.file);
        const uploadResult = await uploadMultipleImages(imageFiles);

        if (uploadResult.success) {
          imageUrls = uploadResult.urls;
          setUploadProgress(`Successfully uploaded ${imageUrls.length} images`);
          showSuccess(`Successfully uploaded ${imageUrls.length} images`, {
            duration: 2000,
          });
        } else {
          showError(`Image upload failed: ${uploadResult.error}`);
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare product data with uploaded image URLs
      const productDataWithImages = {
        ...formData,
        images: imageUrls,
      };

      setUploadProgress("Saving product...");
      showInfo("Saving product to database...", { duration: 3000 });

      console.log("Electronic Product Data:", productDataWithImages);
      const result = await Mdata(productDataWithImages);

      if (result.success) {
        showSuccess(
          "🎉 Product added successfully! Your electronic gadget is now live.",
          {
            duration: 6000,
          }
        );
        setUploadProgress("");

        // Reset form after successful submission
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          brand: "",
          model: "",
          sku: "",
          stock: "",
          weight: "",
          dimensions: {
            length: "",
            width: "",
            height: "",
          },
          specifications: {
            processor: "",
            ram: "",
            storage: "",
            displaySize: "",
            resolution: "",
            batteryLife: "",
            operatingSystem: "",
            connectivity: [],
            ports: [],
            warranty: "",
          },
          features: [],
          colors: [],
          powerRequirements: {
            voltage: "",
            wattage: "",
            batteryType: "",
          },
          certifications: [],
          tags: "",
          status: "active",
          featured: false,
          images: [],
        });
        setUploadedImages([]);
      } else {
        showError(
          `Failed to add product: ${result.error || "Unknown error occurred"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showError(
        "An unexpected error occurred. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            Add Electronic Gadget
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create a comprehensive listing for your electronic device with
            detailed specifications
          </p>
        </div>

        {/* Upload Progress */}
        {uploadProgress && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <div className="text-blue-600 dark:text-blue-400 mr-3">
                <LoadingSpinner size="sm" variant="primary" />
              </div>
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                {uploadProgress}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">📱</span>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., iPhone 15 Pro Max"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  SKU *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., ELEC-001-2024"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Electronic Category</option>
                  {electronicCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Apple, Samsung, Sony"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Model Number
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., A2848, SM-G998B"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Warranty Period
                </label>
                <input
                  type="text"
                  name="specifications.warranty"
                  value={formData.specifications.warranty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 1 Year, 2 Years"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Detailed product description including key features and benefits"
                  required
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">⚙️</span>
              Technical Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Processor/Chipset
                </label>
                <input
                  type="text"
                  name="specifications.processor"
                  value={formData.specifications.processor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., A17 Pro, Snapdragon 8 Gen 3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  RAM/Memory
                </label>
                <input
                  type="text"
                  name="specifications.ram"
                  value={formData.specifications.ram}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 8GB, 16GB LPDDR5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Storage
                </label>
                <input
                  type="text"
                  name="specifications.storage"
                  value={formData.specifications.storage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 256GB SSD, 1TB NVMe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Display Size
                </label>
                <input
                  type="text"
                  name="specifications.displaySize"
                  value={formData.specifications.displaySize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 6.7 inches, 15.6 inches"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Resolution
                </label>
                <input
                  type="text"
                  name="specifications.resolution"
                  value={formData.specifications.resolution}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., 2796×1290, 1920×1080"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Battery Life
                </label>
                <input
                  type="text"
                  name="specifications.batteryLife"
                  value={formData.specifications.batteryLife}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., Up to 29 hours, 5000mAh"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Operating System
                </label>
                <input
                  type="text"
                  name="specifications.operatingSystem"
                  value={formData.specifications.operatingSystem}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g., iOS 17, Android 14, Windows 11"
                />
              </div>
            </div>
          </div>

          {/* Connectivity & Ports */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">🔌</span>
              Connectivity & Ports
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Connectivity Options
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {connectivityOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={formData.specifications.connectivity.includes(
                          option
                        )}
                        onChange={(e) => {
                          const connectivity =
                            formData.specifications.connectivity;
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              specifications: {
                                ...prev.specifications,
                                connectivity: [...connectivity, option],
                              },
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              specifications: {
                                ...prev.specifications,
                                connectivity: connectivity.filter(
                                  (item) => item !== option
                                ),
                              },
                            }));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Available Ports
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {portOptions.map((port) => (
                    <label
                      key={port}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={port}
                        checked={formData.specifications.ports.includes(port)}
                        onChange={(e) => {
                          const ports = formData.specifications.ports;
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              specifications: {
                                ...prev.specifications,
                                ports: [...ports, port],
                              },
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              specifications: {
                                ...prev.specifications,
                                ports: ports.filter((item) => item !== port),
                              },
                            }));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {port}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Colors & Features */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">🎨</span>
              Colors & Features
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Available Colors
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {colorOptions.map((color) => (
                    <label
                      key={color}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={color}
                        checked={formData.colors.includes(color)}
                        onChange={(e) => {
                          const colors = formData.colors;
                          if (e.target.checked) {
                            setFormData((prev) => ({
                              ...prev,
                              colors: [...colors, color],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              colors: colors.filter((item) => item !== color),
                            }));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {color}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Key Features (one per line)
                </label>
                <textarea
                  value={formData.features.join("\n")}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      features: e.target.value
                        .split("\n")
                        .filter((feature) => feature.trim()),
                    }));
                  }}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="e.g.,&#10;Face ID authentication&#10;Wireless charging&#10;Water resistant&#10;5G connectivity"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">💰</span>
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="0.0"
                  step="0.1"
                />
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="text-2xl mr-3">📸</span>
              Product Images
            </h2>

            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="text-6xl mb-4">📁</div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Drag & drop images here
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">or</p>
              <label className="btn btn-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 cursor-pointer">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>

            {/* Image Preview */}
            {uploadedImages.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Uploaded Images ({uploadedImages.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt="Product"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex items-center justify-center space-x-3 px-12 py-4 
                bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                rounded-full font-semibold shadow-lg hover:shadow-xl 
                transform transition-all duration-300
                ${
                  isSubmitting
                    ? "opacity-75 cursor-not-allowed scale-95"
                    : "hover:scale-105 hover:from-blue-700 hover:to-purple-700"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" variant="white" />
                  <span>Adding Product...</span>
                </>
              ) : (
                <>
                  <span>📱</span>
                  <span>Add Electronic Product</span>
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-lg btn-outline border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-12 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Save as Draft
            </button>
          </div>
        </form>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />

        {/* Full Screen Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-sm w-full mx-4">
              <div className="text-center">
                <LoadingSpinner size="lg" variant="primary" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                  {uploadProgress || "Processing..."}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Please wait while we save your product
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
