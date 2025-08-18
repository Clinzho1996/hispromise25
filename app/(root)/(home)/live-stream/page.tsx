import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";

function LiveStream() {
	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
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
