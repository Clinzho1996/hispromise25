import SEOHead from "@/components/SEOhead";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Confidence Emonena & Promise Ogobi – Two hearts One Story",
	description:
		"Celebrate the love story of Confidence Emonena & Promise Ogobi. From how we met to ‘I Do’ – RSVP to our wedding, explore events, browse our gallery, and share in the joy.",
	keywords: [
		"Confidence Emonena",
		"Promise Ogobi",
		"Clinton & Promise",
		"Emonena wedding",
		"Ogobi wedding",
		"Nigerian wedding",
		"love story",
		"wedding website",
		"RSVP wedding",
		"wedding events",
		"wedding gallery",
		"two hearts one story",
		"Clinton wedding",
		"Promise wedding",
	],
	authors: [{ name: "Confidence Emonena & Promise Ogobi" }],
	openGraph: {
		type: "website",
		url: "https://promise.devclinton.org",
		title: "Confidence Emonena & Promise Ogobi – Our Wedding Journey",
		description:
			"From how we met to ‘I Do’ – join Confidence Emonena & Promise Ogobi on their wedding day. RSVP, view events, explore our gallery, and celebrate love with us.",
		images: [
			{
				url: "https://promise.devclinton.org/images/og-cover.jpg",
				width: 1200,
				height: 630,
				alt: "Confidence Emonena & Promise Ogobi Wedding Cover",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Confidence Emonena & Promise Ogobi – Our Wedding Journey",
		description:
			"Celebrate the union of Confidence Emonena & Promise Ogobi. Explore our love story, RSVP, check events, and share in the joy.",
		images: ["https://promise.devclinton.org/images/og-cover.jpg"],
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/images/logo.png",
	},
	metadataBase: new URL("https://promise.devclinton.org"),
	alternates: {
		canonical: "https://promise.devclinton.org",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<SEOHead />
			<body className={`${spaceGrotesk.variable} antialiased`}>
				{children}
				<Toaster position="top-right" richColors />
			</body>
		</html>
	);
}
