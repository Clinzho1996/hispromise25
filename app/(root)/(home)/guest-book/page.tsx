import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";

function GuestBook() {
	return (
		<div>
			<Header />

			<div className="p-6 border rounded-lg border-[#EDE6E2] w-full sm:w-[98%] mx-auto mt-4">
				<BreadCrumb
					img="/images/events.png"
					title="GuestBook"
					description="A journey of love and commitment."
				/>
			</div>
		</div>
	);
}

export default GuestBook;
