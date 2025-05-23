import "./globals.scss";
import type { Metadata } from "next";
import { Sofia_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import Nav from "@/components/MainNav";
import Footer from "@/components/Footer";

const font = FontSans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "900"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Pragmatic Digital",
    description:
        "A starter template for Next.js with WordPress as a headless CMS.",
    metadataBase: new URL(siteConfig.site_domain),
    alternates: {
        canonical: "/",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className={cn("min-h-screen font-sans antialiased", font.variable)} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Nav />
                    {children}
                    <Footer />
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}