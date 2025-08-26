"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: {
      title: "Shop Categories",
      links: [
        { name: "Smartphones", href: "/Products?category=smartphones" },
        { name: "Laptops & Computers", href: "/Products?category=laptops" },
        { name: "Gaming", href: "/Products?category=gaming" },
        { name: "Smart Home", href: "/Products?category=smart-home" },
        { name: "Audio & Headphones", href: "/Products?category=audio" },
        { name: "Wearables", href: "/Products?category=wearables" },
      ],
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Story", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press & Media", href: "#" },
        { name: "Contact Us", href: "#" },
      ],
    },
    support: {
      title: "Customer Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Shipping Info", href: "#" },
        { name: "Returns & Exchanges", href: "#" },
        { name: "Warranty", href: "#" },
        { name: "Track Your Order", href: "#" },
        { name: "Product Reviews", href: "#" },
      ],
    },
  };

  const socialLinks = [
    { name: "Facebook", icon: "📘", href: "https://facebook.com/" },
    { name: "Twitter", icon: "🐦", href: "https://twitter.com/" },
    {
      name: "Instagram",
      icon: "📷",
      href: "https://instagram.com/",
    },
    { name: "YouTube", icon: "📺", href: "https://youtube.com/" },
    { name: "TikTok", icon: "🎵", href: "https://tiktok.com/" },
  ];

  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "PayPal", icon: "💰" },
    { name: "Apple Pay", icon: "📱" },
    { name: "Google Pay", icon: "🔍" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Gadget Finder
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Your ultimate destination for discovering and purchasing the
                  latest electronic gadgets. From smartphones to smart home
                  devices, we bring you authentic products from trusted brands
                  at the best prices.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">📍</span>
                  <span>123 Tech Plaza, Digital District, TD 12345</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">📞</span>
                  <span>+8801601949074</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">✉️</span>
                  <span>shutshob@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-xl">🕒</span>
                  <span>24/7 Customer Support</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h4 className="text-lg font-semibold mb-6 text-white">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter & Features Section */}
          <div className="mt-16 pt-12 border-t border-gray-700">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Stay Updated with Latest Tech
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Get exclusive deals, product launches, tech reviews, and
                  gadget recommendations delivered straight to your inbox.
                </p>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email for tech updates"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Features & Payment Methods */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Key Features */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">
                  Why Choose Gadget Finder?
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Authentic Products</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Fast Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Best Price Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Easy Returns</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Expert Reviews</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">
                  Secure Payment Methods
                </h4>
                <div className="flex flex-wrap gap-3">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg text-sm text-gray-300"
                    >
                      <span>{method.icon}</span>
                      <span>{method.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  All transactions are secured with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} Gadget Finder. All rights reserved. | Trusted by
                10K+ tech enthusiasts worldwide
              </div>

              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <a
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="/cookies"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Cookie Policy
                </a>
                <a
                  href="/sitemap"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
