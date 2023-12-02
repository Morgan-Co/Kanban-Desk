import { describe, expect, it } from 'vitest'
import tasksReducer, { trackActiveTasks } from '../tasksSlice'

describe('tasksSlice', () => {
	it("should tracking active tasks with 'trackActiveTasks' action", () => {
		const action = { type: trackActiveTasks.type }
		const tasks = [
			{
				id: 1,
				columnId: 3,
				initialContent: `Task 1`,
				content: `Task 1`,
				details: '',
			},
		]
		const result = tasksReducer(
			{
				tasks,
				track: { activeTasks: 0, finishedTasks: 0 },
			},
			action
		)
		expect(result.track.activeTasks).toEqual(1)
	})
})
