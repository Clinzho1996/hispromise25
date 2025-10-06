"use client";

import { IconMessage, IconSend } from "@tabler/icons-react";
import { AnimatePresence, motion, Variants } from "framer-motion"; // Import Framer Motion
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
			staggerChildren: 0.15, // Stagger animation for children
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7, // Slower animation
			ease: "easeOut", // Smooth easing
		},
	},
};

const formVariants: Variants = {
	hidden: { opacity: 0, height: 0 },
	visible: {
		opacity: 1,
		height: "auto",
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		height: 0,
		transition: {
			duration: 0.3,
			ease: "easeIn",
		},
	},
};

// Sample guestbook entries
const initialEntries = [
	{
		id: 1,
		name: "Sarah Johnson",
		message:
			"Wishing you both a lifetime of love and happiness together! Can't wait to celebrate with you.",
		avatar: "/images/g2.png", // Replace with actual avatar paths
	},
	{
		id: 2,
		name: "Michael Brown",
		message:
			"So happy for you both! May your marriage be filled with all the right ingredients: a heap of love, a dash of humor, and plenty of understanding.",
		avatar: "/images/m3.png",
	},
	{
		id: 3,
		name: "Emily Davis",
		message:
			"Congratulations on finding your perfect match! Wishing you endless joy and beautiful memories.",
		avatar: "/images/g1.png",
	},
	{
		id: 4,
		name: "David Wilson",
		message:
			"Your love story is an inspiration. May your wedding day be the beginning of an even more amazing journey together.",
		avatar: "/images/m2.png",
	},
];

function Guestbook() {
	const [entries, setEntries] = useState(initialEntries);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// In a real implementation, this would send data to an API endpoint
		const newEntry = {
			id: entries.length + 1,
			name: formData.name || "Anonymous",
			message: formData.message,
			avatar: "/images/m1.png", // Default avatar
		};

		setEntries([newEntry, ...entries]);
		setFormData({ name: "", message: "" });
		setShowForm(false);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "0px 0px -10% 0px" }}
			variants={containerVariants}
			className={`${spaceGrotesk.className} mt-4 border rounded-lg p-4 border-[#EDE6E2] flex flex-col gap-4`}>
			<motion.div
				variants={itemVariants}
				className="flex justify-between items-center">
				<h2 className="text-lg font-semibold">Guestbook</h2>
				<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
					<Button
						onClick={() => setShowForm(!showForm)}
						className="bg-[#4d080d] hover:bg-[#bc390d] text-white">
						<IconMessage size={18} className="mr-2" />
						{showForm ? "Cancel" : "Leave a Message"}
					</Button>
				</motion.div>
			</motion.div>

			<AnimatePresence>
				{showForm && (
					<motion.div
						variants={formVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="border border-[#EDE6E2] rounded-lg p-4 bg-[#F7F3F1] overflow-hidden">
						<h3 className="font-semibold mb-3">Share your wishes</h3>
						<form onSubmit={handleSubmit} className="flex flex-col gap-3">
							<motion.div variants={itemVariants}>
								<input
									type="text"
									name="name"
									placeholder="Your name (optional)"
									value={formData.name}
									onChange={handleChange}
									className="w-full p-2 border border-[#EDE6E2] rounded-lg text-sm"
								/>
							</motion.div>
							<motion.div variants={itemVariants}>
								<textarea
									name="message"
									placeholder="Your message or prayer..."
									value={formData.message}
									onChange={handleChange}
									rows={3}
									required
									className="w-full p-2 border border-[#EDE6E2] rounded-lg text-sm"
								/>
							</motion.div>
							<motion.div
								variants={itemVariants}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<Button
									type="submit"
									className="self-end bg-[#4d080d] hover:bg-[#bc390d] text-white"
									disabled={!formData.message.trim()}>
									<IconSend size={18} className="mr-2" />
									Post Message
								</Button>
							</motion.div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>

			<motion.div
				variants={containerVariants}
				className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{entries.map((entry, index) => (
					<motion.div
						key={entry.id}
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						transition={{ delay: index * 0.1 }}
						className="border border-[#EDE6E2] rounded-lg p-4 flex flex-col gap-3">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
								{entry.avatar ? (
									<img
										src={entry.avatar}
										alt={entry.name}
										className="w-10 h-10 rounded-full object-cover"
									/>
								) : (
									<span className="text-sm font-semibold">
										{entry.name.charAt(0).toUpperCase()}
									</span>
								)}
							</div>
							<h3 className="font-semibold text-sm">{entry.name}</h3>
						</div>
						<p className="text-sm text-gray-600">{entry.message}</p>
					</motion.div>
				))}
			</motion.div>

			{entries.length === 0 && (
				<motion.div
					variants={itemVariants}
					className="text-center py-8 text-gray-500">
					<p>No messages yet. Be the first to share your wishes!</p>
				</motion.div>
			)}
		</motion.div>
	);
}

export default Guestbook;
