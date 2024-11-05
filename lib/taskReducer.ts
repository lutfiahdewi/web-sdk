// taskReducer.ts
export type Task = {
  id: number
  text: string
}

// Define action types
type TaskAction =
  | { type: "ADD_TASK"; payload: string }
  | { type: "REMOVE_TASK"; payload: number }

// Reducer function
export const tasksReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: state.length + 1, text: action.payload }]
    case "REMOVE_TASK":
      return state.filter(task => task.id !== action.payload)
    default:
      throw Error("Unknown action: " + action.type)
  }
}
