"use client";
import "./infopanel.css";
import useSWR from "swr";
import axios from "axios";

export default function InfoPanel() {
  // @ts-ignore
  let fetcher = (...args) => axios.get(...args);
  let { data } = useSWR("/api/notes", fetcher);
  return (
    <>
      <section className="flex  py-[0.6rem] justify-between px-[1rem] text-[0.7rem]">
        <p>{data?.data.notes.filter((e) => !e.done).length} items left</p>
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
