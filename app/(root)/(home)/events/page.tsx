import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";

function Events() {
	return (
		<div>
			<Header />
			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/events.png"
					title="Wedding Events"
					description="Join us for a day filled with love and celebration."
				/>
			</div>
		</div>
	);
}

export default Events;
