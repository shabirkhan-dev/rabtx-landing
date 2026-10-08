import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const TITLE = "RabtX — AI-native products, built full-stack";
const DESCRIPTION =
	"RabtX is a product studio in Islamabad. We build our own AI-native products and run them, from the interface to the model calls.";

export const metadata: Metadata = {
	metadataBase: new URL("https://rabtx.dev"),
	title: TITLE,
	description: DESCRIPTION,
	openGraph: { title: TITLE, description: DESCRIPTION, url: "/", siteName: "RabtX", type: "website" },
	twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#efefef" },
		{ media: "(prefers-color-scheme: dark)", color: "#111111" },
	],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${inter.variable} ${geistMono.variable} antialiased`}>
			<body className="min-h-dvh font-sans">{children}</body>
		</html>
	);
}
