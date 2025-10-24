import { create } from "zustand";

// type of task
export type Task = { id: string; text: string; completed: boolean };

export type State = {
  tasks: Task[];
  loading: boolean;
  error?: string;
};
export type Actions = {
  setInitial: (tasks: Task[]) => void;
  fetchTasks: () => Promise<void>;
  addTask: (text: string) => Promise<void>;
  updateTask: (t: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
};

// backend address
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:3001";

export const useTasks = create<State & Actions>((set, get) => ({
  tasks: [],
  loading: false,
  error: undefined,

  setInitial: (tasks) => set({ tasks }),

  fetchTasks: async () => {
    set({ loading: true, error: undefined });
    try {
      const res = await fetch(`${API_BASE}/tasks`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      set({ tasks: (await res.json()) as Task[], loading: false });
    } catch (e: any) {
      set({ loading: false, error: e?.message ?? "fetch failed" });
    }
  },

  addTask: async (text) => {
    const body: Task = { id: crypto.randomUUID(), text, completed: false };
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("add failed");
    set({ tasks: [body, ...get().tasks] });
  },

  updateTask: async (t) => {
    const res = await fetch(`${API_BASE}/tasks/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });
    if (!res.ok) throw new Error("update failed");
    set({ tasks: get().tasks.map((x) => (x.id === t.id ? t : x)) });
  },

  deleteTask: async (id) => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("delete failed");
    set({ tasks: get().tasks.filter((x) => x.id !== id) });
  },

  toggleTask: async (id) => {
    const t = get().tasks.find((x) => x.id === id);
    if (!t) return;
    await get().updateTask({ ...t, completed: !t.completed });
  },
}));
