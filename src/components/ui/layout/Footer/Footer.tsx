import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hook'
import {
	trackActiveTasks,
	trackFinishedTasks,
} from '../../../../store/tasksSlice'

const Footer = () => {
	const { activeTasks, finishedTasks } = useAppSelector(
		state => state.tasks.track
	)
	const tasks = useAppSelector(state => state.tasks.tasks)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(trackActiveTasks())
		dispatch(trackFinishedTasks())
	}, [tasks, dispatch])

	return (
		<footer className='flex w-full justify-between h-[55px] bg-water-blue items-center p-[20px] font-roboto text-white'>
			<div className='flex w-[333px] justify-between text-[18px]'>
				<div>Active tasks: {activeTasks}</div>
				<div>Finished tasks: {finishedTasks}</div>
			</div>
			<div>
				<div>Kanban board by Morgan, 2024</div>
			</div>
		</footer>
	)
}

export default Footer
