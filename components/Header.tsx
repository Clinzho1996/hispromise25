"use client";

import {
	IconBrandFacebook,
	IconBrandWhatsapp,
	IconCopy,
	IconLink,
	IconMail,
	IconMessage,
	IconSearch,
	IconSend,
	IconShare,
	IconX,
} from "@tabler/icons-react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

// Define searchable content
const searchableContent = [
	{
		title: "Our Story",
		description: "Read about how we met and our journey together",
		url: "/our-story",
		category: "About Us",
		keywords: ["story", "journey", "love", "relationship", "couple"],
	},
	{
		title: "Wedding Events",
		description: "Details about ceremony, reception, and timeline",
		url: "/events",
		category: "Events",
		keywords: ["events", "ceremony", "reception", "timeline", "schedule"],
	},
	{
		title: "RSVP",
		description: "Confirm your attendance to our wedding",
		url: "/rsvp",
		category: "RSVP",
		keywords: ["rsvp", "attend", "confirmation", "guest", "invitation"],
	},
	{
		title: "Gift Registry",
		description: "Find our gift preferences and registry",
		url: "/gift-registry",
		category: "Gifts",
		keywords: ["gifts", "registry", "presents", "donation", "wishlist"],
	},
	{
		title: "Gallery",
		description: "View our photo gallery and memories",
		url: "/gallery",
		category: "Photos",
		keywords: ["gallery", "photos", "pictures", "memories", "images"],
	},
	{
		title: "Live Stream",
		description: "Watch our wedding ceremony live",
		url: "/live-stream",
		category: "Events",
		keywords: ["live", "stream", "watch", "online", "ceremony"],
	},
	{
		title: "Location",
		description: "Find venue locations and directions",
		url: "/events", // Linking to events since that's where locations are
		category: "Information",
		keywords: ["location", "venue", "address", "directions", "map"],
	},
	{
		title: "Dress Code",
		description: "Information about wedding attire",
		url: "/events", // Linking to events since that's where dress code is
		category: "Information",
		keywords: ["dress", "attire", "code", "outfit", "clothing"],
	},
];

function Header() {
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isCopied, setIsCopied] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);
	const websiteUrl = "https://promise.devclinton.org";

	// Close search when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setIsSearchModalOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const closeShareModal = () => {
		setIsShareModalOpen(false);
		setIsCopied(false);
	};

	const openShareModal = () => {
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

	// Filter search results
	const searchResults = useMemo(() => {
		if (!searchQuery.trim()) return [];

		const query = searchQuery.toLowerCase();
		return searchableContent.filter(
			(item) =>
				item.title.toLowerCase().includes(query) ||
				item.description.toLowerCase().includes(query) ||
				item.keywords.some((keyword) => keyword.toLowerCase().includes(query))
		);
	}, [searchQuery]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setIsSearchModalOpen(e.target.value.length > 0);
	};

	const clearSearch = () => {
		setSearchQuery("");
		setIsSearchModalOpen(false);
	};

	return (
		<div className="hidden p-6 sm:flex flex-col sm:flex-row justify-between gap-3 items-center w-full border-b border-b-[#E2E4E9] relative">
			{/* Share Modal */}
			<Modal
				isOpen={isShareModalOpen}
				onClose={closeShareModal}
				className="w-[95%] mx-auto sm:w-[500px]">
				<div className="flex flex-col gap-3">
					<div className="flex flex-row justify-between items-center">
						<div className="flex flex-row justify-start items-center gap-2">
							<Button
								className={`${spaceGrotesk.className} border border-[#F7E6E9] bg-[#F7E6E9] text-[#7D3A3F] rounded-lg`}
								onClick={closeShareModal}>
								<IconShare />
							</Button>
							<p className={`${spaceGrotesk.className} text-lg font-semibold`}>
								Share Clinton & Promise
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
									src="/images/us9.jpg"
									alt="Link Preview"
									width={100}
									height={100}
									className="rounded-lg h-[100px] object-cover object-top"
								/>
							</div>
							<div>
								<p
									className={`${spaceGrotesk.className} text-lg text-black font-semibold`}>
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
							className={`${spaceGrotesk.className} bg-[#4d080d] text-white font-semibold`}>
							<IconSend /> Share Now
						</Button>
					</div>
				</div>
			</Modal>

			{/* Search Section */}
			<div
				ref={searchRef}
				className="relative flex flex-row justify-start border-[#A8A8A8] items-center gap-2 border rounded-lg px-3 py-0 w-full">
				<IconSearch color="#A8A8A8" />
				<Input
					placeholder="Search the website ..."
					value={searchQuery}
					onChange={handleSearchChange}
					onFocus={() => searchQuery.length > 0 && setIsSearchModalOpen(true)}
					className="border-none focus:outline-none shadow-none focus-within:not-enabled:"
				/>
				{searchQuery && (
					<button
						onClick={clearSearch}
						className="text-[#A8A8A8] hover:text-gray-700">
						<IconX size={18} />
					</button>
				)}

				{/* Search Results Dropdown */}
				{isSearchModalOpen && searchResults.length > 0 && (
					<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#EDE6E2] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
						<div className="p-2">
							{searchResults.map((result, index) => (
								<Link
									key={index}
									href={result.url}
									onClick={() => setIsSearchModalOpen(false)}>
									<div className="p-3 hover:bg-[#F7F3F1] rounded-lg cursor-pointer transition-colors">
										<p className="font-semibold text-[#7D3A3F]">
											{result.title}
										</p>
										<p className="text-sm text-[#A8A8A8]">
											{result.description}
										</p>
										<span className="text-xs text-[#4d080d] bg-[#FFF9F0] px-2 py-1 rounded-full">
											{result.category}
										</span>
									</div>
								</Link>
							))}
						</div>
					</div>
				)}

				{isSearchModalOpen && searchQuery && searchResults.length === 0 && (
					<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#EDE6E2] rounded-lg shadow-lg z-50 p-4">
						<p className="text-[#A8A8A8] text-center">
							No results found for &quot;{searchQuery}&quot;
						</p>
					</div>
				)}
			</div>

			<div className="flex flex-row justify-end items-center gap-3 w-full">
				<Button
					className="border border-[#E2E4E9] cursor-pointer bg-white text-dark-3 hover:bg-[#F7F3F1]"
					onClick={openShareModal}>
					<IconShare /> Share
				</Button>

				<Link href="/rsvp">
					<Button className="bg-[#4d080d] text-white font-semibold cursor-pointer">
						RSVP Now
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Header;
