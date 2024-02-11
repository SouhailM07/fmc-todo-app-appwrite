"use client";
// appwrite
import { Query, ID } from "appwrite";
import { account, db } from "@/appwrite";
import { useEffect, useState } from "react";
import { createNote } from "@/lib/CRUD_functions";
// components
import { MyContainer } from "@/components";
export default function Todo_home() {
  let [userId, setUserId]: any = useState<string>("");
  let test = async () => {
    let userOd: any = await account.get().then((res) => {
      return res;
    });
    let userCollection = await db.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("email", [userOd["email"]]), Query.select(["$id"])]
    );
    console.log(userCollection);
    await db.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!,
      ID.unique(),
      {
        note: "testing 20",
        done: false,
        user: userCollection.documents[0].$id,
      }
    );
  };
  useEffect(() => {
    test();
    console.log("render");
  }, []);
  return (
    <>
      <div>{userId}</div>
      <MyContainer />
    </>
  );
}
