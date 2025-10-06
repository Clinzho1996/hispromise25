import SEOHead from "@/components/SEOhead";

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<SEOHead />
			<body>{children}</body>
		</html>
	);
}

export default RootLayout;
