import { describe, expect, it } from 'vitest'
import tasksReducer, { updateDetails } from '../tasksSlice'

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
	it("should edit task item with 'updateDetails' action", () => {
		const action = {
			type: updateDetails.type,
			payload: { id: 1, details: 'Some Details' },
		}
		const result = tasksReducer(state, action)
		const updatedState = {
			tasks: [
				{
					id: 1,
					columnId: 1,
					initialContent: `Task 1`,
					content: `Task 1`,
					details: 'Some Details',
				},
			],
			track: { activeTasks: 0, finishedTasks: 0 },
		}
		expect(result).toEqual(updatedState)
	})
})
