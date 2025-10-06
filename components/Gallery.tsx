"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Sample gallery images - share across categories
const allImages = [
	{
		id: 1,
		src: "/images/us5.jpg",
		alt: "Couple portrait",
		categories: ["all", "preWedding"],
	},

	{
		id: 11,
		src: "/images/mb6.png",
		alt: "Romantic moment",
		categories: ["all", "engagement"],
	},
	{
		id: 21,
		src: "/images/us6.jpg",
		alt: "Couple portrait",
		categories: ["all", "preWedding"],
	},

	{
		id: 15,
		src: "/images/b2.JPG",
		alt: "Laughing together",
		categories: ["all", "friends"],
	},

	{
		id: 17,
		src: "/images/b5.JPG",
		alt: "Laughing together",
		categories: ["all", "friends"],
	},
	{
		id: 23,
		src: "/images/us10.jpg",
		alt: "Couple portrait",
		categories: ["all", "preWedding"],
	},

	{
		id: 5,
		src: "/images/mb4.png",
		alt: "Formal portrait",
		categories: ["all", "engagement"],
	},
	{
		id: 15,
		src: "/images/m4.jpg",
		alt: "Formal portrait",
		categories: ["all", "clinton"],
	},
	{
		id: 16,
		src: "/images/m5.jpg",
		alt: "Formal portrait",
		categories: ["all", "clinton"],
	},

	{
		id: 24,
		src: "/images/us11.jpg",
		alt: "Couple portrait",
		categories: ["all", "preWedding"],
	},

	{
		id: 8,
		src: "/images/mb7.png",
		alt: "Celebration",
		categories: ["all", "engagement"],
	},
];

// Create gallery images object by filtering allImages based on categories
const galleryImages = {
	all: allImages,
	preWedding: allImages.filter((img) => img.categories.includes("preWedding")),
	engagement: allImages.filter((img) => img.categories.includes("engagement")),
	knocking: allImages.filter((img) => img.categories.includes("knocking")),
	clinton: allImages.filter((img) => img.categories.includes("clinton")),
	friends: allImages.filter((img) => img.categories.includes("friends")),
};

function Gallery() {
	const [activeTab, setActiveTab] = useState("all");
	const [selectedImage, setSelectedImage] = useState<
		(typeof allImages)[0] | null
	>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (image: (typeof allImages)[0]) => {
		setSelectedImage(image);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedImage(null);
	};

	return (
		<div
			className={`${spaceGrotesk.className} mt-4 border rounded-lg p-4 border-[#EDE6E2] flex flex-col gap-4`}>
			<h2 className="text-lg font-semibold">Our Gallery</h2>

			<Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 w-full h-full">
					<TabsTrigger
						value="all"
						className="data-[state=active]:bg-white p-3 data-[state=active]:border data-[state=active]:border-[#EDE6E2] data-[state=active]:text-dark-1 text-[#6C7278] data-[state=active]:shadow-lg">
						All
					</TabsTrigger>
					<TabsTrigger
						value="preWedding"
						className="data-[state=active]:bg-white p-3 data-[state=active]:border data-[state=active]:border-[#EDE6E2] data-[state=active]:text-dark-1 text-[#6C7278] data-[state=active]:shadow-lg">
						Introduction
					</TabsTrigger>
					<TabsTrigger
						value="engagement"
						className="data-[state=active]:bg-white p-3 data-[state=active]:border data-[state=active]:border-[#EDE6E2] data-[state=active]:text-dark-1 text-[#6C7278] data-[state=active]:shadow-lg">
						Romantic Moments
					</TabsTrigger>
					<TabsTrigger
						value="clinton"
						className="data-[state=active]:bg-white p-3 data-[state=active]:border data-[state=active]:border-[#EDE6E2] data-[state=active]:text-dark-1 text-[#6C7278] data-[state=active]:shadow-lg">
						Clinton
					</TabsTrigger>
					<TabsTrigger
						value="friends"
						className="data-[state=active]:bg-white p-3 data-[state=active]:border data-[state=active]:border-[#EDE6E2] data-[state=active]:text-dark-1 text-[#6C7278] data-[state=active]:shadow-lg">
						Promise
					</TabsTrigger>
				</TabsList>

				{Object.entries(galleryImages).map(([category, images]) => (
					<TabsContent key={category} value={category} className="mt-4">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
							{images.map((image) => (
								<div
									key={image.id}
									className="aspect-[3/2] overflow-hidden rounded-lg border border-[#EDE6E2] hover:shadow-md transition-shadow cursor-pointer"
									onClick={() => openModal(image)}>
									<Image
										src={image.src || "/images/placeholder.jpg"}
										alt={image.alt}
										width={300}
										height={200}
										className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 object-top"
									/>
								</div>
							))}
						</div>

						{images.length === 0 && (
							<div className="text-center py-8 text-gray-500">
								<p>No photos in this category yet</p>
							</div>
						)}
					</TabsContent>
				))}
			</Tabs>

			{/* Image Preview Modal */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="max-w-4xl p-0 bg-transparent border-none">
					{selectedImage && (
						<div className="relative">
							<Image
								src={selectedImage.src}
								alt={selectedImage.alt}
								width={800}
								height={600}
								className="w-full h-auto max-h-[80vh] object-contain rounded-lg object-top"
							/>
							<DialogDescription className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 rounded-b-lg">
								{selectedImage.alt}
							</DialogDescription>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default Gallery;
