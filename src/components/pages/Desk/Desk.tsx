import DeskColumn from './DeskColumn/DeskColumn'
import { columns } from '../../../data/KanbanData'
import {
	DndContext,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { useState } from 'react'
import {
	shuffleTasks,
	shuffleColumnTasks,
	shuffleEmpty,
} from '../../../store/tasksSlice'
import { createPortal } from 'react-dom'
import DeskTask from './DeskColumn/DeskTasks/DeskTask/DeskTask'
import { useAppDispatch, useAppSelector } from '../../../hooks/hook'
import { Task } from '../../../types/types'

const Desk = () => {
	const tasks = useAppSelector(state => state.tasks.tasks)
	const [activeTask, setActiveTask] = useState<Task | null>(null)
	const dispatch = useAppDispatch()
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3,
			},
		})
	)
	function handleDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === 'Task') {
			setActiveTask(event.active.data.current.task)
			return
		}
	}
	function handleDragOver(event: DragOverEvent) {
		const { active, over } = event
		if (!over) return

		const activeId = active.id
		const overId = over.id
		

		if (activeId === overId) return

		const isActiveATask = active.data.current?.type === 'Task'
		const isOverATask = over.data.current?.type === 'Task'

		if (!isActiveATask) return
		if (isActiveATask && isOverATask) {
			const activeIndex = tasks.findIndex(t => t.id === activeId)
			const overIndex = tasks.findIndex(t => t.id === overId)

			if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
				dispatch(
					shuffleColumnTasks({ activeIndex, overIndex })
				)
			}
			dispatch(shuffleTasks({ activeIndex, overIndex }))
		}
		const isOverAColumn = over.data.current?.type === 'Column'
		if (isActiveATask && isOverAColumn) {
			const activeIndex = tasks.findIndex(t => t.id === activeId)
			dispatch(
				shuffleEmpty({ oldIndex: activeIndex, newIndex: activeIndex, overId })
			)
		}
	}

	return (
		<div
			className='
			flex-1
			bg-blue
			font-roboto
			flex
			justify-center
			p-[20px]'
		>
			<div
				className='
				flex
				flex-wrap
				justify-center
				w-[1235px]
				gap-[24px]'
			>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
				>
					{columns.map(col => (
						<DeskColumn key={col.id} col={col} />
					))}
					{createPortal(
						<DragOverlay>
							{activeTask && <DeskTask task={activeTask} />}
						</DragOverlay>,
						document.body
					)}
				</DndContext>
			</div>
		</div>
	)
}

export default Desk
