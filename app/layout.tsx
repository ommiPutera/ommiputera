import type { Metadata } from "next";

// import { ThemeProvider } from "~/components/theme-provider";
// import { BackgroundBeams } from "~/components/ui/background-beams";

// import NextTopLoader from "nextjs-toploader";

import "./globals.css";

export const metadata: Metadata = {
  title: "Ommi Putera",
  description: "Ommi Personal Website",
};

export default function RootLayout({
  // children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <h1>Under Construction</h1>
        {/* <NextTopLoader color="#1878f24d" height={2} showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <BackgroundBeams className="fixed top-0 left-0 h-full w-full -z-10" /> */}
      </body>
    </html>
  );
}
