import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}