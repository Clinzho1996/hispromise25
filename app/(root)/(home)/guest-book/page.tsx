import BreadCrumb from "@/components/BreadCrumb";
import Guestbook from "@/components/Guestbook";
import Header from "@/components/Header";

function GuestBook() {
	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/events.png"
					title="GuestBook"
					description="Share your thoughts and wishes with us."
				/>
				<Guestbook />
			</div>
		</div>
	);
}

export default GuestBook;
