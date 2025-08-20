import BreadCrumb from "@/components/BreadCrumb";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";

function GalleryPage() {
	return (
		<div>
			<Header />

			<div className="p-4 border rounded-lg border-[#EDE6E2] w-[96%] mx-auto mt-0 sm:mt-4">
				<BreadCrumb
					img="/images/gallery.png"
					title="Our Photobook"
					description="A collection of our cherished memories."
				/>

				<Gallery />
			</div>
		</div>
	);
}

export default GalleryPage;
