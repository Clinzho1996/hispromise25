import { IconSearch, IconShare } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Header() {
	return (
		<div className="p-6 flex flex-col sm:flex-row justify-between gap-3 items-center w-full border-b border-b-[#E2E4E9]">
			<div className="flex flex-row justify-start border-[#A8A8A8] items-center gap-2 border rounded-lg px-3 py-0 w-full">
				<IconSearch color="#A8A8A8" />
				<Input
					placeholder="Search the website ..."
					className="border-none focus:outline-none shadow-none focus-within:not-enabled:"
				/>
			</div>

			<div className="flex flex-row justify-end items-center gap-3 w-full">
				<Button className="border border-[#E2E4E9] bg-white text-dark-3 hover:bg-[#F7F3F1]">
					<IconShare /> Share
				</Button>

				<Button className="bg-[#D69A0F] text-white font-semibold">
					RSVP Now
				</Button>
			</div>
		</div>
	);
}

export default Header;
