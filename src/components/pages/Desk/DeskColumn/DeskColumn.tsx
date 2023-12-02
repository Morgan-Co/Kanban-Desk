
import DeskTasks from './DeskTasks/DeskTasks'
import { Column } from '../../../../types/types'
import { addTasks } from '../../../../store/tasksSlice'
import { useAppDispatch } from '../../../../hooks/hook'
import { useSortable } from '@dnd-kit/sortable'
import AddButton from '../../../ui/AddButton'

const DeskColumn = ({ col }: { col: Column }) => {
	const dispatch = useAppDispatch()
	const { setNodeRef } = useSortable({
		id: col.id,
		data: { type: 'Column', col },
	})

	return (
		<div
			ref={setNodeRef}
			className='
			flex
			flex-col
			w-full
			max-w-[282px]
			min-h-[197px]
			max-h-[538px]
			h-fit
		bg-gray
			rounded-[10px]
			p-[12px]'
		>
			<h1 className='text-[18px] mb-[15px]'>{col.title}</h1>
			<DeskTasks col={col} />
			<div className='h-[40px] w-[135px]'>
				<AddButton
					onClick={() => {
						dispatch(addTasks(col.id))
					}}
				/>
			</div>
		</div>
	)
}

export default DeskColumn
