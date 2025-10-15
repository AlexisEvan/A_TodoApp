import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:3001/tasks";

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(baseUrl, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return (await res.json()) as ITask[];
};
