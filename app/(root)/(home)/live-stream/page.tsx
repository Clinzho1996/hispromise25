import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";

function LiveStream() {
	return (
		<div>
			<Header />

			<div className="p-6 border rounded-lg border-[#EDE6E2] w-full sm:w-[98%] mx-auto mt-4">
				<BreadCrumb
					img="/images/livestream.png"
					title="Our Live Stream"
					description="A journey of love and commitment."
				/>
			</div>
		</div>
	);
}

export default LiveStream;
