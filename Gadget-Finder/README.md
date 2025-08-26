# Gadget Finder - E-commerce Platform

A comprehensive Next.js e-commerce platform for discovering and purchasing electronic gadgets, featuring Google OAuth authentication, product management, admin dashboard, and modern responsive design.

## 🚀 Features

### 🔐 Authentication & User Management

- **Google OAuth Integration**: Secure login with NextAuth.js
- **Session Management**: Database-backed sessions with MongoDB
- **Protected Routes**: Admin dashboard with authentication guards
- **Social Login**: One-click Google sign-in with automatic redirects

### 📱 Product Management

- **Product Catalog**: Browse extensive collection of electronic gadgets
- **Product Details**: Detailed product pages with specifications and images
- **Featured Products**: Curated showcase of top products
- **Admin Dashboard**: Add, edit, and manage products with intuitive interface
- **Product Categories**: Organized by brands, categories, and features

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Interactive Components**: Smooth animations and hover effects
- **Hero Slider**: Dynamic product showcases with Swiper.js
- **Loading States**: Skeleton loaders and spinners for better UX

### 🛠️ Technical Features

- **Database Integration**: MongoDB with optimized connection handling
- **API Routes**: RESTful endpoints for products, authentication, and features
- **Image Handling**: Support for product images with fallback system
- **Build Optimization**: Graceful handling of missing environment variables
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🌐 Live Demo

**[View Live Site](https://assignment-landing-page-silk.vercel.app/)**

Experience the full functionality of this modern e-commerce landing page! The live demo showcases all features including product browsing, responsive design, and interactive components.

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.5.0 with Turbopack
- **React**: React 19.1.0 with React DOM 19.1.0
- **Styling**: Tailwind CSS 4.0 with PostCSS
- **UI Components**: Radix UI, DaisyUI 5.0.50
- **Icons**: Lucide React, React Icons
- **Animations**: TW Animate CSS, Custom CSS transitions

### Backend & Database

- **API**: Next.js API Routes
- **Database**: MongoDB 5.9.2 with connection pooling
- **Authentication**: NextAuth.js 4.24.11 with MongoDB Adapter
- **Session Storage**: Database-backed sessions

### Authentication & Security

- **OAuth Provider**: Google OAuth 2.0
- **Session Management**: NextAuth.js with MongoDB adapter
- **Security**: CSRF protection, secure cookies, JWT tokens

### Development Tools

- **Build Tool**: Turbopack (Next.js)
- **Linting**: ESLint 9 with Next.js config
- **Styling**: Tailwind CSS with class variance authority
- **Theme**: Next-themes for dark/light mode
- **Utilities**: clsx, tailwind-merge for conditional styling

### Additional Integrations

- **Image Carousel**: Swiper.js 11.2.10
- **Cloud Services**: Firebase 12.1.0 (for additional features)
- **UI Utilities**: Class Variance Authority, Radix UI Slot

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd assignment-landing-page
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # MongoDB Configuration
   MONGODB_URI=your_mongodb_connection_string
   DB_Name=your_database_name

   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # NextAuth Configuration
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # Example for local MongoDB:
   # MONGODB_URI=mongodb://localhost:27017/gadget_finder
   # DB_Name=gadget_finder
   ```

4. **Configure Google OAuth**

   a. Go to [Google Cloud Console](https://console.cloud.google.com/)

   b. Create a new project or select existing one

   c. Enable Google+ API

   d. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"

   e. Configure OAuth consent screen

   f. Add authorized redirect URIs:

   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

   g. Copy Client ID and Client Secret to your `.env.local` file

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/                           # API routes
│   │   ├── auth/[...nextauth]/        # NextAuth.js authentication
│   │   ├── AddProduct/                # Product creation endpoint
│   │   ├── products/                  # Product CRUD operations
│   │   └── featured-products/         # Featured products endpoint
│   ├── component/                     # Reusable components
│   │   ├── About.jsx                  # About section with company info
│   │   ├── ClientNavbar.jsx           # Client-side navigation
│   │   ├── FeaturedProducts.jsx       # Featured products showcase
│   │   ├── Footer.jsx                 # Site footer
│   │   ├── Navber.jsx                 # Main navigation
│   │   ├── Providers.jsx              # Context providers wrapper
│   │   └── SocialLoginButtons.jsx     # Google OAuth login buttons
│   ├── dashboard/                     # Admin dashboard
│   │   └── AddProduct/                # Product management interface
│   ├── Hero/                          # Hero section component
│   ├── login/                         # Authentication pages
│   └── Products/                      # Product listing and details
├── components/ui/                     # Reusable UI components
│   ├── button.jsx                     # Custom button component
│   ├── dropdown-menu.jsx              # Dropdown menu component
│   ├── GlobalPageLoader.jsx           # Global loading component
│   ├── ImageLoader.jsx                # Image loading component
│   ├── LoadingSpinner.jsx             # Loading spinner
│   ├── Skeleton.jsx                   # Skeleton loader
│   └── Toast.jsx                      # Toast notifications
├── context/                           # React context providers
│   └── LoadingContext.jsx             # Loading state management
└── lib/                               # Utility functions
    ├── dbConnect.js                   # MongoDB connection handler
    ├── imageUpload.js                 # Image handling utilities
    ├── imageUtils.js                  # Image processing utilities
    ├── PostData.js                    # Data posting utilities
    └── utils.js                       # General utilities
```

## 🔧 Key Features Explained

### Database Connection (`src/lib/dbConnect.js`)

- **Build-time Safety**: Automatically detects build context and provides mock database operations
- **Environment Validation**: Gracefully handles missing MongoDB credentials
- **Connection Pooling**: Optimized connection management for development and production
- **Error Handling**: Comprehensive error handling with fallback mechanisms

### API Endpoints

#### Authentication API

- `GET /api/auth/signin` - NextAuth.js sign-in page
- `POST /api/auth/signin/google` - Google OAuth sign-in
- `GET /api/auth/callback/google` - Google OAuth callback
- `POST /api/auth/signout` - Sign out user
- `GET /api/auth/session` - Get current user session

#### Products API

- `GET /api/products` - Fetch all products
- `GET /api/products/[id]` - Fetch specific product with related items
- `POST /api/AddProduct` - Create new product (requires authentication)
- `GET /api/featured-products` - Fetch featured products

#### Product Data Structure

```javascript
{
  name: "Product Name",
  price: 299.99,
  sku: "PROD-001",
  category: "Electronics",
  brand: "Brand Name",
  description: "Product description",
  features: ["Feature 1", "Feature 2"],
  colors: ["Red", "Blue"],
  images: ["image1.jpg", "image2.jpg"],
  stock: 50,
  featured: true
}
```

### Pages and Components

#### Main Pages

- **Home (`/`)**: Landing page with hero section and featured products
- **Products (`/Products`)**: Product listing with filtering and search
- **Product Details (`/Products/[id]`)**: Detailed product view with image gallery
- **Dashboard (`/dashboard/AddProduct`)**: Admin interface for adding products
- **Login (`/login`)**: User authentication

#### Key Components

- **Navigation**: Responsive navbar with theme toggle
- **Hero Slider**: Image carousel for promotional content
- **Product Cards**: Reusable product display components
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages

## 🎨 Styling and Theming

- **Tailwind CSS**: Utility-first CSS framework
- **Dark/Light Mode**: Built-in theme switching
- **Responsive Design**: Mobile-first approach
- **Custom Animations**: Smooth transitions and hover effects
- **Gradient Backgrounds**: Modern visual aesthetics

## 🔒 Environment Variables

| Variable               | Description                | Required | Example                                       |
| ---------------------- | -------------------------- | -------- | --------------------------------------------- |
| `MONGODB_URI`          | MongoDB connection string  | Yes      | `mongodb://localhost:27017/gadget_finder`     |
| `DB_Name`              | Database name              | Yes      | `gadget_finder`                               |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID     | Yes      | `your-google-client-id.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes      | `your-google-client-secret`                   |
| `NEXTAUTH_SECRET`      | NextAuth.js secret key     | Yes      | `your-random-secret-key`                      |
| `NEXTAUTH_URL`         | Application URL            | Yes      | `http://localhost:3000` (dev)                 |

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `DB_Name`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your production URL)
3. Update Google OAuth redirect URIs to include your production domain
4. Deploy automatically on push to main branch

### Other Platforms

1. Build the application: `npm run build`
2. Set all required environment variables on your platform
3. Ensure Google OAuth is configured with production URLs
4. Start the application: `npm start`

## 🐛 Troubleshooting

### Build Issues

- **MongoDB URI Error**: Ensure `.env.local` contains valid MongoDB credentials
- **Missing Dependencies**: Run `npm install` to install all dependencies
- **Build Failures**: Check that all environment variables are properly set
- **NextAuth Configuration**: Verify `NEXTAUTH_SECRET` is set for production builds

### Authentication Issues

- **Google OAuth Not Working**:
  - Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
  - Check that redirect URIs are properly configured in Google Cloud Console
  - Ensure `NEXTAUTH_URL` matches your domain
- **Session Issues**:
  - Verify MongoDB connection for session storage
  - Check that `NEXTAUTH_SECRET` is set and consistent
- **Redirect Problems**:
  - Verify callback URLs in Google OAuth settings
  - Check `NEXTAUTH_URL` environment variable

### Runtime Issues

- **Database Connection**: Verify MongoDB server is running and accessible
- **API Errors**: Check network connectivity and API endpoint URLs
- **Image Loading**: Ensure image URLs are accessible and properly formatted
- **Authentication Errors**: Check browser console for NextAuth.js error messages

## 📝 Development Notes

### Authentication Flow

The application uses NextAuth.js with Google OAuth for secure authentication:

1. **Sign In Process**:

   - User clicks "Sign in with Google" button
   - Redirected to Google OAuth consent screen
   - After approval, redirected back to `/api/auth/callback/google`
   - Session created and stored in MongoDB
   - User redirected to `/Products` page

2. **Session Management**:

   - Sessions stored in MongoDB for persistence
   - Automatic session refresh and validation
   - Secure cookie-based session handling

3. **Protected Routes**:
   - Admin dashboard requires authentication
   - Product creation endpoints check for valid sessions
   - Automatic redirect to login for unauthorized access

### Database Connection Handling

The application includes sophisticated database connection handling that:

- Detects build-time context to prevent connection attempts during static generation
- Provides mock database operations for build processes
- Maintains connection pooling for optimal performance
- Handles missing environment variables gracefully
- Supports both authentication sessions and product data storage

### Build Process

- Uses Turbopack for faster builds and development
- Supports static site generation for optimal performance
- Includes comprehensive error handling for missing dependencies
- Graceful fallbacks for missing authentication credentials during build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the environment variables setup
3. Ensure MongoDB is properly configured
4. Verify Google OAuth configuration
5. Check the browser console for detailed error messages
6. Review NextAuth.js documentation for authentication issues

## 🎯 Key Features Summary

- ✅ **Full-Stack E-commerce Platform** - Complete product catalog and management
- ✅ **Google OAuth Authentication** - Secure user login and session management
- ✅ **Admin Dashboard** - Product management interface for administrators
- ✅ **Responsive Design** - Works seamlessly on all devices
- ✅ **Dark/Light Theme** - User preference-based theming
- ✅ **Modern UI/UX** - Built with latest design principles
- ✅ **Database Integration** - MongoDB with optimized connection handling
- ✅ **API-First Architecture** - RESTful endpoints for all operations
- ✅ **Production Ready** - Comprehensive error handling and build optimization

---

**Built with ❤️ using Next.js, NextAuth.js, MongoDB, and Google OAuth**
