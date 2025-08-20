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
import { databases } from "@/lib/appwrite";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Gift Item Type
interface GiftItem {
	id: string;
	name: string;
	description: string;
	amount: number;
	category: string;
	pledged: number;
	totalNeeded: number;
	image: string;
	details: string;
}

// Paystack Types
interface PaystackResponse {
	status: "success";
	message: string;
	reference: string;
	transaction: string;
	trxref: string;
}

interface PaystackPop {
	setup(options: {
		key: string;
		email: string;
		amount: number;
		currency?: string;
		ref: string;
		metadata?: {
			custom_fields: Array<{
				display_name: string;
				variable_name: string;
				value: string;
			}>;
		};
		callback: (response: PaystackResponse) => void;
		onClose: () => void;
	}): { openIframe: () => void };
}

declare global {
	interface Window {
		PaystackPop: PaystackPop;
	}
}

function GiftRegistry() {
	const [selectedItem, setSelectedItem] = useState<GiftItem | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [pledgeAmount, setPledgeAmount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [giftItems, setGiftItems] = useState<GiftItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [visibleItems, setVisibleItems] = useState(6);

	// Fetch gift items from Appwrite
	useEffect(() => {
		// Replace the fetchGiftItems function in your useEffect:
		const fetchGiftItems = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/gift-items");

				if (!response.ok) {
					throw new Error("Failed to fetch gift items");
				}

				const data = await response.json();
				setGiftItems(data as GiftItem[]);
			} catch (error) {
				console.error("Error fetching gift items:", error);
				toast.error("Failed to load gift items");
			} finally {
				setLoading(false);
			}
		};

		// Replace the updatePledgedAmount function:
		const updatePledgedAmount = async (itemId: string, amount: number) => {
			try {
				const itemToUpdate = giftItems.find((item) => item.id === itemId);
				if (!itemToUpdate) return;

				const newPledgedAmount = itemToUpdate.pledged + amount;

				// Update via API route
				const response = await fetch("/api/gift-items", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						documentId: itemId,
						pledged: newPledgedAmount,
					}),
				});

				if (!response.ok) {
					throw new Error("Failed to update pledge");
				}

				// Update local state
				setGiftItems((prevItems) =>
					prevItems.map((item) =>
						item.id === itemId ? { ...item, pledged: newPledgedAmount } : item
					)
				);

				toast.success("Pledge updated successfully!");
			} catch (error) {
				console.error("Error updating pledge:", error);
				toast.error("Failed to update pledge amount");
			}
		};

		fetchGiftItems();
	}, []);

	const formatCurrency = (amount: number) =>
		new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN",
		}).format(amount);

	const calculateProgress = (pledged: number, totalNeeded: number) =>
		(pledged / totalNeeded) * 100;

	const handleViewDetails = (item: GiftItem) => {
		setSelectedItem(item);
		setIsDialogOpen(true);
	};

	const initializePaystackPayment = (item: GiftItem, amount: number) => {
		setIsLoading(true);

		const script = document.createElement("script");
		script.src = "https://js.paystack.co/v1/inline.js";
		script.async = true;

		script.onload = () => {
			const handler = window.PaystackPop.setup({
				key:
					process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
					"pk_test_your_public_key",
				email: "guest@example.com",
				amount: amount * 100,
				currency: "NGN",
				ref: "GIFT_" + new Date().getTime(),
				metadata: {
					custom_fields: [
						{
							display_name: "Gift Item",
							variable_name: "gift_item",
							value: item.name,
						},
					],
				},
				callback: (response: PaystackResponse) => {
					toast.success("Payment successful!", {
						description: `Thank you for pledging ${formatCurrency(
							amount
						)} towards ${item.name}`,
					});
					setIsLoading(false);
					updatePledgedAmount(item.id, amount);
				},
				onClose: () => {
					toast.info("Payment cancelled");
					setIsLoading(false);
				},
			});

			handler.openIframe();
		};

		script.onerror = () => {
			toast.error("Failed to load payment processor");
			setIsLoading(false);
		};

		document.body.appendChild(script);
	};

	const updatePledgedAmount = async (itemId: string, amount: number) => {
		try {
			const itemToUpdate = giftItems.find((item) => item.id === itemId);
			if (!itemToUpdate) return;

			const newPledgedAmount = itemToUpdate.pledged + amount;

			await databases.updateDocument(
				"68a5e939001882ddb1bb",
				"68a5e951003bfe33155e",
				itemId,
				{ pledged: newPledgedAmount }
			);

			setGiftItems((prevItems) =>
				prevItems.map((item) =>
					item.id === itemId ? { ...item, pledged: newPledgedAmount } : item
				)
			);

			toast.success("Pledge updated successfully!");
		} catch (error) {
			console.error("Error updating pledge:", error);
			toast.error("Failed to update pledge amount");
		}
	};

	const handlePledge = (item: GiftItem, amount: number) => {
		if (amount <= 0) {
			toast.error("Please enter a valid amount");
			return;
		}
		setSelectedItem(item);
		setPledgeAmount(amount);
		initializePaystackPayment(item, amount);
	};

	const loadMore = () => {
		setVisibleItems((prev) => prev + 6);
	};

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	if (loading) {
		return (
			<div>
				<Header />
				<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
					<BreadCrumb
						img="/images/registry.png"
						title="Gift Registry"
						description="A curated selection of gifts to celebrate our special day."
					/>
					<div className="flex justify-center items-center h-64">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D69A0F]"></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/registry.png"
					title="Gift Registry"
					description="A curated selection of gifts to celebrate our special day."
				/>

				{/* Gift Items Grid - Fixed: Added key prop to the motion.div wrapper */}
				<motion.div
					key="gift-items-grid" // Added unique key here
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
					{giftItems.slice(0, visibleItems).map((item) => {
						const progress = calculateProgress(item.pledged, item.totalNeeded);

						return (
							<motion.div
								key={item.id} // This key is correct
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
									<p className="text-sm text-gray-600 mb-3">
										{item.description}
									</p>

									<div className="mb-3">
										<div className="flex justify-between text-sm mb-1">
											<span>Pledged: {formatCurrency(item.pledged)}</span>
											<span>Goal: {formatCurrency(item.totalNeeded)}</span>
										</div>
										<div className="w-full bg-gray-200 h-2 rounded">
											<div
												className="bg-[#D69A0F] h-2 rounded"
												style={{ width: `${progress}%` }}
											/>
										</div>
										<div className="text-xs text-gray-500 mt-1 text-right">
											{Math.round(progress)}% funded
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
											onClick={() => handlePledge(item, 50000)}
											className="bg-[#D69A0F] hover:bg-[#bc390d] text-white text-sm"
											disabled={isLoading}>
											{isLoading
												? "Processing..."
												: `Pledge ${formatCurrency(50000)}`}
										</Button>
									</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* Load More Button */}
				{visibleItems < giftItems.length && (
					<div className="flex justify-center mt-8">
						<Button
							onClick={loadMore}
							variant="outline"
							className="border-[#D69A0F] text-[#D69A0F] hover:bg-[#D69A0F] hover:text-white">
							Load More Gifts
						</Button>
					</div>
				)}

				{giftItems.length === 0 && (
					<div className="text-center py-12">
						<p className="text-gray-500">No gift items available yet.</p>
					</div>
				)}
			</div>

			{/* Gift Details Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-2xl bg-white max-h-[80vh] overflow-y-auto">
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
								<div className="w-full bg-gray-200 h-2 rounded">
									<div
										className="bg-[#D69A0F] h-2 rounded"
										style={{
											width: `${calculateProgress(
												selectedItem.pledged,
												selectedItem.totalNeeded
											)}%`,
										}}
									/>
								</div>
								<div className="text-xs text-gray-500 mt-1 text-right">
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
									{[5000, 10000, 20000, 50000].map((amount) => (
										<Button
											key={amount}
											onClick={() => handlePledge(selectedItem, amount)}
											variant="outline"
											className="text-sm"
											disabled={isLoading}>
											{formatCurrency(amount)}
										</Button>
									))}
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
											onClick={() =>
												selectedItem && handlePledge(selectedItem, pledgeAmount)
											}
											className="bg-[#D69A0F] hover:bg-[#bc390d] text-white"
											disabled={isLoading}>
											{isLoading ? "Processing..." : "Pledge"}
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
