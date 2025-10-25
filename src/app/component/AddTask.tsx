
"use client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = "http://localhost:3001";

type FormValues = {
  text: string;
};

export default function AddTask() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const id = uuidv4();
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text: data.text, completed: false }),
    });
    if (!res.ok) {
      alert("Add failed");
      return;
    }
    reset(); // clean
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Add New Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Task title..."
            {...register("text", { required: true })}
          />
          <DialogFooter className="sm:justify-end gap-2">
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
