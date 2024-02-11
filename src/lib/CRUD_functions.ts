import { db, account } from "@/appwrite";
import { Query, ID } from "appwrite";

async function findUserId() {
  let userId = await account.get();
  return userId;
}

export async function createNote(note) {
  try {
    let userCollection = await db.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("email", [findUserId()["email"]]), Query.select(["$id"])]
    );
    console.log(userCollection);
    await db.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!,
      ID.unique(),
      {
        note: note,
        done: false,
        user: userCollection.documents[0].$id,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
