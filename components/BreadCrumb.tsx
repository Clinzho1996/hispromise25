import Image from "next/image";

function BreadCrumb({
	img,
	title,
	description,
}: {
	img: string;
	title: string;
	description: string;
}) {
	return (
		<div className="relative w-full h-52 rounded-lg overflow-hidden">
			<Image src={img} alt={title} fill className="object-cover" quality={80} />
			<div className="absolute inset-0 bg-black breadcrumb flex items-end p-6">
				<div className="bg-white backdrop-blur-2xl opacity-80 p-4 rounded-lg max-w-md">
					<h2 className="text-lg font-semibold text-gray-800">{title}</h2>
					<p className="text-sm text-gray-600">{description}</p>
				</div>
			</div>
		</div>
	);
}

export default BreadCrumb;
