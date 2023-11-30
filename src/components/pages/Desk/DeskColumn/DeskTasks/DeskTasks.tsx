import { useMemo, useState } from 'react'
import DeskTask from './DeskTask/DeskTask'
import { Column, Task } from '../../../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hook'
import { createPortal } from 'react-dom'

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	DragStartEvent,
	DragOverlay,
} from '@dnd-kit/core'
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { shuffleTasks } from '../../../../../store/tasksSlice'

const DeskTasks = ({ col }: { col: Column }) => {
	const tasks = useAppSelector(state => state.tasks.tasks)
	const dispatch = useAppDispatch()
	const [activeTask, setActiveTask] = useState<Task | null>(null)
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)
	const tasksId = useMemo(() => {
		return tasks.map(task => task.id)
	}, [tasks])
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (over && active.id !== over.id) {
			const oldIndex = tasks.findIndex(task => task.id === active.id)
			const newIndex = tasks.findIndex(task => task.id === over.id)
			dispatch(shuffleTasks({ oldIndex, newIndex }))
		}
	}
	function handleDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === 'Task') {
			setActiveTask(event.active.data.current.task)
			return
		}
	}



	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			// onDragOver={handleDragOver}
		>
			<SortableContext items={tasksId} strategy={verticalListSortingStrategy}>
				{tasks
					.filter(task => task.columnId === col.id)
					.map(task => (
						<DeskTask key={task.id} task={task} toggleEditMode={true} />
					))}
			</SortableContext>
			{createPortal(
				<DragOverlay>
					{activeTask && <DeskTask task={activeTask} toggleEditMode={false} />}
				</DragOverlay>,
				document.body
			)}
		</DndContext>
	)
}

export default DeskTasks
