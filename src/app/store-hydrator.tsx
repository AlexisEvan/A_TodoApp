// src/app/store-hydrator.tsx
"use client";

import { useEffect } from "react";
import { useTasks, type Task } from "../store/userTasks";
import AddTask from "./component/AddTask";
import TodoList from "./component/TodoList";

export default function StoreHydrator({ tasks }: { tasks: Task[] }) {
  const setInitial = useTasks(s => s.setInitial);

  useEffect(() => {
    setInitial(tasks);          
  }, [tasks, setInitial]);

  return (
    <main className="w-full px-4 md:px-8">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo list App</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks}/>
    </main>
  );
}
