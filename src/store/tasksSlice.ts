import { arrayMove } from '@dnd-kit/sortable'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Task = {
	id: number
	columnId: number
	initialContent: string
	content: string
	details: string
}

type TasksState = {
	tasks: Task[]
	track: {
		activeTasks: number
		finishedTasks: number
	}
}

const initialState: TasksState = {
	tasks: [],
	track: {
		activeTasks: 0,
		finishedTasks: 0,
	},
}

type UpdateDetails = {
	id: number
	details: string
}

type UpdateTask = {
	id: number
	content: string
}

type ShuffleTask = {
	oldIndex:number
	newIndex: number
}

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTasks(state, action: PayloadAction<number>) {
			state.tasks.push({
				id: Math.floor(Math.random() * 1000),
				columnId: action.payload,
				initialContent: `Task ${state.tasks.length + 1}`,
				content: `Task ${state.tasks.length + 1}`,
				details: '',
			})
		},
		deleteTask(state, action: PayloadAction<number>) {
			state.tasks = state.tasks.filter(task => task.id !== action.payload)
		},
		updateTask(state, action: PayloadAction<UpdateTask>) {
			state.tasks = state.tasks.map(task => {
				if (task.id !== action.payload.id) return task
				return { ...task, content: action.payload.content }
			})
		},
		updateDetails(state, action: PayloadAction<UpdateDetails>) {
			state.tasks = state.tasks.map(task => {
				if (task.id !== action.payload.id) return task
				return { ...task, details: action.payload.details }
			})
		},
		trackActiveTasks(state) {
			state.track.activeTasks = state.tasks.filter(
				task => task.columnId === 3
			).length
		},
		trackFinishedTasks(state) {
			state.track.finishedTasks = state.tasks.filter(
				task => task.columnId === 4
			).length
		},
		shuffleTasks(state, action: PayloadAction<ShuffleTask>) {
			const { oldIndex, newIndex } = action.payload
			state.tasks = arrayMove(state.tasks, oldIndex, newIndex)
		},
	},
})

export const {
	addTasks,
	deleteTask,
	updateTask,
	updateDetails,
	trackActiveTasks,
	trackFinishedTasks,
	shuffleTasks,
} = tasksSlice.actions

export default tasksSlice.reducer
