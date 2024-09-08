import { defineAction } from "astro:actions";
import { db, eq, Todo } from "astro:db";
import { z } from 'astro:schema'

export const server = {
  toggleTodo: defineAction({
    
    accept: "form",
    input: z.object({
      id: z.number()
    }),
    handler: async ({ id }, context) => {
      const todo = await db.select().from(Todo).where(eq(Todo.id, id)).get();
      if (!todo) {
        throw new Error("Id not found.");
      }

      await db.update(Todo).set({
        completed: todo.completed ? null : new Date()
      })
      .where(
        eq(Todo.id, id)
      )
    }
  })
}