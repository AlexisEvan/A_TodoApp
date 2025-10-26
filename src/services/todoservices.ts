// manage api call

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") || "http://localhost:3001";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) msg = data.message;
    } catch {}
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export async function getTasks(opts?: RequestInit): Promise<Task[]> {
  const res = await fetch(`${API_BASE}/tasks`, { cache: "no-store", ...opts });
  return handle<Task[]>(res);
}

export async function addTask(text: string) {
  const id = crypto.randomUUID();
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, text, completed: false }),
  });

  if (!res.ok) throw new Error("Add failed");
  return res.json();
}

export async function updateTask(
  id: string,
  patch: Partial<Pick<Task, "text" | "completed">>
): Promise<Task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  return handle<Task>(res);
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
  await handle(res);
}
