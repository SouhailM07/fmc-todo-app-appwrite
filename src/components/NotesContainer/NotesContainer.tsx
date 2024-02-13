"use client";
import "./notescontainer.css";
// appwrite
import { getAllNotes } from "@/lib/CRUD_functions";
// shadcn-ui
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
// components
import { InfoPanel, Note } from "@/components";
// ! zustand
//
import myStore from "@/zustand/noteStore";
import { useEffect, useState } from "react";

export default function NotesContainer() {
  // ! the todo notes
  let myNotes = myStore((state: any) => state.notes);
  let updateNotes_f = myStore((state: any) => state.updateNotes);
  //
  let [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllNotes().then(async (res) => {
      // console.log(res);
      await updateNotes_f(res);
      await setIsLoading(false);
    });
    console.log("rendering");
  }, []);
  return (
    <>
      <article className="w-full dark:bg-very-dark-desaturated-blue bg-very-light-gray rounded-sm ">
        <section>
          <ScrollArea className="h-[10rem] rounded-sm">
            <ul className="min-h-[8rem] ">
              {isLoading ? (
                <Skeleton className="w-full h-full grid place-items-center">
                  <p>loading</p>
                </Skeleton>
              ) : (
                myNotes?.map((e, i) => {
                  return (
                    <Note
                      key={i}
                      note={e.note}
                      done={e.done}
                      noteId={e["$id"]}
                    />
                  );
                })
              )}
            </ul>
          </ScrollArea>
        </section>
        <InfoPanel />
      </article>
    </>
  );
}
