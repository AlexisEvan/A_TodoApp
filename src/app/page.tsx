import { getAllTodos } from "../../api"
import StoreHydrator from "./store-hydrator";
import type { Task } from "../store/userTasks";

export default async function Home() {
  const tasks = (await getAllTodos()) as Task[]; 
  return <StoreHydrator tasks={tasks} />;   
}
