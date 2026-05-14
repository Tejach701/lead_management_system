import "./globals.css";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Lead Management System",
  description: "Simple Lead Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}