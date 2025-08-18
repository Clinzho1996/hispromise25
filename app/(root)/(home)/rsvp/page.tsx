import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";

function RSVP() {
	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/rsvp.png"
					title="Our RSVP"
					description="A journey of love and commitment."
				/>
			</div>
		</div>
	);
}

export default RSVP;
