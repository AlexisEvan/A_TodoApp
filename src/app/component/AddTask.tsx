
"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

import { addTask } from "@/services/todoservices";
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
  const [value] = useState("");
  const onSubmit = async (data: FormValues) => {
    const id = uuidv4();
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await addTask(value);
        router.refresh();
      } catch {
        alert("Add failed");
      }
    };
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
