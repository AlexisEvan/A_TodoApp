"use client";
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type ModalHandle = { open: () => void; close: () => void };
type ModalProps = { title?: string; children?: React.ReactNode };

const Modal = forwardRef<ModalHandle, ModalProps>(({ title, children }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }), []);

  const node = (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {title && <h3 className="font-bold text-lg">{title}</h3>}
        {children}
      </div>
    </dialog>
  );


  if (!mounted) return null;

 
  return createPortal(node, document.body);
});

Modal.displayName = "Modal";
export default Modal;
