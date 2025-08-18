import { X } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { Button } from "./ui/button";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface SaveTheDateModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAddToGoogleCalendar: () => void;
	onAddToAppleCalendar: () => void;
}

export default function SaveTheDateModal({
	isOpen,
	onClose,
	onAddToGoogleCalendar,
	onAddToAppleCalendar,
}: SaveTheDateModalProps) {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div
				className={`${spaceGrotesk.className} bg-white rounded-lg p-6 max-w-md w-full border border-[#EDE6E2]`}>
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-bold text-[#7D3A3F]">Save the Date</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700">
						<X size={20} />
					</button>
				</div>

				<div className="mb-6">
					<p className="text-gray-700 mb-2 text-xl font-semibold">
						Clinton & Promise's Wedding
					</p>
					<p className="text-gray-700 mb-1 font-medium">
						December 6, 2025 at 9:00 AM
					</p>
					<p className="text-gray-700">
						The Elevation Church, Ogba , Lagos state, Nigeria
					</p>
				</div>

				<div className="space-y-3">
					<Button
						onClick={onAddToGoogleCalendar}
						className="w-full bg-[#4285F4] hover:bg-[#357ABD] text-white flex items-center justify-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor">
							<path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.664-4.153-2.675-6.735-2.675-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.671-0.068-1.325-0.182-1.977h-9.818z" />
						</svg>
						Add to Google Calendar
					</Button>

					<Button
						onClick={onAddToAppleCalendar}
						className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor">
							<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
						</svg>
						Add to Apple Calendar
					</Button>
				</div>

				<div className="mt-4 text-center">
					<button
						onClick={onClose}
						className="text-sm text-gray-500 hover:text-gray-700 underline">
						Maybe later
					</button>
				</div>
			</div>
		</div>
	);
}
