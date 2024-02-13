"use client";
import "./infopanel.css";
import myStore from "@/zustand/noteStore";
export default function InfoPanel() {
  let myNotes = myStore((state: any) => state.notes);
  return (
    <>
      <section className="flex  py-[0.6rem] justify-between px-[1rem] text-[0.7rem]">
        <p>{myNotes?.filter((e) => !e.done).length} items left</p>
        <ul className="flex space-x-[1rem]">
          <li>All</li>
          <li>Active</li>
          <li>Completed</li>
        </ul>
        <button>Clear Completed</button>
      </section>
    </>
  );
}
