
"use client";
import { useRef, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const API_BASE = "http://localhost:3001";
const id = uuidv4();
export default function AddTask() {
 
  const formRef = useRef<HTMLFormElement>(null);      
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = formRef.current;                      
    if (!form) return;

    const text = (new FormData(form).get("text") as string)?.trim();
    if (!text) return;

    const id = uuidv4();

    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text, completed: false }),
    });
    if (!res.ok) { alert("Add failed"); return; }

    form.reset();                                      
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* remove btn */}
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setOpen(true)}>
          Add New Task
        </Button>
      </DialogTrigger>

      {/* pop up window */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* input box */}
          <Input
            name="text"
            placeholder="Task title..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          
          {/* cancel */}
          <DialogFooter className="sm:justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
