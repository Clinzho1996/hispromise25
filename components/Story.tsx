import { Space_Grotesk } from "next/font/google";
import Image from "next/image";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

function Story() {
	return (
		<div
			className={`${spaceGrotesk.className} mt-4 border rounded-lg p-4 border-[#EDE6E2] flex flex-col gap-3`}>
			<p className="text-lg sm:text-[24px] font-semibold">Our Story</p>

			<div className="text-sm sm:text-base text-black flex flex-col gap-3">
				<p className="border rounded-lg p-4 border-[#EDE6E2]">
					<span className="text-[#DE8F8F] font-bold pr-2">
						March 2025 - First Hello
					</span>{" "}
					A chance meeting blossomed into a beautiful relationship.
				</p>
				<p className="border rounded-lg p-4 border-[#EDE6E2]">
					<span className="text-[#DE8F8F] font-bold pr-2">
						April - June 2025
					</span>{" "}
					From road trips to late-night talks, every moment deepened our bond.
				</p>
				<p className="border rounded-lg p-4 border-[#EDE6E2]">
					<span className="text-[#DE8F8F] font-bold pr-2">
						July 2025 - The Proposal
					</span>{" "}
					Under the stars, one question, a ring, and a promise for eternity.
				</p>
			</div>

			<div className="border rounded-lg p-4 border-[#EDE6E2] flex flex-col sm:flex-row justify-between items-center w-full gap-3">
				<div className="flex flex-row justify-start items-center w-full gap-3 border rounded-lg p-3 border-[#EDE6E2]">
					<div className="w-[25%] sm:w-[20%]">
						<Image
							src="/images/dc.png"
							alt="Link Preview"
							width={100}
							height={100}
							className="rounded-lg"
						/>
					</div>
					<div className="w-[75%] sm:w-[80%]">
						<p
							className={`${spaceGrotesk.className} text-lg text-black font-semibold`}>
							Dev Clinton
						</p>
						<p className={`${spaceGrotesk.className} text-sm text-[#A8A8A8]`}>
							Loves music, tech guru, and a gamer.
						</p>
					</div>
				</div>
				<div className="flex flex-row justify-start items-center w-full gap-3 border rounded-lg p-3 border-[#EDE6E2]">
					<div className="w-[25%] sm:w-[20%]">
						<Image
							src="/images/pr.png"
							alt="Link Preview"
							width={100}
							height={100}
							className="rounded-lg"
						/>
					</div>
					<div className="w-[75%] sm:w-[80%]">
						<p
							className={`${spaceGrotesk.className} text-lg text-black font-semibold`}>
							Promise
						</p>
						<p className={`${spaceGrotesk.className} text-sm text-[#A8A8A8]`}>
							A heart for art, marketing guru, and a poet.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Story;
