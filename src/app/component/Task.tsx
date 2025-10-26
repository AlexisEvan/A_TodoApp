
"use client";
import { useState,FormEvent} from "react";
import { useRouter } from "next/navigation";
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

import { updateTask, deleteTask } from "@/services/todoservices";

const API_BASE = "http://localhost:3001";

export default function TaskRow({ task }: { task: ITask }) {
  const router = useRouter();

const [editOpen, setEditOpen] = useState(false);
const [delOpen,  setDelOpen]  = useState(false);

const [value, setValue] = useState(task.text);

  async function saveEdit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  try {
    await updateTask(task.id, {text:value});      
    setEditOpen(false);
    router.refresh();
  } catch {
    alert("Update failed");
  }
}

async function confirmDelete() {
  try {
    await deleteTask(task.id);           
    setDelOpen(false);
    router.refresh();
  } catch {
    alert("Delete failed");
  }
}

  return (
    <tr className="align-middle">
    {/* text */}
    <td className="p-4">{task.text}</td>

    {/* Actions */}
    <td className="p-4 pr-2">      
      <div className="flex items-center gap-2">
        {/* Edit */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">Edit</Button>
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
            <div>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
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
      </div>
      </td>
    </tr>
  );
}
