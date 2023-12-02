import { describe, expect, it } from 'vitest'
import tasksReducer, { trackFinishedTasks } from '../tasksSlice'

describe('tasksSlice', () => {
	it("should tracking active tasks with 'trackFinishedTasks' action", () => {
		const action = { type: trackFinishedTasks.type }
		const tasks = [
			{
				id: 1,
				columnId: 4,
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

		expect(result.track.finishedTasks).toEqual(1)
	})
})
