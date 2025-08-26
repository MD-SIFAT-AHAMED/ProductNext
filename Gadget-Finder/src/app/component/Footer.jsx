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
                  Product Next
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Your ultimate destination for discovering and purchasing the
                  latest electronic gadgets. From smartphones to smart home
                  devices, we bring you authentic products from trusted brands
                  at the best prices.
                </p>
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

          
        </div>

       
      </div>
    </footer>
  );
}
