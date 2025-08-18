import BreadCrumb from "@/components/BreadCrumb";
import Header from "@/components/Header";

function GiftRegistry() {
	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/registry.png"
					title="Gift Registry"
					description="A journey of love and commitment."
				/>
			</div>
		</div>
	);
}

export default GiftRegistry;
