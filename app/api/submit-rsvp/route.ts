import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const response = await fetch(
			"https://script.google.com/macros/s/AKfycbz3PQYsQqaGKUyBny9l0vBzjX-fgJ7GQWTSZc-foAJfNWh1KiwD5KedBKoPigX-u9m5/exec",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			}
		);

		if (!response.ok) {
			throw new Error("Google Apps Script request failed");
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("RSVP submission error:", error);
		return NextResponse.json(
			{ error: "Failed to submit RSVP" },
			{ status: 500 }
		);
	}
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
	return NextResponse.json(
		{},
		{
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
			},
		}
	);
}
