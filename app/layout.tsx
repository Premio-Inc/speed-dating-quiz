import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { lightTheme } from "@/theme";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Speed Dating for Edge Solutions",
  description: "To find out which contestant is the best match for you, simply enter your information below.",
};

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/Gotham-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Gotham-Book.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-gotham-book",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={`${myFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="shortcut icon" href="/logo-premio-icon.ico" />
        <Script
          id="hs-script-loader"
          src="//js.hs-scripts.com/2654016.js"
          strategy="afterInteractive"
        />
      </head>
      <body >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiThemeProvider theme={lightTheme}>
            {children}
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
