"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { overviewLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(true); // Collapsed by default
	const pathname = usePathname();

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<TooltipProvider>
			<section
				className={cn(
					"sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#F7F3F1] text-dark-3 max-sm:hidden z-10 border-r border-[#EDE6E2] rounded-l-lg",
					{
						"lg:w-[80px]": isCollapsed,
						"lg:w-[264px]": !isCollapsed,
					}
				)}>
				<div className="flex flex-1 flex-col gap-2">
					{/* Logo and Toggle Button */}
					<div className="flex items-center justify-between border-b-[#CED0D51A] p-3 h-[78px] border-b">
						{!isCollapsed ? (
							<Link
								href="/"
								className="flex flex-row justify-start items-center gap-1">
								<Image
									src="/images/logo.png"
									alt="HisPromise Logo"
									width={40}
									height={40}
									className="justify-center h-full flex object-cover rounded-lg"
								/>
								<p
									className={`${spaceGrotesk.className} text-lg font-semibold`}>
									#HisPromise25
								</p>
							</Link>
						) : (
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										href="/"
										className="flex items-center justify-center w-full">
										<Image
											src="/images/logo.png"
											alt="HisPromise Logo"
											width={50}
											height={50}
											className="w-[50px] object-contain h-full flex rounded-lg"
										/>
									</Link>
								</TooltipTrigger>
								<TooltipContent side="right">
									<p>Home</p>
								</TooltipContent>
							</Tooltip>
						)}
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									onClick={toggleSidebar}
									className="hidden bg-white rounded-full lg:flex items-center justify-center w-6 h-6 hover:bg-[#E9E9EB17]">
									<Image
										src={
											isCollapsed
												? "/images/arrow-right.png"
												: "/images/arrow-right.png"
										}
										alt="Toggle sidebar"
										width={20}
										height={20}
										className="w-4 h-4 object-contain"
									/>
								</button>
							</TooltipTrigger>
							<TooltipContent
								side="right"
								className="bg-white py-2 px-4 rounded-lg shadow-lg">
								<p>{isCollapsed ? "Expand sidebar" : "Collapse sidebar"}</p>
							</TooltipContent>
						</Tooltip>
					</div>

					{!isCollapsed && (
						<>
							<p className="text-sm font-normal text-gray-400 pl-4 font-inter py-2">
								OVERVIEW
							</p>
						</>
					)}

					{/* Sidebar Links */}
					{overviewLinks.map((item) => {
						const isActive =
							pathname === item.route || pathname.startsWith(`${item.route}/`);

						const linkContent = (
							<Link
								href={item.route}
								className={cn(
									"flex items-center justify-center sm:justify-start rounded-[8px] mx-auto sm:mx-4 my-0 border-[1px] border-black w-full",
									{
										"shadow-inner shadow-[#bc390d] border-[1px] border-yellow-600 bg-[#4d080d]":
											isActive,
										"p-2": !isCollapsed,
										"p-3": isCollapsed,
									}
								)}>
								<div className="flex gap-2 items-center">
									{item.icon && (
										<item.icon
											className={cn(
												"w-[20px] h-[20px] object-contain flex",
												isActive ? "text-white" : "text-dark"
											)}
										/>
									)}

									{!isCollapsed && (
										<p
											className={cn(
												`${spaceGrotesk.className} text-sm font-normal font-inter text-dark`,
												{
													"text-[#fff]": isActive,
												}
											)}>
											{item.label}
										</p>
									)}
								</div>
							</Link>
						);

						return (
							<div
								key={item.label}
								className="relative flex items-center justify-center">
								{isCollapsed ? (
									<Tooltip>
										<TooltipTrigger asChild>{linkContent}</TooltipTrigger>
										<TooltipContent
											side="right"
											className="bg-white py-2 px-4 rounded-lg shadow-lg">
											<p>{item.label}</p>
										</TooltipContent>
									</Tooltip>
								) : (
									linkContent
								)}
							</div>
						);
					})}
				</div>
			</section>
		</TooltipProvider>
	);
};

export default Sidebar;
