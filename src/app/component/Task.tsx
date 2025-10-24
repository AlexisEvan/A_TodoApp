// src/app/component/Task.tsx
"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa"; 
import { FaTrashAlt } from "react-icons/fa";
import { ITask } from "../../../types/tasks";

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

import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogFooter,
  AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";

const API_BASE = "http://localhost:3001";

export default function TaskRow({ task }: { task: ITask }) {
  const router = useRouter();

const [editOpen, setEditOpen] = useState(false);
const [delOpen,  setDelOpen]  = useState(false);


  const [value, setValue] = useState(task.text);

  async function saveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
    });
    if (!res.ok) return alert("Update failed");
    setEditOpen(false);
    router.refresh();
  }

  async function confirmDelete() {
    const res = await fetch(`${API_BASE}/tasks/${task.id}`, { method: "DELETE" });
    if (!res.ok) return alert("Delete failed");
    setDelOpen(false);
    router.refresh();
  }

  return (
    <tr>
      <td className="w-full">{task.text}</td>
      <td className="flex items-center gap-4"></td>

      {/* edit */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline" size="sm">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>

          <form onSubmit={saveEdit} className="space-y-4">
            <Input
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


      {/* delete  */}
      <AlertDialog open={delOpen} onOpenChange={setDelOpen}>
        <AlertDialogTrigger asChild>
          <Button className="w-full" variant="destructive" size="sm">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </tr>
  );
}
