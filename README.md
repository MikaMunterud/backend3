# Getting started

Install the required dependencies:

```bash

npm install
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on **Vercel**

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Configuration

To configure the Dashboard application, you'll need to set up the necessary environment variables. Create an `.env` file in the project root and specify the following variables:

### Clerk Authentication Configuration:

- **Clerk Publishable API Key** (Replace with your actual key):
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk Publishable API Key.

- **Clerk Secret API Key** (Replace with your actual key):
  - `CLERK_SECRET_KEY`: Your Clerk Secret API Key.

### Clerk Authentication URLs:

- **URL for Signing In**:
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: URL for signing in.

- **URL for Signing Up**:
  - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: URL for signing up.

- **URL to Redirect After Signing In**:
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: URL to redirect after signing in.

- **URL to Redirect After Signing Up**:
  - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: URL to redirect after signing up.

### Cloudinary Configuration:

- **Your Cloudinary Cloud Name** (Replace with your actual name):
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.

### Database Configuration:

- **Your Database Connection URL** (Replace with your actual database URL):
  - `DATABASE_URL`: Your database connection URL.

Ensure that you replace the example values with your actual keys, URLs, and names. These environment variables are crucial for the proper functioning of the Dashboard application.


## Key Features

- **Store Management**: Easily add, view, edit, and delete store information.
- **Order Management**: Keep track of customer orders, update their status, and view order details.
- **Product Management**: Add, edit, and delete products, including descriptions, prices, and images.
- **Color, Size, and Category Management**: Manage attributes that define your product catalog.
- **User Authentication**: Secure access control for authorized users.

## Future Functions

In addition to the existing key features, the Dashboard for Store Management project has the potential for future enhancements, including:

- **Mobile Application**: Develop a mobile application for on-the-go management and monitoring.
- **Reporting and Analytics**: Integrate reporting and analytics tools to provide insights into sales, customer behavior, and store performance.
- **Enhanced Product Search**: Implement advanced product search and filtering options for an improved user experience.
- **Customer Reviews and Ratings**: Allow customers to leave reviews and ratings for products.
- **Stripe Pay**: Implement Stripe for payment. 
