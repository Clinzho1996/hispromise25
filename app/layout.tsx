import SEOHead from "@/components/SEOhead";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

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
