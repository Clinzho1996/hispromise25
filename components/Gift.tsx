"use client";

import { motion, Variants } from "framer-motion"; // Import Variants type
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
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

function Gift() {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "0px 0px -10% 0px" }} // Use margin instead of threshold
			variants={containerVariants}
			className={`${spaceGrotesk.className} mt-4 border rounded-lg p-4 border-[#EDE6E2] flex flex-col gap-3`}>
			<motion.p variants={itemVariants} className="text-lg font-semibold">
				Gift Registry
			</motion.p>

			<motion.p variants={itemVariants} className="text-sm text-[#A8A8A8]">
				Your presence is the greatest gift of all. However, if you wish to honor
				us with a gift, we have created a registry to help guide your
				generosity.
			</motion.p>

			<motion.div
				variants={containerVariants}
				className="flex flex-col sm:flex-row justify-between items-stretch w-full gap-3">
				<motion.div
					variants={itemVariants}
					className="p-4 border-[#EDE6E2] rounded-lg border w-full gap-1 flex flex-col">
					<p className="text-sm font-semibold">Local Bank Transfers</p>
					<p className="text-sm text-[#A8A8A8]">
						For local bank transfers, please use the following:
					</p>
					<p className="text-sm text-[#A8A8A8]">
						Account Name: Confidence Emonena
					</p>
					<p className="text-sm text-[#A8A8A8]">Account Number: 2143881034</p>
					<p className="text-sm text-[#A8A8A8]">Bank: UBA</p>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="p-4 border-[#EDE6E2] rounded-lg border w-full gap-1 flex flex-col">
					<p className="text-sm font-semibold">Foreign Bank Transfers</p>
					<p className="text-sm text-[#A8A8A8]">
						For foreign bank transfers, please use the following:
					</p>
					<p className="text-sm text-[#A8A8A8]">Account Name: Ochuko Emonena</p>
					<p className="text-sm text-[#A8A8A8]">Account Number: 213446479813</p>
					<p className="text-sm text-[#A8A8A8]">Bank: Lead Bank</p>
					<p className="text-sm text-[#A8A8A8]">Routing Number: 101019644</p>
					<p className="text-sm text-[#A8A8A8]">
						Account Type: Personal Checking
					</p>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="p-4 border-[#EDE6E2] rounded-lg border w-full gap-1 flex flex-col justify-between">
					<div>
						<p className="text-sm font-semibold">Gift List</p>
						<p className="text-sm text-[#A8A8A8]">
							Optional items you can consider gifting us:
						</p>

						<p className="text-sm text-black font-semibold">Home essentials</p>
						<p className="text-sm text-black font-semibold">Honeymoon fund</p>
						<p className="text-sm text-black font-semibold">Charity donation</p>
					</div>

					<motion.div
						variants={itemVariants}
						transition={{ delay: 0.3 }} // Delay for the button
					>
						<Link href="/gift-registry" className="mt-4">
							<Button className="bg-[#fff] text-black border border-[#EDE6E2] hover:bg-[#bc390d] hover:text-white w-fit">
								View Gift Options
							</Button>
						</Link>
					</motion.div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}

export default Gift;
