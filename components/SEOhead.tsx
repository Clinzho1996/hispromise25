import Head from "next/head";

export default function SEOHead() {
	return (
		<Head>
			{/* Primary Meta Tags */}
			<title>Confidence Emonena & Promise Ogobi – Our Wedding Journey</title>
			<meta
				name="title"
				content="Confidence Emonena & Promise Ogobi – Our Wedding Journey"
			/>
			<meta
				name="description"
				content="Celebrate the union of Confidence Emonena & Promise Ogobi. Explore our love story, wedding events, RSVP, browse our gallery, and join us in this joyful celebration."
			/>
			<meta name="author" content="Confidence Emonena & Promise Ogobi" />
			<meta
				name="keywords"
				content="Confidence Emonena, Promise Ogobi, wedding, Nigerian wedding, Clinton & Promise, love story, RSVP, wedding website, gallery, events"
			/>

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta
				property="og:title"
				content="Confidence Emonena & Promise Ogobi – Our Wedding Journey"
			/>
			<meta
				property="og:description"
				content="From how we met to ‘I Do’ – join Confidence Emonena & Promise Ogobi on their wedding day. RSVP, explore events, and share in the joy."
			/>
			<meta property="og:url" content="https://promise.devclinton.org" />
			<meta
				property="og:image"
				content="https://promise.devclinton.org/images/og-cover.jpg"
			/>

			{/* Twitter */}
			<meta property="twitter:card" content="summary_large_image" />
			<meta
				property="twitter:title"
				content="Confidence Emonena & Promise Ogobi – Our Wedding Journey"
			/>
			<meta
				property="twitter:description"
				content="Celebrate the union of Confidence Emonena & Promise Ogobi. Explore our story, RSVP, and share in the joy."
			/>
			<meta
				property="twitter:image"
				content="https://promise.devclinton.org/images/og-cover.jpg"
			/>

			{/* Favicon */}
			<link rel="icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" href="/images/logo.png" />

			{/* Canonical */}
			<link rel="canonical" href="https://promise.devclinton.org" />

			{/* Extra for SEO */}
			<meta name="robots" content="index, follow" />
			<meta name="theme-color" content="#ffffff" />
		</Head>
	);
}
