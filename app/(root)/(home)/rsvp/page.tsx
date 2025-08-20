import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";
import RSVP from "@/components/RSVP";

function RSVPPage() {
	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/rsvp.png"
					title="Our RSVP"
					description="Let us know if you can make it!"
				/>
				<RSVP />
			</div>
		</div>
	);
}

export default RSVPPage;
