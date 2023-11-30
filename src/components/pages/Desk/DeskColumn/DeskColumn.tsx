import { BiPlusCircle } from 'react-icons/bi'
import DeskTasks from './DeskTasks/DeskTasks'
import { Column } from '../../../../types/types'
import { addTasks } from '../../../../store/tasksSlice'
import { useAppDispatch } from '../../../../hooks/hook'

const DeskColumn = ({ col }: { col: Column }) => {
	const dispatch = useAppDispatch()

	return (
		<div className='flex flex-col w-[282px] min-h-[197px] max-h-[538px] h-fit bg-gray rounded-[10px] p-[12px]'>
			<h1 className='text-[18px] mb-[15px]'>{col.title}</h1>
			<div className='mb-[20px] scroll-style p-[2px] flex-auto flex flex-col gap-y-[15px]'>
				<DeskTasks col={col} />
			</div>
			<div className='h-[40px] w-[135px]'>
				<button
					type='button'
					onClick={() => {
						dispatch(addTasks(col.id))
					}}
					className='flex items-center justify-center h-[40px] w-[135px] bg-dark-gray rounded-md transition-all hover:bg-[#a7a7a7]'
				>
					<span className='text-[18px] text-water-blue'>
						<BiPlusCircle />
					</span>
					<span className='ml-[10px] font-roboto'>Add card</span>
				</button>
			</div>
		</div>
	)
}

export default DeskColumn
