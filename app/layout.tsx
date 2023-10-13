import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/providers/theme-provider';
import { ModalProvider } from '@/providers/modal-provider';
import { ToastProvider } from '@/providers/toast-provider';

export const metadata = {
  title: 'E-commerce dashboard',
  description: 'Next.js application with Clerk & Prisma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <body>{children}</body>
          <ToastProvider />
          <ModalProvider />
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
