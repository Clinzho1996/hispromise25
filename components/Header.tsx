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
} from "@tabler/icons-react";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

function Header() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const websiteUrl = "https://hispromise25.vercel.app";

	const closeModal = () => {
		setIsModalOpen(false);
		setIsCopied(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
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

	return (
		<div className="hidden p-6 sm:flex flex-col sm:flex-row justify-between gap-3 items-center w-full border-b border-b-[#E2E4E9]">
			<Modal
				isOpen={isModalOpen}
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
									src="/images/kiss.png"
									alt="Link Preview"
									width={100}
									height={100}
									className="rounded-lg"
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
							className={`${spaceGrotesk.className} bg-[#D69A0F] text-white font-semibold`}>
							<IconSend /> Share Now
						</Button>
					</div>
				</div>
			</Modal>
			<div className="flex flex-row justify-start border-[#A8A8A8] items-center gap-2 border rounded-lg px-3 py-0 w-full">
				<IconSearch color="#A8A8A8" />
				<Input
					placeholder="Search the website ..."
					className="border-none focus:outline-none shadow-none focus-within:not-enabled:"
				/>
			</div>

			<div className="flex flex-row justify-end items-center gap-3 w-full">
				<Button
					className="border border-[#E2E4E9] cursor-pointer bg-white text-dark-3 hover:bg-[#F7F3F1]"
					onClick={openModal}>
					<IconShare /> Share
				</Button>

				<Link href="/rsvp">
					<Button className="bg-[#D69A0F] text-white font-semibold">
						RSVP Now
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Header;
