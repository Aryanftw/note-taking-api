import connectDB from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export default async function GET(req, params) {
  try {
     const {id} = params

     await connectDB()
     const note = await Note.findbyId(id)

     if(!note){
        return NextResponse.json({message:"Note not found"},{status:404})
     }

     return NextResponse.json(note,{status:200})
  } catch (error) {
    return NextResponse.json({message:"Error in getting note by id"},{status:501})
  }
}


export default async function DELETE(req,params){
  try {
    const {id} = params

    await connectDB()

    const deletedNote = await Note.findbyIdAndDelete(id)

    if(!deletedNote) return NextResponse.json({message : "Note not found"},{status : 404})

    return NextResponse.json({message:"Note deleted"},{status:200})
  } catch (error) {
    return NextResponse.json({message:"Error in deleting Note"},{status:501})
  }
}