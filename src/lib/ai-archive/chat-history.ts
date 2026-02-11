import type { UIMessage } from "ai";

const DB_NAME = "acheng-ai-archive";
const DB_VERSION = 1;
const STORE_NAME = "dish-chat-history";

interface ChatHistoryRecord {
  dishSlug: string;
  messages: UIMessage[];
  updatedAt: number;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available in this environment."));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "dishSlug" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Failed to open IndexedDB."));
  });
}

export async function loadDishChatHistory(
  dishSlug: string
): Promise<UIMessage[] | null> {
  try {
    const db = await openDatabase();
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(dishSlug);

      request.onsuccess = () => {
        const record = request.result as ChatHistoryRecord | undefined;
        resolve(record?.messages ?? null);
      };
      request.onerror = () =>
        reject(request.error ?? new Error("Failed to read chat history."));
      transaction.oncomplete = () => db.close();
      transaction.onabort = () => db.close();
      transaction.onerror = () => db.close();
    });
  } catch {
    return null;
  }
}

export async function saveDishChatHistory(
  dishSlug: string,
  messages: UIMessage[]
): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const payload: ChatHistoryRecord = {
        dishSlug,
        messages,
        updatedAt: Date.now(),
      };

      store.put(payload);
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error ?? new Error("Failed to save chat history."));
      };
      transaction.onabort = () => {
        db.close();
        reject(new Error("Saving chat history was aborted."));
      };
    });
  } catch {
    // Fallback to no-op: chat still works even if persistence is unavailable.
  }
}

export async function clearDishChatHistory(dishSlug: string): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.delete(dishSlug);

      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error ?? new Error("Failed to clear chat history."));
      };
      transaction.onabort = () => {
        db.close();
        reject(new Error("Clearing chat history was aborted."));
      };
    });
  } catch {
    // no-op fallback
  }
}
