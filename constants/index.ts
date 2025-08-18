import {
	IconBook,
	IconCalendarEvent,
	IconGift,
	IconHeart,
	IconLayoutDashboard,
	IconLivePhoto,
	IconPhoto,
	IconSend,
	IconUsers,
} from "@tabler/icons-react";

export const overviewLinks = [
	{
		label: "Home",
		route: "/",
		icon: IconLayoutDashboard,
	},
	{
		label: "Our Story",
		route: "/our-story",
		icon: IconHeart,
	},
	{
		label: "Events",
		route: "/events",
		icon: IconCalendarEvent,
	},
	{
		label: "RSVP",
		route: "/rsvp",
		icon: IconSend,
	},
	{
		label: "Gallery",
		route: "/gallery",
		icon: IconPhoto,
	},
	{
		label: "Gift Registry",
		route: "/gift-registry",
		icon: IconGift,
	},
	{
		label: "Live Stream",
		route: "/live-stream",
		icon: IconLivePhoto,
	},
	{
		label: "GuestBook",
		route: "/guest-book",
		icon: IconBook,
	},
	{
		label: "Future Family",
		route: "/future-family",
		icon: IconUsers,
	},
];
