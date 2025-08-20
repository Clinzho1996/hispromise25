// lib/appwrite.ts
import { Client, Databases, Query } from "appwrite";

const client = new Client();

client
	.setEndpoint("https://fra.cloud.appwrite.io/v1") // Your Appwrite endpoint
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

export const databases = new Databases(client);
export { Query };
