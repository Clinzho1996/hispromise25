import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Story from "@/components/Story";

function HomePage() {
	return (
		<div>
			<Header />
			<div className="flex flex-col  min-h-screen p-6">
				<Hero />
				<Story />
			</div>
		</div>
	);
}

export default HomePage;
