import { databases, Query } from "@/lib/appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const response = await databases.listDocuments(
			"68a5e939001882ddb1bb",
			"68a5e951003bfe33155e",
			[Query.limit(100), Query.orderAsc("$createdAt")]
		);

		return NextResponse.json(response.documents);
	} catch (error) {
		console.error("Error fetching gift items:", error);
		return NextResponse.json(
			{ error: "Failed to fetch gift items" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { documentId, pledged } = body;

		const response = await databases.updateDocument(
			"68a5e939001882ddb1bb",
			"68a5e951003bfe33155e",
			documentId,
			{ pledged }
		);

		return NextResponse.json(response);
	} catch (error) {
		console.error("Error updating pledge:", error);
		return NextResponse.json(
			{ error: "Failed to update pledge" },
			{ status: 500 }
		);
	}
}
