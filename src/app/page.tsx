import { getAllTodos } from "../../api"
import AddTask from "./component/AddTask"
import TodoList
 from "./component/TodoList"
export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);
  return (
   <main className="max-w-4xl mx-auto">
    <div className="text-center my-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Todo list App</h1>    
      <AddTask />   
    </div>
    <TodoList tasks = {tasks}/>
  
   </main>
  )
}
