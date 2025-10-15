// src/app/component/Task.tsx
"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Modal, { type ModalHandle } from "./Modal";
import { FaRegEdit } from "react-icons/fa"; 
import { FaTrashAlt } from "react-icons/fa";
import { ITask } from "../../../types/tasks";

const API_BASE = "http://localhost:3001";

export default function TaskRow({ task }: { task: ITask }) {
  const router = useRouter();

  const editRef = useRef<ModalHandle>(null);
  const delRef  = useRef<ModalHandle>(null);

  const [value, setValue] = useState(task.text);

  async function saveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
    });
    if (!res.ok) return alert("Update failed");
    editRef.current?.close();
    router.refresh();
  }

  async function confirmDelete() {
    const res = await fetch(`${API_BASE}/tasks/${task.id}`, { method: "DELETE" });
    if (!res.ok) return alert("Delete failed");
    delRef.current?.close();
    router.refresh();
  }

  return (
    <tr>
      <td className="w-full">{task.text}</td>
      <td className="flex items-center gap-4">
        <button className="text-blue-500" onClick={() => editRef.current?.open()}>
          <FaRegEdit size={22} />
        </button>
        <button className="text-red-500" onClick={() => delRef.current?.open()}>
          <FaTrashAlt size={22} />
        </button>
      </td>

      {/* 编辑弹窗 */}
      <Modal ref={editRef} title="Edit task">
        <form onSubmit={saveEdit}>
          <input
            className="input input-bordered w-full my-4"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn" onClick={() => editRef.current?.close()}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* 删除确认弹窗 */}
      <Modal ref={delRef} title="Delete task?">
        <p className="py-4">Are you sure you want to delete “{task.text}”?</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={confirmDelete}>Delete</button>
          <button className="btn" onClick={() => delRef.current?.close()}>Cancel</button>
        </div>
      </Modal>
    </tr>
  );
}
