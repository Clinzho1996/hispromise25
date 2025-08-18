import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Clinton & Promise – Two hearts, one story.",
	description:
		"From how we met to ‘I Do’ – Confidence Emonena & Promise Ogobi wedding website. RSVP, explore events, view our gallery, and share in the joy.",
	icons: {
		icon: "/favicon.ico",
		apple: "/images/logo.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${spaceGrotesk.variable} antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
