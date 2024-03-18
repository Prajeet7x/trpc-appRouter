"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation();

  const [content, setContent] = useState("");
  return (
    <div>
      <div>{JSON.stringify(getTodos.data)}</div>
      <div>
        <label htmlFor="content">Content: </label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-black"
        />
        <button
          onClick={async () => {
            if (content.length) {
              addTodo.mutate(content);
              setContent("");
            }
          }}
        >
          Add todo
        </button>
      </div>
    </div>
  );
}
