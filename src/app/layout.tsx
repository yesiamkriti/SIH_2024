import type { Metadata } from "next";
import "./globals.css";
import { ProfileProvider } from "./profileContext";



export const metadata: Metadata = {
  title: "AyuRaksha",
  description: "Record Your Health Life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProfileProvider>
          {children}
        </ProfileProvider>
        </body>
    </html>
  );
}
