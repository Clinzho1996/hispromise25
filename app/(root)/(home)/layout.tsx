"use client";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOhead";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main>
			<div className="flex">
				<SEOHead />
				<Sidebar />
				<section className="flex min-h-screen flex-1 flex-col pb-6">
					<div className="w-full flex flex-col gap-3">
						<Navbar />
						{children}
					</div>
				</section>
			</div>
		</main>
	);
};

export default HomeLayout;
