import { describe, expect, it } from 'vitest'
import tasksReducer, { updateTask } from '../tasksSlice'

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
	it("should edit task details with 'updateTask' action", () => {
		const action = {
			type: updateTask.type,
			payload: { id: 1, content: 'New Content' },
		}
		const result = tasksReducer(state, action)
		const updatedState = {
			tasks: [
				{
					id: 1,
					columnId: 1,
					initialContent: `Task 1`,
					content: `New Content`,
					details: '',
				},
			],
			track: {
				activeTasks: 0,
				finishedTasks: 0,
			},
		}
		expect(result).toEqual(updatedState)
	})
})
