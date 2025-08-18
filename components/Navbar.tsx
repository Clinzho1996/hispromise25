import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

const Navbar = () => {
	return (
		<nav className="flex lg:hidden md:hidden lg:flex-col flex-row items-center justify-between border-b-[1px] border-b-[#E2E4E9] px-3 py-2">
			<Link href="/" className="flex flex-row justify-start items-center gap-1">
				<Image
					src="/images/logo.png"
					alt="Medbankr Logo"
					width={40}
					height={40}
					className="justify-center h-full flex object-contain"
				/>
				<p className="text-lg font-semibold">#HisPromise25</p>
			</Link>
			{/* clerk user management */}

			<MobileNav />
		</nav>
	);
};

export default Navbar;
