import { describe, expect, it } from 'vitest'
import tasksReducer from '../tasksSlice.ts'

describe('tasksSlice', () => {
	it('should return default state when passed an empty action', () => {
		const result = tasksReducer(undefined, { type: '' })
		expect(result).toEqual({
			tasks: [],
			track: {
				activeTasks: 0,
				finishedTasks: 0,
			},
		})
	})
})
