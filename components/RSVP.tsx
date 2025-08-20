import { Space_Grotesk } from "next/font/google";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

function RSVP() {
	return (
		<div
			className={`${spaceGrotesk.className} mt-4 border rounded-lg p-4 border-[#EDE6E2] flex flex-col gap-3`}>
			<p className="text-lg font-semibold">RSVP / Guest List</p>

			<div className="flex flex-col gap-5">
				<div className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Full Name</p>
					<Input
						placeholder="Enter your full name"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</div>
				<div className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Email</p>
					<Input
						placeholder="Enter your email"
						type="email"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</div>
				<div className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Phone</p>
					<Input
						placeholder="Enter your phone"
						type="text"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</div>

				<div className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Number of Guests</p>
					<Input
						placeholder="Enter number of guests"
						type="number"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</div>

				<div className="flex flex-col sm:flex-row justify-between items-center gap-2">
					<p className="w-full text-[#A8A8A8]">Meal Preference</p>
					<Input
						placeholder="Enter your meal preference"
						type="text"
						className="w-full border border-[#EDE6E2] bg-[#fff9f6] p-3"
					/>
				</div>
			</div>

			<Button className="mt-4 bg-[#D69A0F] text-white hover:bg-[#bc390d] w-fit">
				Confirm Attendance
			</Button>
		</div>
	);
}

export default RSVP;
