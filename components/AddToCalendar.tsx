"use client";

import { X } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Modal from "./Modal";
import { Button } from "./ui/button";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface AddToCalendarModalProps {
	isOpen: boolean;
	onClose: () => void;
	event: {
		title: string;
		date: Date;
		location: string;
		description?: string;
	};
}

function AddToCalendarModal({
	isOpen,
	onClose,
	event,
}: AddToCalendarModalProps) {
	const handleAddToCalendar = (calendarType: "google" | "apple") => {
		// Format the date for the calendar
		const startDate = new Date(event.date);
		const endDate = new Date(event.date);
		endDate.setHours(endDate.getHours() + 2); // 2 hour duration

		const formattedStartDate = startDate
			.toISOString()
			.replace(/-|:|\.\d+/g, "");
		const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, "");

		const title = event.title;
		const description = event.description || "Join us as we celebrate!";
		const location = event.location;

		if (calendarType === "google") {
			// Google Calendar URL
			const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
				title
			)}&dates=${formattedStartDate}/${formattedEndDate}&details=${encodeURIComponent(
				description
			)}&location=${encodeURIComponent(location)}`;
			window.open(googleUrl, "_blank");
		} else {
			// Apple Calendar ICS file
			const icsContent = [
				"BEGIN:VCALENDAR",
				"VERSION:2.0",
				"BEGIN:VEVENT",
				`DTSTART:${formattedStartDate}`,
				`DTEND:${formattedEndDate}`,
				`SUMMARY:${title}`,
				`DESCRIPTION:${description}`,
				`LOCATION:${location}`,
				"END:VEVENT",
				"END:VCALENDAR",
			].join("\n");

			const blob = new Blob([icsContent], { type: "text/calendar" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute(
				"download",
				`${title.toLowerCase().replace(/\s+/g, "-")}.ics`
			);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}

		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="w-[95%] mx-auto sm:w-[400px]">
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-bold text-[#7D3A3F]">Save the Date</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700">
						<X size={20} />
					</button>
				</div>
				<h2
					className={`${spaceGrotesk.className} text-gray-700 mb-2 text-xl font-semibold`}>
					Add Clinton & Promise {event.title} to Calendar
				</h2>

				<div className="flex flex-col gap-2">
					<p
						className={`${spaceGrotesk.className} text-gray-700 mb-1 font-medium`}>
						<span className="font-semibold">When:</span>{" "}
						{event.date.toLocaleDateString()} at{" "}
						{event.date.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
					<p
						className={`${spaceGrotesk.className} text-gray-700 mb-1 font-medium`}>
						<span className="font-semibold">Where:</span> {event.location}
					</p>
				</div>

				<div className="flex flex-col gap-3 mt-4">
					<Button
						onClick={() => handleAddToCalendar("google")}
						className={`${spaceGrotesk.className} flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor">
							<path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.671-0.068-1.325-0.182-1.977h-9.818z" />
						</svg>
						Add to Google Calendar
					</Button>

					<Button
						onClick={() => handleAddToCalendar("apple")}
						className={`${spaceGrotesk.className} w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2`}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor">
							<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
						</svg>
						Add to Apple Calendar
					</Button>
				</div>

				<div className="mt-4 text-center">
					<button
						onClick={onClose}
						className="text-sm text-gray-500 hover:text-gray-700 underline">
						Maybe later
					</button>
				</div>
			</div>
		</Modal>
	);
}

export default AddToCalendarModal;
