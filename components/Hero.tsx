"use client";

import {
	IconBook,
	IconBrandAppgallery,
	IconCalendar,
	IconSend,
} from "@tabler/icons-react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SaveTheDateModal from "./SaveTheDateModal"; // Import your modal component
import { Button } from "./ui/button";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

function Hero() {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Target date: December 6, 2025 at 9:00 AM
	const targetDate = new Date("December 6, 2025 09:00:00").getTime();

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date().getTime();
			const distance = targetDate - now;

			if (distance < 0) {
				clearInterval(timer);
				return;
			}

			setTimeLeft({
				days: Math.floor(distance / (1000 * 60 * 60 * 24)),
				hours: Math.floor(
					(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				),
				minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((distance % (1000 * 60)) / 1000),
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate]);

	const handleSaveTheDate = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleAddToCalendar = (calendarType: "google" | "apple") => {
		// Format the date for the calendar
		const startDate = new Date(targetDate);
		const endDate = new Date(targetDate);
		endDate.setHours(endDate.getHours() + 1); // 1 hour duration

		const formattedStartDate = startDate
			.toISOString()
			.replace(/-|:|\.\d+/g, "");
		const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, "");

		const title = "Clinton & Promise's Wedding";
		const description = "Join us as we celebrate our wedding!";
		const location = "Wedding Venue"; // Replace with actual location

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
			link.setAttribute("download", "wedding-event.ics");
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}

		handleCloseModal();
	};

	return (
		<div className="flex flex-col sm:flex-row items-center w-full border border-[#EDE6E2] rounded-lg p-6 gap-4">
			<Image
				src="/images/cp.png"
				alt="Hero Image"
				width={500}
				height={300}
				className="object-cover w-full rounded-lg"
			/>
			<div className="flex flex-col w-full border p-4 rounded-lg gap-2 border-[#EDE6E2] h-full">
				<h2
					className={`${spaceGrotesk.className} text-2xl sm:text-4xl font-bold font-space-grotesk`}>
					Clinton & Promise - Two hearts, One story
				</h2>
				<p className={`${spaceGrotesk.className} text-sm text-gray-500`}>
					We can&apos;t wait to celebrate with you!
				</p>

				<div className="flex flex-row justify-between items-center gap-3 mt-4">
					<div
						className={`${spaceGrotesk.className} text-sm text-gray-500 text-center border p-4 rounded-lg border-[#EDE6E2] w-full`}>
						<p className="text-lg text-black font-bold">{timeLeft.days}</p>
						<p className="font-normal text-xs">Days</p>
					</div>
					<div
						className={`${spaceGrotesk.className} text-sm text-gray-500 text-center border p-4 rounded-lg border-[#EDE6E2] w-full`}>
						<p className="text-lg text-black font-bold">{timeLeft.hours}</p>
						<p className="font-normal text-xs">Hours</p>
					</div>
					<div
						className={`${spaceGrotesk.className} text-sm text-gray-500 text-center border p-4 rounded-lg border-[#EDE6E2] w-full`}>
						<p className="text-lg text-black font-bold">{timeLeft.minutes}</p>
						<p className="font-normal text-xs">Minutes</p>
					</div>
					<div
						className={`${spaceGrotesk.className} text-sm text-gray-500 text-center border p-4 rounded-lg border-[#EDE6E2] w-full`}>
						<p className="text-lg text-black font-bold">{timeLeft.seconds}</p>
						<p className="font-normal text-xs">Seconds</p>
					</div>
				</div>

				<div className="flex flex-row justify-start items-center gap-3 mt-4">
					<Button
						onClick={handleSaveTheDate}
						className={`${spaceGrotesk.className} border border-[#F7E6E9] bg-[#F7E6E9] text-[#7D3A3F] hover:bg-[#F7F3F1]`}>
						Save the Date
					</Button>

					<Link href="/rsvp">
						<Button
							className={`${spaceGrotesk.className} bg-[#D69A0F] text-white font-semibold`}>
							RSVP Now
						</Button>
					</Link>
				</div>

				<div className="flex flex-row flex-wrap justify-start items-center gap-3 w-full mt-4">
					<Link
						href="/our-story"
						className={`${spaceGrotesk.className} flex flex-row justify-start items-center rounded-lg gap-3 border p-4   border-[#E2E4E9] bg-white text-dark-3 hover:bg-[#F7F3F1]`}>
						<IconBook /> Our Story
					</Link>

					<Link
						href="/events"
						className={`${spaceGrotesk.className} flex flex-row justify-start items-center rounded-lg gap-3 border p-4   border-[#E2E4E9] bg-white text-dark-3 hover:bg-[#F7F3F1]`}>
						<IconCalendar /> Events
					</Link>

					<Link
						href="/rsvp"
						className={`${spaceGrotesk.className} flex flex-row justify-start items-center rounded-lg gap-3 border p-4   border-[#E2E4E9] bg-white text-dark-3 hover:bg-[#F7F3F1]`}>
						<IconSend /> RSVP
					</Link>

					<Link
						href="/gallery"
						className={`${spaceGrotesk.className} flex flex-row justify-start items-center rounded-lg gap-3 border p-4   border-[#E2E4E9] bg-white text-dark-3 hover:bg-[#F7F3F1]`}>
						<IconBrandAppgallery /> Gallery
					</Link>
				</div>
			</div>

			<SaveTheDateModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onAddToGoogleCalendar={() => handleAddToCalendar("google")}
				onAddToAppleCalendar={() => handleAddToCalendar("apple")}
			/>
		</div>
	);
}

export default Hero;
