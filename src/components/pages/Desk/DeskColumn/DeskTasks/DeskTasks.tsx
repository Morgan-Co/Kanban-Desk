import { useMemo } from 'react'
import DeskTask from './DeskTask/DeskTask'
import { Column } from '../../../../../types/types'
import { useAppSelector } from '../../../../../hooks/hook'
import { SortableContext } from '@dnd-kit/sortable'

const DeskTasks = ({ col }: { col: Column }) => {
	const tasks = useAppSelector(state => state.tasks.tasks)
	const tasksId = useMemo(() => {
		return tasks.map(task => task.id)
	}, [tasks])


	return (
		<div 
		className='
		flex
		flex-auto
		flex-col
		gap-y-[15px]
		mb-[20px]
		p-[2px]
		overflow-x-hidden
		overflow-y-auto
		scroll-style'
		>
			<SortableContext items={tasksId}>
				{tasks
					.filter(task => task.columnId === col.id)
					.map(task => (
						<DeskTask key={task.id} task={task} />
					))}
			</SortableContext>

		</div>
		
	)
}

export default DeskTasks
