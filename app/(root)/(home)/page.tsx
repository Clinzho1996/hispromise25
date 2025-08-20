import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Gift from "@/components/Gift";
import Guestbook from "@/components/Guestbook";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Livestream from "@/components/Livestream";
import RSVP from "@/components/RSVP";
import Story from "@/components/Story";

function HomePage() {
	return (
		<div>
			<Header />
			<div className="flex flex-col  w-full max-w-[100vw] p-3 sm:p-6">
				<Hero />
				<Story />
				<Events />
				<RSVP />
				<Gallery />
				<Gift />
				<Livestream />
				<Guestbook />
			</div>
		</div>
	);
}

export default HomePage;
