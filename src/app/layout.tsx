import './globals.css'; 
import { LoadingProvider } from '@/components/providers/LoadingProvider';
import { Loader } from '@/components/Loader';

export const metadata = {
  title: "Mandy Lí",
  description: "Sistema de autenticación",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <LoadingProvider>
             <Loader />
            {children}
        </LoadingProvider>
        </body>
    </html>
  );
}
