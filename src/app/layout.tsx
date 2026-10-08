import type { Metadata } from "next";
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

export const metadata: Metadata = {
	title: "RabtX — AI-native products, built full-stack",
	description:
		"RabtX is a product studio in Islamabad. We build our own AI-native products and run them, from the interface to the model calls.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${inter.variable} ${geistMono.variable} antialiased`}>
			<body className="min-h-dvh font-sans">{children}</body>
		</html>
	);
}
