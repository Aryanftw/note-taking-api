import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Note from "@/models/Note";

export async function GET() {
  try {
    await connectDB()
    const notes = await Note.find()
    return NextResponse.json(notes, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Error fetching notes" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const {title,content} = await req.json()
    console.log('Received data:', { title, content });

    if(!title || !content){
      return NextResponse.json({message:"Title or content missing"},{status:500})
    }

    await connectDB()
    const newNote = new Note({title,content})
    await newNote.save()

    return NextResponse.json(newNote,{status:200})
  } catch (error) {
    console.log(error)
     return NextResponse.json({message:"Error in creating a new note"},{status:500})
  }
}