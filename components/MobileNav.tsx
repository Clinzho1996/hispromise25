"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { overviewLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { IconMenu } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNav = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const pathname = usePathname();

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};
	// Function to get the name initials from the user's name

	return (
		<section className="w-fulll max-w-[264px]">
			<Sheet>
				<SheetTrigger>
					<IconMenu />
				</SheetTrigger>
				<SheetContent side="left" className="border-none bg-white">
					<div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
						<SheetClose asChild>
							<>
								<div className="flex flex-1 flex-col gap-2">
									{/* Logo and Toggle Button */}
									<div className="flex items-center justify-between border-b-[#CED0D51A] p-3 h-[80px]">
										{!isCollapsed ? (
											<Link
												href="/"
												className="flex flex-row justify-start items-center gap-1">
												<Image
													src="/images/logo.png"
													alt="HisPromise Logo"
													width={40}
													height={40}
													className="justify-center h-full flex object-contain"
												/>
												<p className="text-lg font-semibold">#HisPromise25</p>
											</Link>
										) : (
											<Link
												href="/"
												className="flex items-center justify-center w-full min-w-[250px]">
												<Image
													src="/images/logo.png"
													alt="HisPromise Logo"
													width={150}
													height={50}
													className="w-[250px] h-auto object-contain"
												/>
											</Link>
										)}
										<button
											onClick={toggleSidebar}
											className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#E9E9EB17]">
											<Image
												src={
													isCollapsed
														? "/icons/arrow-right.svg"
														: "/icons/arrow-right.svg"
												}
												alt="Toggle sidebar"
												width={20}
												height={20}
												className="w-5 h-5 object-contain"
											/>
										</button>
									</div>

									{!isCollapsed && (
										<>
											<p className="text-sm font-normal text-gray-500 pl-4 font-inter py-2">
												MENU
											</p>
										</>
									)}

									{/* Sidebar Links */}
									{overviewLinks.map((item) => {
										const isActive =
											pathname === item.route ||
											pathname.startsWith(`${item.route}/`);

										return (
											<Link
												href={item.route}
												key={item.label}
												className={cn(
													"flex items-center  justify-start rounded-[8px] mx-auto sm:mx-4 my-0 border-[1px] border-[#FFFFFF0A] w-[90%]",
													{
														"shadow-inner shadow-[#D69A0F] border-[1px] border-[#D69A0F]":
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
																isActive ? "text-[#D69A0F]" : "text-black"
															)}
														/>
													)}
													{!isCollapsed && (
														<p
															className={cn(
																"text-sm font-normal font-inter text-black",
																{
																	"text-[#D69A0F]": isActive,
																}
															)}>
															{item.label}
														</p>
													)}
												</div>
											</Link>
										);
									})}
								</div>
							</>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
};

export default MobileNav;
