"use client";

import { useEffect, useState } from "react";
import { trpc } from "../_trpc/client";

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const [content, setContent] = useState("");

  useEffect(() => {
    async function getData() {
      const todosResponse = await fetch("/api/trpc/getTodos");
      const todos = await todosResponse.json();
    }
    getData();
  });

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl">Todos</h1>
      <div>
        {getTodos?.data?.map((todo) => (
          <div key={todo.id} className="flex gap-3 items-center">
            <input
              id={`check-${todo.id}`}
              type="checkbox"
              checked={!!todo.done}
              style={{ zoom: 1.5 }}
            />
            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
          </div>
        ))}
      </div>
      <div>
        <div className="text-2xl mb-2 mt-4">Add a todo</div>
        <div className="flex gap-3 items-center">
          <label htmlFor="content">Content: </label>
          <input
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-black border-2 h-[40px]"
          />
          <button
            onClick={async () => {
              if (content.length) {
                addTodo.mutate(content);
                setContent("");
              }
            }}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Add todo
          </button>
        </div>
      </div>
    </div>
  );
}
