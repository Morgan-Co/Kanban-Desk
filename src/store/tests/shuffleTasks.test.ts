import { describe, expect, it } from 'vitest'
import tasksReducer, { shuffleTasks } from '../tasksSlice'

describe('tasksSlice', () => {
	it("should shuffle task items with 'shuffleTasks' action", () => {
		const action = {
			type: shuffleTasks.type,
			payload: { activeIndex: 0, overIndex: 1 },
		}
		const initialState = {
			tasks: [
				{
					id: 1,
					columnId: 1,
					initialContent: `Task 1`,
					content: `Task 1`,
					details: '',
				},
				{
					id: 2,
					columnId: 1,
					initialContent: `Task 2`,
					content: `Task 2`,
					details: '',
				},
			],
			track: { activeTasks: 0, finishedTasks: 0 },
		}

		const result = tasksReducer(initialState, action)
		expect(result).toEqual({
			tasks: [
				{
					id: 2,
					columnId: 1,
					initialContent: `Task 2`,
					content: `Task 2`,
					details: '',
				},
				{
					id: 1,
					columnId: 1,
					initialContent: `Task 1`,
					content: `Task 1`,
					details: '',
				},
			],
			track: { activeTasks: 0, finishedTasks: 0 },
		})
	})
})
