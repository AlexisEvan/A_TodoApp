
"use client";
import { useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Modal, { type ModalHandle } from "./Modal";
import { v4 as uuidv4 } from "uuid";

const API_BASE = "http://localhost:3001";
const id = uuidv4();
export default function AddTask() {
  const modalRef = useRef<ModalHandle>(null);
  const formRef = useRef<HTMLFormElement>(null);      
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = formRef.current;                      
    if (!form) return;

    const text = (new FormData(form).get("text") as string)?.trim();
    if (!text) return;

    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text, completed: false }),
    });
    if (!res.ok) { alert("Add failed"); return; }

    form.reset();                                      
    modalRef.current?.close();
    router.refresh();
  }

  return (
    <>
      
      <button className="btn btn-primary w-full" onClick={() => modalRef.current?.open()}>
        Add New Task
      </button>

      
      <Modal ref={modalRef} title="Add task">
        <form ref={formRef} onSubmit={handleSubmit}>  
          <input name="text" className="input input-bordered w-full my-4" required />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Add</button>
            <button type="button" className="btn" onClick={() => modalRef.current?.close()}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
