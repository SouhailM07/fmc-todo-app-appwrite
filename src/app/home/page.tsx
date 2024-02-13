"use client";
import { useEffect, useState } from "react";
// appwrite
import { logout } from "@/lib/api";
import { account } from "@/appwrite";
import { useRouter } from "next/navigation";
// components
import { MyContainer } from "@/components";

export default function Todo_home() {
  let router = useRouter();
  let [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    // ! safe guard to check if user is logged In
    let checkLogin = async () => {
      await account
        .get()
        .then(() => {
          setLoggedIn(true);
        })
        .catch(() => {
          router.replace("/");
        });
    };
    checkLogin();
    // console.log("check render from home");
  }, []);
  return (
    <>
      {loggedIn && (
        <>
          <MyContainer />
          <LogoutLogo router={() => router.push("/")} />
        </>
      )}
    </>
  );
}

let LogoutLogo = ({ router }) => {
  return (
    <svg
      className="fixed bottom-10 right-10 h-[2.5rem] w-[2.5rem] dark:bg-white fill-white bg-very-dark-desaturated-blue dark:fill-very-dark-desaturated-blue rounded-full p-2 cursor-pointer"
      onClick={async () => {
        await logout();
        router();
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
    </svg>
  );
};
