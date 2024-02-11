"use client";
import axios from "axios";
import { useState } from "react";
import "./input.css";
// shadcn
export default function MyInput() {
  let [createdNote, setCreatedNote] = useState<string>("");
  return (
    <>
      <div className="dark:bg-very-dark-desaturated-blue flex rounded-sm items-center text-[0.9rem] bg-very-light-gray text-very-dark-grayish-blue px-[1rem]">
        <div className="border dark:border-dark-theme-dark-grayish-blue border-dark-grayish-blue h-[1rem] w-[1rem] rounded-full"></div>
        <form
          className=" w-full "
          onSubmit={async (e) => {
            if (createdNote.length < 1) {
              e.preventDefault();
            }
            await axios.post("/api/notes", {
              note: createdNote,
            });
          }}
        >
          <input
            value={createdNote}
            onChange={(e) => setCreatedNote(e.target.value)}
            type="text"
            placeholder="Create a new todo..."
            className="!outline-none py-[0.6rem] indent-[1rem] bg-transparent w-full "
          />
        </form>
      </div>
    </>
  );
}
