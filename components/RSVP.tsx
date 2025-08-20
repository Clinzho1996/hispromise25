"use client";

import { motion } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Animation variants with slower timing
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: "easeOut" as const,
		},
	},
};

function RSVP() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		guests: "",
		mealPreference: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Send data to Google Sheets via Google Apps Script
			const response = await fetch(
				"https://script.google.com/macros/s/AKfycbz3PQYsQqaGKUyBny9l0vBzjX-fgJ7GQWTSZc-foAJfNWh1KiwD5KedBKoPigX-u9m5/exec",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: formData.name,
						email: formData.email,
						phone: formData.phone,
						guests: formData.guests,
						mealPreference: formData.mealPreference,
						timestamp: new Date().toISOString(),
					}),
				}
			);

			if (response.ok) {
				// Show success toast
				toast.success("RSVP submitted successfully!", {
					description: "You will receive a confirmation email shortly.",
				});

				// Send confirmation email (this would be handled by your Google Apps Script)
				await sendConfirmationEmail(formData.email, formData.name);

				// Reset form
				setFormData({
					name: "",
					email: "",
					phone: "",
					guests: "",
					mealPreference: "",
				});
			} else {
				throw new Error("Failed to submit RSVP");
				toast.error("Failed to submit RSVP", {
					description: "Please try again later.",
				});
			}
		} catch (error) {
			console.error("Error submitting RSVP:", error);
			toast.error("Failed to submit RSVP", {
				description: "Please try again later.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const sendConfirmationEmail = async (email: string, name: string) => {
		// This would be handled by your Google Apps Script
		// The script would send an email using GmailApp service
		try {
			await fetch(
				"https://script.google.com/macros/s/AKfycbz3PQYsQqaGKUyBny9l0vBzjX-fgJ7GQWTSZc-foAJfNWh1KiwD5KedBKoPigX-u9m5/exec",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						action: "sendConfirmationEmail",
						email: email,
						name: name,
					}),
				}
			);
		} catch (error) {
			console.error("Error sending confirmation email:", error);
		}
	};

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			variants={containerVariants}
			className={`${spaceGrotesk.className} mt-4 border rounded-lg p-4 border-[#EDE6E2] flex flex-col gap-3`}>
			<motion.p variants={itemVariants} className="text-lg font-semibold">
				RSVP / Guest List
			</motion.p>

			<form onSubmit={handleSubmit}>
				<motion.div
					variants={containerVariants}
					className="flex flex-col gap-5">
					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row justify-between items-center gap-2">
						<label htmlFor="name" className="w-full text-[#A8A8A8]">
							Full Name *
						</label>
						<Input
							id="name"
							name="name"
							placeholder="Enter your full name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
						/>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row justify-between items-center gap-2">
						<label htmlFor="email" className="w-full text-[#A8A8A8]">
							Email *
						</label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="Enter your email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
						/>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row justify-between items-center gap-2">
						<label htmlFor="phone" className="w-full text-[#A8A8A8]">
							Phone
						</label>
						<Input
							id="phone"
							name="phone"
							type="tel"
							placeholder="Enter your phone"
							value={formData.phone}
							onChange={handleChange}
							className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
						/>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row justify-between items-center gap-2">
						<label htmlFor="guests" className="w-full text-[#A8A8A8]">
							Number of Guests *
						</label>
						<Input
							id="guests"
							name="guests"
							type="number"
							min="1"
							placeholder="Enter number of guests"
							value={formData.guests}
							onChange={handleChange}
							required
							className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
						/>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row justify-between items-center gap-2">
						<label htmlFor="mealPreference" className="w-full text-[#A8A8A8]">
							Meal Preference
						</label>
						<Input
							id="mealPreference"
							name="mealPreference"
							type="text"
							placeholder="e.g., Vegetarian, Vegan, No allergies"
							value={formData.mealPreference}
							onChange={handleChange}
							className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
						/>
					</motion.div>
				</motion.div>

				<motion.div variants={itemVariants} transition={{ delay: 0.5 }}>
					<Button
						type="submit"
						className="mt-4 bg-[#D69A0F] text-white hover:bg-[#bc390d] w-fit"
						disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Confirm Attendance"}
					</Button>
				</motion.div>
			</form>
		</motion.div>
	);
}

export default RSVP;
