import Header from "@/components/Header";
import Hero from "@/components/Hero";

function HomePage() {
	return (
		<div>
			<Header />
			<div className="flex flex-col  min-h-screen p-6">
				<Hero />
			</div>
		</div>
	);
}

export default HomePage;
