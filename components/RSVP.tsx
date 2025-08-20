"use client";

import { motion } from "framer-motion"; // Import Framer Motion
import { Space_Grotesk } from "next/font/google";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Animation variants with slower timing
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2, // Stagger animation for children
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
			ease: "easeOut" as const, // Smooth easing, cast as const for type compatibility
		},
	},
};

function RSVP() {
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

			<motion.div variants={containerVariants} className="flex flex-col gap-5">
				<motion.div
					variants={itemVariants}
					className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Full Name</p>
					<Input
						placeholder="Enter your full name"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Email</p>
					<Input
						placeholder="Enter your email"
						type="email"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Phone</p>
					<Input
						placeholder="Enter your phone"
						type="text"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Number of Guests</p>
					<Input
						placeholder="Enter number of guests"
						type="number"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Meal Preference</p>
					<Input
						placeholder="Enter your meal preference"
						type="text"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</motion.div>
			</motion.div>

			<motion.div
				variants={itemVariants}
				transition={{ delay: 0.5 }} // Delay for the button to appear last
			>
				<Button className="mt-4 bg-[#D69A0F] text-white hover:bg-[#bc390d] w-fit">
					Confirm Attendance
				</Button>
			</motion.div>
		</motion.div>
	);
}

export default RSVP;
