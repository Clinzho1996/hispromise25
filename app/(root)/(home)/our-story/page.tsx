import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";

function OurStory() {
	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/gallery.png"
					title="Our Story"
					description="A beautiful journey of love and commitment."
				/>
			</div>
		</div>
	);
}

export default OurStory;
