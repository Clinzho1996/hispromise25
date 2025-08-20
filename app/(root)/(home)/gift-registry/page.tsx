"use client";

import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { toast } from "sonner";

// Define types
interface GiftItem {
	id: number;
	name: string;
	description: string;
	amount: number;
	category: string;
	pledged: number;
	totalNeeded: number;
	image: string;
	details: string;
}

// Define Paystack config type
interface PaystackConfig {
	reference: string;
	email: string;
	amount: number;
	publicKey: string;
	currency: string;
	metadata?: {
		gift_id: number;
		gift_name: string;
		custom_fields: Array<{
			display_name: string;
			variable_name: string;
			value: string;
		}>;
	};
}

function GiftRegistry() {
	const [selectedItem, setSelectedItem] = useState<GiftItem | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [pledgeAmount, setPledgeAmount] = useState(0);

	// Sample gift data
	const giftItems: GiftItem[] = [
		{
			id: 1,
			name: "Honeymoon Fund",
			description: "Contribute to our dream honeymoon in Bali",
			amount: 500000,
			category: "Experience",
			pledged: 250000,
			totalNeeded: 500000,
			image: "/images/dine.png",
			details:
				"Help us create unforgettable memories with a honeymoon in Bali. This includes flights, accommodation, and experiences.",
		},
		{
			id: 2,
			name: "Kitchen Appliances Set",
			description: "High-quality appliances for our new home",
			amount: 350000,
			category: "Home",
			pledged: 175000,
			totalNeeded: 350000,
			image: "/images/baby.png",
			details:
				"A complete set of kitchen appliances including refrigerator, oven, microwave, and blender for our new home.",
		},
		{
			id: 3,
			name: "Furniture Fund",
			description: "Help us furnish our new apartment",
			amount: 750000,
			category: "Home",
			pledged: 300000,
			totalNeeded: 750000,
			image: "/images/bed.png",
			details:
				"Contribute towards our living room set, bedroom furniture, and dining table for our new home.",
		},
		{
			id: 4,
			name: "Charity Donation",
			description: "Donate to our favorite charity in our name",
			amount: 200000,
			category: "Charity",
			pledged: 100000,
			totalNeeded: 200000,
			image: "/images/dine.png",
			details:
				"Instead of a gift for us, consider donating to the Red Cross in our name to help those in need.",
		},
		{
			id: 5,
			name: "Adventure Experience",
			description: "Fund an adventurous experience for us",
			amount: 300000,
			category: "Experience",
			pledged: 150000,
			totalNeeded: 300000,
			image: "/images/vac.png",
			details:
				"Help us enjoy an adventurous experience like scuba diving, hot air balloon ride, or safari tour.",
		},
		{
			id: 6,
			name: "Home Renovation Fund",
			description: "Contribute to our home renovation project",
			amount: 1000000,
			category: "Home",
			pledged: 400000,
			totalNeeded: 1000000,
			image: "/images/stan.png",
			details:
				"We're planning some renovations to make our home more comfortable. Any contribution is appreciated!",
		},
	];

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
		}).format(amount);
	};

	const calculateProgress = (pledged: number, totalNeeded: number) => {
		return (pledged / totalNeeded) * 100;
	};

	const handleViewDetails = (item: GiftItem) => {
		setSelectedItem(item);
		setIsDialogOpen(true);
	};

	// Fix the Paystack payment initialization
	const initializePaystackPayment = (item: GiftItem, amount: number) => {
		const config: PaystackConfig = {
			reference: new Date().getTime().toString(),
			email: "guest@example.com",
			amount: amount * 100,
			publicKey:
				process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
				"pk_test_your_public_key",
			currency: "NGN",
			metadata: {
				gift_id: item.id,
				gift_name: item.name,
				custom_fields: [
					{
						display_name: "Gift Item",
						variable_name: "gift_item",
						value: item.name,
					},
				],
			},
		};

		// @ts-ignore - The react-paystack types might not be perfect
		const initializePayment = usePaystackPayment(config);

		initializePayment({
			onSuccess: (response: any) => {
				toast.success("Payment successful!", {
					description: `Thank you for pledging ${formatCurrency(
						amount
					)} towards ${item.name}`,
				});
				// Update the pledged amount in your database here
			},
			onClose: () => {
				toast.info("Payment cancelled");
			},
		});
	};

	const handlePledge = (item: GiftItem, amount: number) => {
		setSelectedItem(item);
		setPledgeAmount(amount);
		initializePaystackPayment(item, amount);
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/registry.png"
					title="Gift Registry"
					description="A curated selection of gifts to celebrate our special day."
				/>

				{/* Gift Items Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
					{giftItems.map((item) => (
						<motion.div
							key={item.id}
							variants={itemVariants}
							className="border border-[#EDE6E2] rounded-lg overflow-hidden hover:shadow-md transition-shadow">
							<div className="relative h-48 w-full">
								<Image
									src={item.image}
									alt={item.name}
									fill
									className="object-cover"
								/>
								<div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-semibold">
									{item.category}
								</div>
							</div>

							<div className="p-4">
								<h3 className="font-semibold text-lg mb-1">{item.name}</h3>
								<p className="text-sm text-gray-600 mb-3">{item.description}</p>

								<div className="mb-3">
									<div className="flex justify-between text-sm mb-1">
										<span>Pledged: {formatCurrency(item.pledged)}</span>
										<span>Goal: {formatCurrency(item.totalNeeded)}</span>
									</div>
									<Progress
										value={calculateProgress(item.pledged, item.totalNeeded)}
										className="h-2 bg-gray-200" // Added background for visibility
									/>
									<div className="text-xs text-gray-500 mt-1 text-right">
										{" "}
										{/* Aligned to right */}
										{Math.round(
											calculateProgress(item.pledged, item.totalNeeded)
										)}
										% funded
									</div>
								</div>

								<div className="flex justify-between mt-4">
									<Button
										variant="outline"
										onClick={() => handleViewDetails(item)}
										className="text-sm">
										View Details
									</Button>
									<Button
										onClick={() => handlePledge(item, 10000)} // Fixed: Now passes the correct amount
										className="bg-[#D69A0F] hover:bg-[#bc390d] text-white text-sm">
										Pledge {formatCurrency(10000)}
									</Button>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* Gift Details Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="sm:max-w-2xl w-[95%] mx-auto bg-white max-h-[80vh] overflow-y-auto">
					{" "}
					{/* Added max height and scroll */}
					{selectedItem && (
						<>
							<DialogHeader>
								<DialogTitle>{selectedItem.name}</DialogTitle>
								<DialogDescription>
									{selectedItem.description}
								</DialogDescription>
							</DialogHeader>

							<div className="relative h-64 w-full mt-4">
								<Image
									src={selectedItem.image}
									alt={selectedItem.name}
									fill
									className="object-cover rounded-lg"
								/>
							</div>

							<div className="mt-4">
								<h4 className="font-semibold mb-2">Details</h4>
								<p className="text-sm text-gray-600">{selectedItem.details}</p>
							</div>

							<div className="mt-4">
								<h4 className="font-semibold mb-2">Funding Progress</h4>
								<div className="flex justify-between text-sm mb-1">
									<span>Pledged: {formatCurrency(selectedItem.pledged)}</span>
									<span>Goal: {formatCurrency(selectedItem.totalNeeded)}</span>
								</div>
								<Progress
									value={calculateProgress(
										selectedItem.pledged,
										selectedItem.totalNeeded
									)}
									className="h-2 bg-gray-200 text-amber-300" // Added background for visibility
								/>
								<div className="text-xs text-gray-500 mt-1 text-right">
									{" "}
									{/* Aligned to right */}
									{Math.round(
										calculateProgress(
											selectedItem.pledged,
											selectedItem.totalNeeded
										)
									)}
									% funded
								</div>
							</div>

							<div className="mt-6">
								<h4 className="font-semibold mb-3">Make a Pledge</h4>
								<div className="grid grid-cols-2 gap-3">
									<Button
										onClick={() => handlePledge(selectedItem, 5000)}
										variant="outline"
										className="text-sm">
										{formatCurrency(5000)}
									</Button>
									<Button
										onClick={() => handlePledge(selectedItem, 10000)}
										variant="outline"
										className="text-sm">
										{formatCurrency(10000)}
									</Button>
									<Button
										onClick={() => handlePledge(selectedItem, 20000)}
										variant="outline"
										className="text-sm">
										{formatCurrency(20000)}
									</Button>
									<Button
										onClick={() => handlePledge(selectedItem, 50000)}
										variant="outline"
										className="text-sm">
										{formatCurrency(50000)}
									</Button>
								</div>

								<div className="mt-4">
									<label className="block text-sm font-medium mb-2">
										Custom Amount
									</label>
									<div className="flex gap-2">
										<input
											type="number"
											placeholder="Enter amount"
											className="flex-1 p-2 border border-[#EDE6E2] rounded-lg"
											onChange={(e) => setPledgeAmount(Number(e.target.value))}
										/>
										<Button
											onClick={() => handlePledge(selectedItem, pledgeAmount)}
											className="bg-[#D69A0F] hover:bg-[#bc390d] text-white">
											Pledge
										</Button>
									</div>
								</div>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default GiftRegistry;
