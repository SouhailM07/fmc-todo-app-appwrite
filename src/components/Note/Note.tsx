"use client";
import "./note.css";
// appwrite
import { getAllNotes, deleteNote, updateNoteState } from "@/lib/CRUD_functions";
//
import myStore from "@/zustand/noteStore";
// assets
import Image from "next/image";

/*==============================================================================================*/
// main component section
/*==============================================================================================*/
export default function Note({ note, done, noteId }) {
  let updateNotes_f = myStore((state: any) => state.updateNotes);
  return (
    <>
      <li className="note dark:text-dark-theme-light-grayish-blue border-y px-[1rem] dark:border-dark-theme-dark-grayish-blue flex py-[0.6rem] text-[0.8rem] border-y-very-light-grayish-blue text-very-dark-grayish-blue bg-transparent items-center justify-between">
        <div
          onClick={async () => {
            // ! add a function to update the done state
            await updateNoteState(noteId, done);
            getAllNotes().then(async (res) => {
              await updateNotes_f(res);
            });
          }}
          className="items-center flex w-full"
        >
          <div
            className={`${
              done &&
              "bg-gradient-to-r from-check-background-start to-check-background-end"
            } border dark:border-dark-theme-dark-grayish-blue border-dark-grayish-blue h-[1rem] bg-no-repeat bg-center grid place-items-center w-[1rem] rounded-full`}
          >
            <Image
              src="icon-check.svg"
              alt="img"
              width={11}
              height={11}
              className={done ? "block" : "hidden"}
            />
          </div>
          <p className={`${done && "line-through"} indent-[1rem]`}>{note}</p>
        </div>
        <Image
          onClick={async () => {
            await deleteNote(noteId);
            getAllNotes().then(async (res) => {
              // console.log(res);
              await updateNotes_f(res);
            });
            console.log("check delete render");
          }}
          width={14}
          height={14}
          src="icon-cross.svg"
          role="button"
          alt="logo"
          aria-label="delete button"
        />
      </li>
    </>
  );
}

// ! handlers
