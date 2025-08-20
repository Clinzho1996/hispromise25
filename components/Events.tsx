"use client";

import { IconCalendarPlus, IconMap, IconShirt } from "@tabler/icons-react";
import { motion } from "framer-motion"; // Import Framer Motion
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import AddToCalendarModal from "./AddToCalendar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Animation variants with slower timing
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.5,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8, // Slower animation
			ease: "easeOut" as const, // Smooth easing, type-safe
		},
	},
};

function Events() {
	const [selectedEvent, setSelectedEvent] = useState<{
		title: string;
		date: Date;
		location: string;
		description?: string;
	} | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const events = [
		{
			title: "Traditional Ceremony",
			date: new Date("2023-10-25T10:00:00"),
			location: "Ibeshe, Ikorodu, Lagos",
			description: "Join us for our traditional wedding ceremony",
		},
		{
			title: "White Wedding",
			date: new Date("2025-12-06T10:00:00"),
			location: "Elevation Church Ogba",
			description: "Join us for our white wedding ceremony",
		},
		{
			title: "Reception",
			date: new Date("2025-12-06T14:00:00"),
			location: "Garden Terrace, Ikorodu, Lagos",
			description: "Join us for the wedding reception",
		},
	];

	const handleAddToCalendar = (event: (typeof events)[0]) => {
		setSelectedEvent(event);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedEvent(null);
	};

	const handleGetDirections = (location: string) => {
		const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
			location
		)}`;
		window.open(mapsUrl, "_blank");
	};

	return (
		<>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
				variants={containerVariants}
				className={`${spaceGrotesk.className} mt-4 border rounded-lg p-4 border-[#EDE6E2] flex flex-col gap-3`}>
				<motion.p variants={itemVariants} className="text-lg font-semibold">
					Events
				</motion.p>

				<motion.div
					variants={containerVariants}
					className="flex flex-col md:flex-row justify-between items-center gap-4">
					{events.map((event, index) => (
						<motion.div
							key={index}
							variants={itemVariants}
							className="border rounded-lg p-4 border-[#EDE6E2] w-full flex flex-col gap-2">
							<p className="text-sm font-semibold">{event.title}</p>
							<p className="text-sm text-[#A8A8A8]">
								{event.date.toLocaleDateString("en-GB", {
									day: "numeric",
									month: "long",
									year: "numeric",
								})}{" "}
								-{" "}
								{event.date.toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
							<p className="text-sm font-semibold">{event.location}</p>

							<motion.div
								variants={itemVariants}
								className="border rounded-lg p-2 border-[#EDE6E2] w-fit flex flex-row justify-start gap-2 cursor-pointer hover:bg-[#F7F3F1]"
								onClick={() => handleAddToCalendar(event)}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}>
								<IconCalendarPlus size={16} />
								<p className="text-xs font-semibold">Add to Calendar</p>
							</motion.div>

							<motion.div
								variants={itemVariants}
								className="border rounded-lg p-2 border-[#EDE6E2] w-fit flex flex-row justify-start gap-2 cursor-pointer hover:bg-[#F7F3F1]"
								onClick={() => handleGetDirections(event.location)}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}>
								<IconMap size={16} />
								<p className="text-xs font-semibold">Get Directions</p>
							</motion.div>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="flex flex-row justify-start items-center bg-[#F7E6E9] p-2 rounded-full w-fit gap-2"
					transition={{ delay: 0.5 }} // Delay for the dress code to appear last
				>
					<IconShirt size={16} color="#7D3A3F" />
					<p className="text-sm text-[#7D3A3F] font-semibold">
						Dress Code: White, Gold, and Deep Green
					</p>
				</motion.div>
			</motion.div>

			{selectedEvent && (
				<AddToCalendarModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					event={selectedEvent}
				/>
			)}
		</>
	);
}

export default Events;
