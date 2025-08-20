"use client";

import {
	IconCalendarPlus,
	IconCopy,
	IconPlayerPlay,
} from "@tabler/icons-react";
import { motion, Variants } from "framer-motion"; // Import Framer Motion
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import { Button } from "./ui/button";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Animation variants with proper typing
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2, // Stagger animation for children
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8, // Slower animation
			ease: "easeOut", // Smooth easing
		},
	},
};

function Livestream() {
	const [isCopied, setIsCopied] = useState(false);
	const [hasJoined, setHasJoined] = useState(false);

	// Sample livestream details - replace with your actual stream information
	const livestreamInfo = {
		title: "Clinton & Promise's Wedding Ceremony",
		date: "December 6, 2025",
		time: "10:00 AM WAT",
		description:
			"Join us virtually as we celebrate our special day. The livestream will begin 15 minutes before the ceremony.",
		streamUrl: "https://youtube.com/live/example-stream-id", // Replace with actual stream URL
		joinUrl: "https://meet.example.com/wedding-clinton-promise", // Replace with actual join URL
	};

	const handleCopyLink = () => {
		navigator.clipboard.writeText(livestreamInfo.joinUrl);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const handleAddToCalendar = () => {
		// Create calendar event for the livestream
		const startDate = new Date("2025-12-06T10:00:00");
		const endDate = new Date("2025-12-06T12:00:00");

		const formattedStartDate = startDate
			.toISOString()
			.replace(/-|:|\.\d+/g, "");
		const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, "");

		const title = "Clinton & Promise's Wedding Livestream";
		const description = `Join the livestream: ${livestreamInfo.joinUrl}`;
		const location = "Online";

		// Google Calendar URL
		const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
			title
		)}&dates=${formattedStartDate}/${formattedEndDate}&details=${encodeURIComponent(
			description
		)}&location=${encodeURIComponent(location)}`;

		window.open(googleUrl, "_blank");
	};

	const handleJoinStream = () => {
		setHasJoined(true);
		window.open(livestreamInfo.joinUrl, "_blank");
	};

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "0px 0px -10% 0px" }}
			variants={containerVariants}
			className={`${spaceGrotesk.className} mt-4 border rounded-lg p-4 border-[#EDE6E2] flex flex-col gap-4 w-full max-w-[100vw]`}>
			<motion.h2 variants={itemVariants} className="text-lg font-semibold">
				Wedding Livestream
			</motion.h2>

			<motion.div
				variants={containerVariants}
				className="flex flex-col lg:flex-row gap-6">
				{/* Video Player/Placeholder */}
				<motion.div variants={itemVariants} className="lg:w-2/3 ">
					<div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center relative w-full  h-full">
						{hasJoined ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
								className="text-center p-4">
								<div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
									<IconPlayerPlay className="text-white" size={32} />
								</div>
								<p className="font-semibold">
									You&apos;ve joined the livestream!
								</p>
								<p className="text-sm text-gray-600 mt-2">
									The stream will open in a new tab. If it didn&apos;t open
									automatically,
									<a
										href={livestreamInfo.joinUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-500 ml-1">
										click here to join
									</a>
									.
								</p>
							</motion.div>
						) : (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.7 }}
								className="flex flex-col items-center justify-center p-6 h-full w-full">
								<motion.div
									initial={{ scale: 0.8 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.3, duration: 0.5 }}
									className="w-14 h-14 sm:w-24 sm:h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
									<IconPlayerPlay className="text-gray-600 text-lg sm:text-3xl" />
								</motion.div>
								<p className="font-semibold text-center">
									Livestream will begin soon
								</p>
								<p className="text-sm text-gray-600 mt-2 text-center">
									The stream will be available on {livestreamInfo.date} at{" "}
									{livestreamInfo.time}
								</p>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									<Button
										onClick={handleJoinStream}
										className="mt-4 bg-[#D69A0F] hover:bg-[#bc390d] text-white">
										Join Stream
									</Button>
								</motion.div>
							</motion.div>
						)}
					</div>
				</motion.div>

				{/* Stream Information */}
				<motion.div
					variants={containerVariants}
					className="lg:w-1/3 flex flex-col gap-4">
					<motion.div
						variants={itemVariants}
						className="bg-[#F7F3F1] p-4 rounded-lg">
						<h3 className="font-semibold mb-2">{livestreamInfo.title}</h3>
						<p className="text-sm text-gray-600">
							{livestreamInfo.description}
						</p>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="border border-[#EDE6E2] p-4 rounded-lg">
						<h4 className="font-semibold mb-2">Stream Details</h4>
						<p className="text-sm">
							<span className="font-medium">Date:</span> {livestreamInfo.date}
						</p>
						<p className="text-sm">
							<span className="font-medium">Time:</span> {livestreamInfo.time}
						</p>
						<p className="text-sm mt-2">
							<span className="font-medium">Link:</span>
							<span className="truncate block text-blue-500">
								{livestreamInfo.joinUrl}
							</span>
						</p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						className="flex flex-col gap-2">
						<motion.div
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							<Button
								onClick={handleJoinStream}
								className="w-full bg-[#D69A0F] hover:bg-[#bc390d] text-white">
								<IconPlayerPlay size={18} className="mr-2" />
								Join Livestream
							</Button>
						</motion.div>

						<motion.div
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							<Button
								onClick={handleCopyLink}
								variant="outline"
								className="w-full border-[#EDE6E2] hover:bg-[#F7F3F1]">
								<IconCopy size={18} className="mr-2" />
								{isCopied ? "Copied!" : "Copy Stream Link"}
							</Button>
						</motion.div>

						<motion.div
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							<Button
								onClick={handleAddToCalendar}
								variant="outline"
								className="w-full border-[#EDE6E2] hover:bg-[#F7F3F1]">
								<IconCalendarPlus size={18} className="mr-2" />
								Add to Calendar
							</Button>
						</motion.div>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
						<h4 className="font-semibold text-yellow-800 text-sm mb-1">
							Important Notes
						</h4>
						<ul className="text-xs text-yellow-700 list-disc pl-4 space-y-1">
							<li>Please join 10-15 minutes early to test your connection</li>
							<li>Ensure your device volume is turned up</li>
							<li>Use headphones for better audio quality</li>
							<li>Please keep your microphone muted during the ceremony</li>
						</ul>
					</motion.div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}

export default Livestream;
