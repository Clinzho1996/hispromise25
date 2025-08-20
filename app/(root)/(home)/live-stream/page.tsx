import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";
import Livestream from "@/components/Livestream";

function LiveStream() {
	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/livestream.png"
					title="Join us Live"
					description="Experience the magic as it happens from anywhere in the world."
				/>
				<div className="w-full max-w-[100vw]">
					<Livestream />
				</div>
			</div>
		</div>
	);
}

export default LiveStream;
