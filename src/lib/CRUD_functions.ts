import { db, account } from "@/appwrite";
import { Query, ID } from "appwrite";
// zustand
import myStore from "@/zustand/noteStore";

export async function getAllNotes() {
  try {
    let allNotes = await db.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("email", [(await account.get()).email])]
    );
    return allNotes.documents[0].notes.reverse();
  } catch (error) {
    console.log(error);
  }
}

export async function createNote(note) {
  try {
    let userCollection = await db.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [
        Query.equal("email", [(await account.get()).email]),
        Query.select(["$id"]),
      ]
    );
    await db.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!,
      ID.unique(),
      {
        note: note,
        done: false,
        // user: "65c92e72d190afad1d51",
        user: userCollection.documents[0].$id,
      }
    );
    console.log(userCollection.documents[0].$id);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNote(noteId) {
  await db.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!,
    noteId
  );
}

export async function updateNoteState(noteId, noteState) {
  await db.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!,
    noteId,
    {
      done: !noteState,
    }
  );
}
