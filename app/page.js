'use client'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
export default function Page() {
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const response = await axios.post('http://localhost:3000/api/notes', formData, {
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is set to JSON
      },
    });

    console.log('Received response:', response.data); 
  };

  return (
    <div className="bg-black text-white h-screen w-full flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
        <Input
          name="title"
          placeholder="Title"
          className="w-48"
          value={formData.title}
          onChange={handleChange}
        />
        <Textarea
          name="content"
          placeholder="Content"
          className="w-96"
          value={formData.content}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>

      
    </div>
  );
}
