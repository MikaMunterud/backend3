import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/providers/theme-provider';

export const metadata = {
  title: 'Next.js 13 with Clerk',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/*        <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <body>{children}</body>
        {/* </ThemeProvider> */}
      </html>
    </ClerkProvider>
  );
}
