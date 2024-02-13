"use client";
import "./input.css";
// appwrite
import { getAllNotes } from "@/lib/CRUD_functions";
import { createNote } from "@/lib/CRUD_functions";
// hooks
import { useEffect, useState } from "react";
// zustand
import myStore from "@/zustand/noteStore";

export default function MyInput() {
  let [inputNote, setInputNote] = useState<string>("");
  let updateNotes_f = myStore((state: any) => state.updateNotes);
  useEffect(() => {
    console.log("render from input");
  }, []);
  return (
    <>
      <div className="dark:bg-very-dark-desaturated-blue flex rounded-sm items-center text-[0.9rem] bg-very-light-gray text-very-dark-grayish-blue px-[1rem]">
        <div className="border dark:border-dark-theme-dark-grayish-blue border-dark-grayish-blue h-[1rem] w-[1rem] rounded-full"></div>
        <form
          className="w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            if (inputNote.length > 1) {
              await createNote(inputNote);
              await getAllNotes().then((res) => updateNotes_f(res));
              setInputNote("");
            }
          }}
        >
          <input
            value={inputNote}
            onChange={(e) => setInputNote(e.target.value)}
            type="text"
            placeholder="Create a new todo..."
            className="!outline-none py-[0.6rem] indent-[1rem] bg-transparent w-full "
          />
        </form>
      </div>
    </>
  );
}
