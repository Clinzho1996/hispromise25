"use client";

import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { IconBrandAppgallery } from "@tabler/icons-react";
import { motion, Variants } from "framer-motion";
import { Play, X } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Animation variants with proper typing
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut",
		},
	},
};

function OurStory() {
	const [isVowsModalOpen, setIsVowsModalOpen] = useState(false);
	const [isMeetModalOpen, setIsMeetModalOpen] = useState(false);

	// Sample highlight images
	const highlightImages = [
		{
			id: 1,
			src: "/images/mb.png",
			alt: "First date",
			caption: "Our first date",
		},
		{
			id: 2,
			src: "/images/mb2.png",
			alt: "Proposal moment",
			caption: "The proposal",
		},
		{
			id: 3,
			src: "/images/mb4.png",
			alt: "Christmas together",
			caption: "First Christmas",
		},
		{
			id: 4,
			src: "/images/mb6.png",
			alt: "Beach Vacation",
			caption: "Beach Vacation",
		},
	];

	// YouTube video ID (replace with your actual video ID)
	const youtubeVideoId = "LAOphOVycMI"; // Example video ID

	return (
		<div>
			<Header />

			<div
				className={`${spaceGrotesk.className} p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4`}>
				<BreadCrumb
					img="/images/gallery.png"
					title="Our Story"
					description="A beautiful journey of love and commitment."
				/>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "0px 0px -10% 0px" }}
					variants={containerVariants}
					className="mt-8">
					{/* Two Column Section - Timeline & Moments */}
					<motion.div
						variants={containerVariants}
						className="flex flex-col lg:flex-row gap-8 mb-8">
						{/* Left Column - Timeline */}
						<motion.div
							variants={itemVariants}
							className="flex-1 border p-4 rounded-lg border-[#EDE6E2]">
							<h2 className="text-2xl font-bold text-[#7D3A3F] mb-6">
								Our Timeline
							</h2>

							<div className="space-y-4">
								<motion.div
									variants={itemVariants}
									className="border rounded-lg p-4 border-[#EDE6E2]">
									<span className="text-[#DE8F8F] font-bold pr-2">
										March 2025 - First Hello
									</span>{" "}
									A chance meeting blossomed into a beautiful relationship.
								</motion.div>

								<motion.div
									variants={itemVariants}
									className="border rounded-lg p-4 border-[#EDE6E2]">
									<span className="text-[#DE8F8F] font-bold pr-2">
										April - June 2025
									</span>{" "}
									From road trips to late-night talks, every moment deepened our
									bond.
								</motion.div>

								<motion.div
									variants={itemVariants}
									className="border rounded-lg p-4 border-[#EDE6E2]">
									<span className="text-[#DE8F8F] font-bold pr-2">
										July 2025 - The Proposal
									</span>{" "}
									Under the stars, one question, a ring, and a promise for
									eternity.
								</motion.div>
							</div>
						</motion.div>

						{/* Right Column - Moments */}
						<motion.div
							variants={itemVariants}
							className="flex-1 border p-4 rounded-lg border-[#EDE6E2]">
							<h2 className="text-2xl font-bold text-[#7D3A3F] mb-6">
								Special Moments
							</h2>

							<div className="grid grid-cols-2 gap-4 mb-4">
								{highlightImages.map((image) => (
									<motion.div
										key={image.id}
										variants={itemVariants}
										className="group relative overflow-hidden rounded-lg cursor-pointer">
										<Image
											src={image.src}
											alt={image.alt}
											width={300}
											height={200}
											className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										<div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
											<p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
												{image.caption}
											</p>
										</div>
									</motion.div>
								))}
							</div>

							<Link href="/gallery">
								<Button
									variant="outline"
									className="w-full border-[#EDE6E2] hover:bg-[#F7F3F1]">
									<IconBrandAppgallery className="mr-2" />
									View More Memories
								</Button>
							</Link>
						</motion.div>
					</motion.div>

					{/* Meet the Couple Section */}
					<motion.div
						variants={itemVariants}
						className="border rounded-lg p-6 border-[#EDE6E2] mb-8">
						<h2 className="text-2xl font-bold text-[#7D3A3F] mb-6 text-center">
							Meet the Couple
						</h2>

						<div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6">
							<motion.div
								variants={itemVariants}
								className="flex flex-row justify-start items-center w-full gap-3 border rounded-lg p-3 border-[#EDE6E2]">
								<div className="w-[25%] sm:w-[20%]">
									<Image
										src="/images/dc.png"
										alt="Dev Clinton"
										width={100}
										height={100}
										className="rounded-lg"
									/>
								</div>
								<div className="w-[75%] sm:w-[80%]">
									<p className="text-lg text-black font-semibold">
										Dev Clinton
									</p>
									<p className="text-sm text-[#A8A8A8]">
										Loves music, tech guru, and a gamer.
									</p>
								</div>
							</motion.div>

							<motion.div
								variants={itemVariants}
								className="flex flex-row justify-start items-center w-full gap-3 border rounded-lg p-3 border-[#EDE6E2]">
								<div className="w-[25%] sm:w-[20%]">
									<Image
										src="/images/pr.png"
										alt="Promise"
										width={100}
										height={100}
										className="rounded-lg"
									/>
								</div>
								<div className="w-[75%] sm:w-[80%]">
									<p className="text-lg text-black font-semibold">Promise</p>
									<p className="text-sm text-[#A8A8A8]">
										A heart for art, marketing guru, and a poet.
									</p>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Additional Sections */}
					<motion.div
						variants={containerVariants}
						className="flex flex-col md:flex-row gap-6 mb-8">
						{/* Read Our Vows */}
						<motion.div
							variants={itemVariants}
							className="flex-1 border border-[#EDE6E2] rounded-lg p-6 text-center">
							<h3 className="text-xl font-bold text-[#7D3A3F] mb-4">
								Read Our Vows
							</h3>
							<p className="text-gray-600 mb-4">
								The promises we made to each other on our special day.
							</p>
							<Button
								onClick={() => setIsVowsModalOpen(true)}
								className="bg-[#4d080d] hover:bg-[#bc390d] text-white">
								Read Vows
							</Button>
						</motion.div>

						{/* How We Met */}
						<motion.div
							variants={itemVariants}
							className="flex-1 border border-[#EDE6E2] rounded-lg p-6 text-center">
							<h3 className="text-xl font-bold text-[#7D3A3F] mb-4">
								How We Met
							</h3>
							<p className="text-gray-600 mb-4">
								Watch our story of how we first met and fell in love.
							</p>
							<Button
								onClick={() => setIsMeetModalOpen(true)}
								className="bg-[#4d080d] hover:bg-[#bc390d] text-white">
								<Play size={18} className="mr-2" />
								Watch Video
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>

			{/* Vows Modal */}
			<Dialog open={isVowsModalOpen} onOpenChange={setIsVowsModalOpen}>
				<DialogContent className="w-[96%] mx-auto sm:max-w-2xl bg-white max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Our Vows</DialogTitle>
						<DialogDescription>
							The promises we made to each other
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-6 mt-4">
						<div>
							<h4 className="font-semibold text-lg text-[#7D3A3F] mb-2">
								Clinton&apos;s Vow
							</h4>
							<p className="text-gray-700">
								&quot;Promise, from the moment I met you, I knew my life would
								never be the same. I vow to love you unconditionally, to support
								your dreams, and to be your partner in every adventure life
								brings us. I promise to make you laugh every day, to be your
								shelter in storms, and to cherish every moment we share
								together.&quot;
							</p>
						</div>

						<div>
							<h4 className="font-semibold text-lg text-[#7D3A3F] mb-2">
								Promise&apos;s Vow
							</h4>
							<p className="text-gray-700">
								&quot;Clinton, you are my best friend and my greatest love. I
								vow to stand by your side through all of life&apos;s challenges
								and celebrations. I promise to nurture our love, to always be
								honest with you, and to create a home filled with laughter,
								warmth, and understanding. I will love you faithfully for all
								the days of my life.&quot;
							</p>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* How We Met Modal */}
			<Dialog open={isMeetModalOpen} onOpenChange={setIsMeetModalOpen}>
				<DialogContent className="w-[96%] sm:max-w-4xl bg-white p-0 overflow-hidden mx-auto">
					<div className="relative">
						{/* Close button */}
						<button
							onClick={() => setIsMeetModalOpen(false)}
							className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 transition-colors">
							<X size={20} />
						</button>

						{/* YouTube Embed */}
						<div className="aspect-video w-full">
							<iframe
								width="100%"
								height="100%"
								src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1`}
								title="How We Met - Our Love Story"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="w-full h-full"></iframe>
						</div>

						{/* Video Info */}
						<div className="p-4">
							<DialogHeader>
								<DialogTitle>How We Met</DialogTitle>
								<DialogDescription>
									Our love story - from first meeting to forever
								</DialogDescription>
							</DialogHeader>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default OurStory;
