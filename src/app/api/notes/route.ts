import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Todo from "@/models/todoModel";

connectDB();

export async function GET() {
  let notes_data = await Todo.find({});
  return NextResponse.json({ notes: notes_data }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const { note } = await request.json();
    // search point
    let isNoteExist = await Todo.findOne({ note });
    if (isNoteExist) {
      return NextResponse.json(
        { message: "the note is already exist" },
        { status: 409 }
      );
    }
    let newNote = new Todo({ note });
    await newNote.save();
    return NextResponse.json(
      { message: "new note was added" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id"); // query param /api/cars?id=
    const editedNote = await Todo.findById(id);
    // Toggle the value of 'done'
    editedNote.done = !editedNote.done;
    await editedNote.save();

    return NextResponse.json(
      { message: `Note updated successfully`, note: editedNote },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  let id = request.nextUrl.searchParams.get("id"); // query param /api/cars?id=
  await Todo.findByIdAndDelete(id);
  return NextResponse.json(
    { message: `the note was deleted successfully` },
    { status: 201 }
  );
}
