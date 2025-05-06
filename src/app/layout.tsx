<<<<<<< HEAD
import "./globals.css";
=======
import './globals.css'; 
>>>>>>> 741634173226c2ed36b9b943f2cf8782f98dd5cc

export const metadata = {
  title: "Mandy Lí",
  description: "Sistema de autenticación",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
