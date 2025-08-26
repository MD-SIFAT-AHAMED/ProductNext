"use client";

import { useState } from "react";

export default function About() {
  const [activeTab, setActiveTab] = useState("mission");

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: "😊" },
    { number: "5000+", label: "Products Available", icon: "📱" },
    { number: "50+", label: "Top Brands", icon: "⭐" },
    { number: "99%", label: "Customer Satisfaction", icon: "💯" },
  ];

  const features = [
    {
      icon: "🔍",
      title: "Easy Product Discovery",
      description:
        "Our intuitive search and filtering system helps you find the perfect gadget from thousands of products across multiple categories.",
    },
    {
      icon: "✅",
      title: "Quality Guaranteed",
      description:
        "Every product is carefully curated and sourced from trusted brands to ensure you get authentic, high-quality electronics.",
    },
    {
      icon: "🚚",
      title: "Fast & Secure Delivery",
      description:
        "We provide reliable shipping with tracking, secure packaging, and hassle-free returns to ensure your satisfaction.",
    },
    {
      icon: "💰",
      title: "Best Price Promise",
      description:
        "Competitive pricing, regular deals, and exclusive offers ensure you get the best value for your money on all gadgets.",
    },
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      content:
        "To simplify the way people discover and purchase electronic gadgets by providing a comprehensive platform with authentic products, detailed information, and exceptional customer service. We believe everyone deserves access to the latest technology at the best prices.",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    vision: {
      title: "Our Vision",
      content:
        "To become the most trusted destination for electronic gadgets and technology products, where customers can confidently find, compare, and purchase the perfect device for their needs. We envision a future where technology shopping is effortless and enjoyable.",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    values: {
      title: "Our Values",
      content:
        "Customer satisfaction, product authenticity, and technological innovation drive everything we do. We are committed to transparency in pricing, honest product descriptions, and providing the latest gadgets from trusted brands worldwide.",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-800/20 dark:to-purple-800/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 dark:from-purple-800/20 dark:to-pink-800/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            About Gadget Finder
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your ultimate destination for discovering and purchasing the latest
            electronic gadgets, from smartphones and laptops to smart home
            devices and gaming accessories.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content with Tabs */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div>
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {tabContent[tab].title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {tabContent[activeTab].content}
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={tabContent[activeTab].image}
                alt={tabContent[activeTab].title}
                className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  ✨
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    Tech Excellence
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Since 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Ready to Find Your Perfect Gadget?
              </h3>
              <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Explore our extensive collection of premium electronics and
                discover the latest technology that fits your lifestyle and
                budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 border-none px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Shop Now
                </button>
                <button className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition-all duration-300">
                  Browse Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
