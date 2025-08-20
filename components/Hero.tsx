"use client";

import {
	IconBook,
	IconBrandAppgallery,
	IconBrandFacebook,
	IconBrandWhatsapp,
	IconCopy,
	IconGift,
	IconLink,
	IconMail,
	IconMessage,
	IconSend,
	IconShare,
} from "@tabler/icons-react";
import { motion } from "framer-motion"; // Import Framer Motion
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import SaveTheDateModal from "./SaveTheDateModal";
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
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [isInView, setIsInView] = useState(false); // Track if component is in view
	const websiteUrl = "https://hispromise25.vercel.app";

	// Set up intersection observer to detect when component is in view
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
			},
			{ threshold: 0.3 } // Trigger when 30% of component is visible
		);

		const heroElement = document.getElementById("hero");
		if (heroElement) {
			observer.observe(heroElement);
		}

		return () => {
			if (heroElement) {
				observer.unobserve(heroElement);
			}
		};
	}, []);

	const closeModal = () => {
		setIsShareModalOpen(false);
		setIsCopied(false);
	};

	const openModal = () => {
		setIsShareModalOpen(true);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(websiteUrl);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const shareViaMessage = () => {
		if (navigator.share) {
			navigator
				.share({
					title: "Clinton & Promise's Wedding",
					text: "Check out our wedding website!",
					url: websiteUrl,
				})
				.catch(console.error);
		} else {
			window.open(
				`sms:?body=Check out Clinton & Promise's wedding website: ${websiteUrl}`
			);
		}
	};

	const shareViaEmail = () => {
		window.open(
			`mailto:?subject=Clinton & Promise's Wedding&body=Check out our wedding website: ${websiteUrl}`
		);
	};

	const shareViaFacebook = () => {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
				websiteUrl
			)}`,
			"_blank"
		);
	};

	const shareViaWhatsApp = () => {
		window.open(
			`https://wa.me/?text=${encodeURIComponent(
				`Check out Clinton & Promise's wedding website: ${websiteUrl}`
			)}`,
			"_blank"
		);
	};

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
		const location = "The Elevation Church Ogba, Ikeja, Lagos, Nigeria"; // Replace with actual location

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
		<motion.div
			id="hero"
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
			className="flex flex-col sm:flex-row items-center w-full border border-[#EDE6E2] rounded-lg p-3 sm:p-6 gap-4">
			<Modal
				isOpen={isShareModalOpen}
				onClose={closeModal}
				className="w-[95%] mx-auto sm:w-[500px]">
				<div className="flex flex-col gap-3">
					<div className="flex flex-row justify-between items-center">
						<div className="flex flex-row justify-start items-center gap-2">
							<Button
								className={`${spaceGrotesk.className} border border-[#F7E6E9] bg-[#F7E6E9] text-[#7D3A3F] rounded-lg`}
								onClick={closeModal}>
								<IconShare />
							</Button>
							<p className={`${spaceGrotesk.className} text-lg font-semibold`}>
								Share Our Website
							</p>
						</div>
						<Button
							className={`${spaceGrotesk.className} border border-[#F7E6E9] bg-[#F7E6E9] text-[#7D3A3F] rounded-full`}
							onClick={copyToClipboard}>
							<IconLink /> {isCopied ? "Copied!" : "Public Link"}
						</Button>
					</div>

					<div>
						<p className={`${spaceGrotesk.className} text-sm text-[#A8A8A8]`}>
							Send the wedding website to friends and family. Copy the link via
							your favorite apps
						</p>
					</div>

					<div className="border p-3 rounded-lg border-[#EDE6E2] flex flex-row justify-between items-center">
						<p
							className={`${spaceGrotesk.className} text-sm text-[#A8A8A8] truncate`}>
							{websiteUrl}
						</p>

						<div
							onClick={copyToClipboard}
							className={`${spaceGrotesk.className} text-sm text-black flex flex-row items-center gap-1 border p-2 rounded-lg border-[#EDE6E2] cursor-pointer hover:bg-[#F7F3F1]`}>
							<IconCopy /> {isCopied ? "Copied!" : "Copy"}
						</div>
					</div>

					<div className="flex flex-row justify-between items-center w-full gap-3">
						<div
							onClick={shareViaMessage}
							className={`${spaceGrotesk.className} text-sm text-black flex flex-row items-center gap-1 border p-2 rounded-lg border-[#EDE6E2] cursor-pointer hover:bg-[#F7F3F1] w-full`}>
							<IconMessage /> Messages
						</div>
						<div
							onClick={shareViaEmail}
							className={`${spaceGrotesk.className} text-sm text-black flex flex-row items-center gap-1 border p-2 rounded-lg border-[#EDE6E9] cursor-pointer hover:bg-[#F7F3F1] w-full`}>
							<IconMail /> Email
						</div>
					</div>

					<div className="flex flex-row justify-between items-center w-full gap-3">
						<div
							onClick={shareViaFacebook}
							className={`${spaceGrotesk.className} text-sm text-black flex flex-row items-center gap-1 border p-2 rounded-lg border-[#EDE6E2] cursor-pointer hover:bg-[#F7F3F1] w-full`}>
							<IconBrandFacebook /> Facebook
						</div>
						<div
							onClick={shareViaWhatsApp}
							className={`${spaceGrotesk.className} text-sm text-black flex flex-row items-center gap-1 border p-2 rounded-lg border-[#EDE6E2] cursor-pointer hover:bg-[#F7F3F1] w-full`}>
							<IconBrandWhatsapp /> WhatsApp
						</div>
					</div>

					<div className="flex flex-col gap-2 border p-3 rounded-lg border-[#EDE6E2]">
						<p className={`${spaceGrotesk.className} text-sm text-black`}>
							Link Preview
						</p>

						<div className="flex flex-row justify-start items-center w-full gap-3">
							<div>
								<Image
									src="/images/kiss.png"
									alt="Link Preview"
									width={100}
									height={100}
									className="rounded-lg"
								/>
							</div>
							<div>
								<p
									className={`${spaceGrotesk.className} text-[15px] sm:text-lg text-black font-semibold`}>
									Clinton & Promise - Wedding Website
								</p>
								<p
									className={`${spaceGrotesk.className} text-sm text-[#A8A8A8]`}>
									All the details about Clinton & Promise&apos;s wedding in one
									place.
								</p>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<Button
							onClick={() => {
								if (navigator.share) {
									navigator
										.share({
											title: "Clinton & Promise's Wedding",
											text: "Check out our wedding website!",
											url: websiteUrl,
										})
										.catch(console.error);
								} else {
									copyToClipboard();
								}
							}}
							className={`${spaceGrotesk.className} bg-[#D69A0F] text-white font-semibold`}>
							<IconSend /> Share Now
						</Button>
					</div>
				</div>
			</Modal>
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
						className={`${spaceGrotesk.className} text-sm text-gray-500 text-center border p-2 sm:p-4 rounded-lg border-[#EDE6E2] w-full`}>
						<p className="text-lg text-black font-bold">{timeLeft.days}</p>
						<p className="font-normal text-xs">Days</p>
					</div>
					<div
						className={`${spaceGrotesk.className} text-sm text-gray-500 text-center border p-2 sm:p-4 rounded-lg border-[#EDE6E2] w-full`}>
						<p className="text-lg text-black font-bold">{timeLeft.hours}</p>
						<p className="font-normal text-xs">Hours</p>
					</div>
					<div
						className={`${spaceGrotesk.className} text-sm text-gray-500 text-center border p-2 sm:p-4 rounded-lg border-[#EDE6E2] w-full`}>
						<p className="text-lg text-black font-bold">{timeLeft.minutes}</p>
						<p className="font-normal text-xs">Minutes</p>
					</div>
					<div
						className={`${spaceGrotesk.className} text-sm text-gray-500 text-center border p-2 sm:p-4 rounded-lg border-[#EDE6E2] w-full`}>
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

					<Button
						onClick={openModal}
						className={`${spaceGrotesk.className} bg-[#D69A0F] text-white font-semibold`}>
						<IconShare /> Share
					</Button>
				</div>

				<div className="flex flex-row flex-wrap justify-start items-center gap-3 w-full mt-4">
					<Link
						href="/our-story"
						className={`${spaceGrotesk.className} flex flex-row justify-start items-center rounded-lg gap-3 border p-4   border-[#E2E4E9] bg-white text-dark-3 hover:bg-[#F7F3F1]`}>
						<IconBook /> Our Story
					</Link>

					<Link
						href="/gift-registry"
						className={`${spaceGrotesk.className} flex flex-row justify-start items-center rounded-lg gap-3 border p-4   border-[#E2E4E9] bg-white text-dark-3 hover:bg-[#F7F3F1]`}>
						<IconGift /> Gift Us
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
		</motion.div>
	);
}

export default Hero;
