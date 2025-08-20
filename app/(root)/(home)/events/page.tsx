"use client";

import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
	IconArrowRight,
	IconCalendar,
	IconCalendarEvent,
	IconCamera,
	IconClock,
	IconDoorEnter,
	IconGift,
	IconGlassChampagne,
	IconMapPin,
	IconMusic,
	IconPalette,
	IconShirt,
	IconVideo,
} from "@tabler/icons-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// Animation variants with proper typing
const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: "easeOut",
		},
	},
};

function Events() {
	// Event details
	const ceremony = {
		title: "Wedding Ceremony",
		date: "December 6, 2025",
		time: "10:00 AM",
		location: "The Elevation Church Ogba, Ikeja, Lagos",
		dressCode: "White, Gold, and Deep Green",
		description:
			"Join us as we exchange vows and begin our journey together as husband and wife.",
		mapUrl:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.044835212999!2d3.348314275696894!3d6.516865223922026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8f7b6f7b6f7b%3A0x7b6f7b6f7b6f7b6f!2sThe%20Elevation%20Church%20Ogba!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng",
		directionsUrl:
			"https://www.google.com/maps/dir/?api=1&destination=The+Elevation+Church+Ogba,+Ikeja,+Lagos",
	};

	const reception = {
		title: "Wedding Reception",
		date: "December 6, 2025",
		time: "2:00 PM",
		location: "Garden Terrace, Ikorodu, Lagos",
		dinnerDance: "Formal Dinner & Dance",
		description:
			"Celebrate with us over delicious food, music, and dancing as we begin our new life together.",
		mapUrl:
			"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.044835212999!2d3.348314275696894!3d6.516865223922026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8f7b6f7b6f7b%3A0x7b6f7b6f7b6f7b6f!2sGarden+Terrace+Ikorodu!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng",
		directionsUrl:
			"https://www.google.com/maps/dir/?api=1&destination=Garden+Terrace+Ikorodu,+Lagos",
	};

	// Timeline items
	const timeline = [
		{
			event: "Guest Arrival",
			time: "9:30 AM",
			icon: <IconDoorEnter size={20} />,
		},
		{
			event: "Ceremony Begins",
			time: "10:00 AM",
			icon: <IconCalendarEvent size={20} />,
		},
		{
			event: "Photo Session",
			time: "12:30 PM",
			icon: <IconCamera size={20} />,
		},
		{
			event: "Reception Doors Open",
			time: "1:30 PM",
			icon: <IconDoorEnter size={20} />,
		},
		{
			event: "Lunch is Served",
			time: "2:30 PM",
			icon: <IconPalette size={20} />,
		},
		{
			event: "First Dance & Toasts",
			time: "4:00 PM",
			icon: <IconGlassChampagne size={20} />,
		},
	];

	// Function to handle adding events to calendar
	const handleAddToCalendar = (event: typeof ceremony | typeof reception) => {
		const startDate = new Date("2025-12-06T10:00:00");
		const endDate = new Date("2025-12-06T12:00:00");

		const formattedStartDate = startDate
			.toISOString()
			.replace(/-|:|\.\d+/g, "");
		const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, "");

		const title = event.title;
		const description = event.description;
		const location = event.location;

		// Google Calendar URL
		const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
			title
		)}&dates=${formattedStartDate}/${formattedEndDate}&details=${encodeURIComponent(
			description
		)}&location=${encodeURIComponent(location)}`;

		window.open(googleUrl, "_blank");
	};

	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/events.png"
					title="Wedding Events"
					description="Join us for a day filled with love and celebration."
				/>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "0px 0px -10% 0px" }}
					variants={containerVariants}
					className="mt-8">
					{/* Ceremony and Reception Cards */}
					<motion.div
						variants={containerVariants}
						className="flex flex-col lg:flex-row gap-6 mb-8">
						{/* Ceremony Card */}
						<motion.div
							variants={itemVariants}
							className="flex-1 border border-[#EDE6E2] rounded-lg p-6">
							<h2 className="text-2xl font-bold text-[#7D3A3F] mb-4">
								{ceremony.title}
							</h2>
							<p className="text-gray-600 mb-6">{ceremony.description}</p>

							<div className="space-y-4 mb-6">
								<div className="flex items-center gap-3 p-3 border border-[#EDE6E2] rounded-lg">
									<div className="bg-[#F7E6E9] p-2 rounded-full">
										<IconCalendar size={20} className="text-[#7D3A3F]" />
									</div>
									<div>
										<p className="font-semibold">Date</p>
										<p className="text-gray-600">{ceremony.date}</p>
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 border border-[#EDE6E2] rounded-lg">
									<div className="bg-[#F7E6E9] p-2 rounded-full">
										<IconClock size={20} className="text-[#7D3A3F]" />
									</div>
									<div>
										<p className="font-semibold">Time</p>
										<p className="text-gray-600">{ceremony.time}</p>
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 border border-[#EDE6E2] rounded-lg">
									<div className="bg-[#F7E6E9] p-2 rounded-full">
										<IconMapPin size={20} className="text-[#7D3A3F]" />
									</div>
									<div>
										<p className="font-semibold">Location</p>
										<p className="text-gray-600">{ceremony.location}</p>
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 border border-[#EDE6E2] rounded-lg">
									<div className="bg-[#F7E6E9] p-2 rounded-full">
										<IconShirt size={20} className="text-[#7D3A3F]" />
									</div>
									<div>
										<p className="font-semibold">Dress Code</p>
										<p className="text-gray-600">{ceremony.dressCode}</p>
									</div>
								</div>
							</div>

							{/* Map Embed */}
							<div className="mb-6 rounded-lg overflow-hidden">
								<iframe
									src={ceremony.mapUrl}
									width="100%"
									height="200"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="rounded-lg"></iframe>
							</div>

							<div className="flex gap-3">
								<Button
									onClick={() => window.open(ceremony.directionsUrl, "_blank")}
									className="flex-1 bg-[#D69A0F] hover:bg-[#bc390d] text-white">
									<IconMapPin size={18} className="mr-2" />
									Get Directions
								</Button>
								<Button
									onClick={() => handleAddToCalendar(ceremony)}
									variant="outline"
									className="flex-1 border-[#EDE6E2] hover:bg-[#F7F3F1]">
									<IconCalendar size={18} className="mr-2" />
									Add to Calendar
								</Button>
							</div>
						</motion.div>

						{/* Reception Card */}
						<motion.div
							variants={itemVariants}
							className="flex-1 border border-[#EDE6E2] rounded-lg p-6">
							<h2 className="text-2xl font-bold text-[#7D3A3F] mb-4">
								{reception.title}
							</h2>
							<p className="text-gray-600 mb-6">{reception.description}</p>

							<div className="space-y-4 mb-6">
								<div className="flex items-center gap-3 p-3 border border-[#EDE6E2] rounded-lg">
									<div className="bg-[#F7E6E9] p-2 rounded-full">
										<IconCalendar size={20} className="text-[#7D3A3F]" />
									</div>
									<div>
										<p className="font-semibold">Date</p>
										<p className="text-gray-600">{reception.date}</p>
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 border border-[#EDE6E2] rounded-lg">
									<div className="bg-[#F7E6E9] p-2 rounded-full">
										<IconClock size={20} className="text-[#7D3A3F]" />
									</div>
									<div>
										<p className="font-semibold">Time</p>
										<p className="text-gray-600">{reception.time}</p>
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 border border-[#EDE6E2] rounded-lg">
									<div className="bg-[#F7E6E9] p-2 rounded-full">
										<IconMapPin size={20} className="text-[#7D3A3F]" />
									</div>
									<div>
										<p className="font-semibold">Location</p>
										<p className="text-gray-600">{reception.location}</p>
									</div>
								</div>

								<div className="flex items-center gap-3 p-3 border border-[#EDE6E2] rounded-lg">
									<div className="bg-[#F7E6E9] p-2 rounded-full">
										<IconMusic size={20} className="text-[#7D3A3F]" />
									</div>
									<div>
										<p className="font-semibold">Dinner & Dance</p>
										<p className="text-gray-600">{reception.dinnerDance}</p>
									</div>
								</div>
							</div>

							{/* Map Embed */}
							<div className="mb-6 rounded-lg overflow-hidden">
								<iframe
									src={reception.mapUrl}
									width="100%"
									height="200"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="rounded-lg"></iframe>
							</div>

							<div className="flex gap-3">
								<Button
									onClick={() => window.open(reception.directionsUrl, "_blank")}
									className="flex-1 bg-[#D69A0F] hover:bg-[#bc390d] text-white">
									<IconMapPin size={18} className="mr-2" />
									Get Directions
								</Button>
								<Button
									onClick={() => handleAddToCalendar(reception)}
									variant="outline"
									className="flex-1 border-[#EDE6E2] hover:bg-[#F7F3F1]">
									<IconCalendar size={18} className="mr-2" />
									Add to Calendar
								</Button>
							</div>
						</motion.div>
					</motion.div>

					{/* Timeline Section */}
					<motion.div
						variants={itemVariants}
						className="border border-[#EDE6E2] rounded-lg p-6 mb-8">
						<h2 className="text-2xl font-bold text-[#7D3A3F] mb-6 text-center">
							Wedding Day Timeline
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{timeline.map((item, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									className="flex items-center gap-3 p-4 border border-[#EDE6E2] rounded-lg hover:shadow-md transition-shadow">
									<div className="bg-[#F7E6E9] p-2 rounded-full">
										{item.icon}
									</div>
									<div>
										<p className="font-semibold">{item.event}</p>
										<p className="text-gray-600">{item.time}</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* RSVP Section */}
					<motion.div
						variants={itemVariants}
						className="border border-[#EDE6E2] rounded-lg p-6">
						<h2 className="text-2xl font-bold text-[#7D3A3F] mb-4 text-center">
							Will you be joining us?
						</h2>
						<p className="text-gray-600 text-center mb-6">
							Please RSVP by November 20, 2025 so we can plan accordingly.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center w-full flex-wrap">
							<Link href="/rsvp">
								<Button className="bg-[#D69A0F] hover:bg-[#bc390d] text-white">
									RSVP Now <IconArrowRight size={18} className="ml-2" />
								</Button>
							</Link>

							<Link href="/live-stream">
								<Button
									variant="outline"
									className="border-[#EDE6E2] hover:bg-[#F7F3F1]">
									<IconVideo size={18} className="mr-2" />
									Watch Livestream
								</Button>
							</Link>

							<Link href="/gift-registry">
								<Button
									variant="outline"
									className="border-[#EDE6E2] hover:bg-[#F7F3F1] w-fit sm:w-full">
									<IconGift size={18} className="mr-2" />
									View Registry
								</Button>
							</Link>

							<Link href="/gallery">
								<Button
									variant="outline"
									className="border-[#EDE6E2] hover:bg-[#F7F3F1]">
									<IconCamera size={18} className="mr-2" />
									See Venue Photos
								</Button>
							</Link>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}

export default Events;
