import { Query, ID } from "appwrite";
import { account, db } from "@/appwrite";

export async function createNewUser(user: any) {
  // check if user exist
  const { total } = await db.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
    [Query.equal("email", [user.email])]
  );
  if (total > 0) {
    return "user exist";
  } else {
    // ! creating user document in db for checking later
    await db.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      ID.unique(),
      {
        name: user.name,
        email: user.email,
        // notes: null,
      }
    );
    // ! creating user document in db for checking later
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    // ! create session
    await account.createEmailSession(user.email, user.password);
    // todo[ guard ]
    console.log(newAccount);
  }
}

export async function userLogin(user) {
  try {
    // check if user exist
    const userExist = await db.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION_ID!,
      [Query.equal("email", [user.email])]
    );
    if (userExist.total < 0) {
      return "user does not exist";
    } else {
      let loggedUser: any = await account
        .createEmailSession(user.email, user.password)
        .then(() => {
          return "access";
        });
      return loggedUser;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  await account.deleteSession("current");
}
