"use client";

import { IconCalendarPlus, IconMap } from "@tabler/icons-react";
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import AddToCalendarModal from "./AddToCalendar";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

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
			<div
				className={`${spaceGrotesk.className} mt-4 border rounded-lg p-4 border-[#EDE6E2] flex flex-col gap-3`}>
				<p className="text-lg font-semibold">Events</p>

				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					{events.map((event, index) => (
						<div
							key={index}
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

							<div
								className="border rounded-lg p-2 border-[#EDE6E2] w-fit flex flex-row justify-start gap-2 cursor-pointer hover:bg-[#F7F3F1]"
								onClick={() => handleAddToCalendar(event)}>
								<IconCalendarPlus size={16} />
								<p className="text-xs font-semibold">Add to Calendar</p>
							</div>

							<div
								className="border rounded-lg p-2 border-[#EDE6E2] w-fit flex flex-row justify-start gap-2 cursor-pointer hover:bg-[#F7F3F1]"
								onClick={() => handleGetDirections(event.location)}>
								<IconMap size={16} />
								<p className="text-xs font-semibold">Get Directions</p>
							</div>
						</div>
					))}
				</div>
			</div>

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
