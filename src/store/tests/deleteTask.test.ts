import { describe, expect, it } from 'vitest'
import tasksReducer, { deleteTask } from '../tasksSlice.ts'

const tasks = [
	{
		id: 1,
		columnId: 1,
		initialContent: `Task 1`,
		content: `Task 1`,
		details: '',
	},
]

const state = {
	tasks,
	track: {
		activeTasks: 0,
		finishedTasks: 0,
	},
}

describe('tasksSlice', () => {
	it("should delete task item with 'deleteTask' action", () => {
		const action = { type: deleteTask.type, payload: 1 }

		const result = tasksReducer(state, action)
		expect(result).toEqual({
			tasks: [],
			track: {
				activeTasks: 0,
				finishedTasks: 0,
			},
		})
	})})