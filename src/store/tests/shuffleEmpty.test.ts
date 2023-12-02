import { describe, expect, it } from 'vitest'
import tasksReducer, { shuffleEmpty } from '../tasksSlice'

describe('tasksSlice', () => {
	it("should shuffle tasks by empty columns with 'shuffleEmpty' action", () => {
		const action = {
			type: shuffleEmpty.type,
			payload: { oldIndex: 0, newIndex: 0, overId: 2 },
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
			],
			track: { activeTasks: 0, finishedTasks: 0 },
		}
		const result = tasksReducer(initialState, action)
		console.log(result)
		expect(result).toEqual({
			tasks: [
				{
					id: 1,
					columnId: 2,
					initialContent: `Task 1`,
					content: `Task 1`,
					details: '',
				},
			],
			track: { activeTasks: 0, finishedTasks: 0 },
		})
	})
})
