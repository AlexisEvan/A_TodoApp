import React from 'react'
import { ITask } from '../../../types/tasks'
import Task from './Task'

interface TodoListProps{
    tasks:ITask[]
}

const TodoList:React.FC<TodoListProps> = ({tasks}) => {
  return (
    <div className="overflow-x-auto">
    <table className="w-full table-fixed">
      <colgroup>
        <col />                 
        <col className="w-72" />
      </colgroup>
    {/* head */}
    <thead>
      <tr>
        <th className='text-left'>Tasks</th>
        <th className='text-right'>Actions</th>
      </tr>
    </thead>
    <tbody>
    {tasks.map((task) =>(
        <Task key={task.id} task={task} />
    ))}
</tbody>
  </table>
</div>
  )
}

export default TodoList