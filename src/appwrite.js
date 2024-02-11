import { Client, Account, Databases } from "appwrite";

let client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT_URL)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

export const account = new Account(client);
export const db = new Databases(client);
