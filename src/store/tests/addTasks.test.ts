import { describe, expect, it } from 'vitest'
import tasksReducer, { addTasks } from '../tasksSlice.ts'

describe('tasksSlice', () => {
	it("should add new task item with 'newTasks' action", () => {
		const action = { type: addTasks.type, payload: 1 }
		const tasks = {
			tasks: [],
			track: {
				activeTasks: 0,
				finishedTasks: 0,
			},
		}
		const result = tasksReducer(tasks, action)

		expect(result.tasks[0].columnId).toBe(1)
	})
})
