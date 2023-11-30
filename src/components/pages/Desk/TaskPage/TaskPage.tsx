import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hook'
import { updateDetails, updateTask } from '../../../../store/tasksSlice'

const TaskPage = () => {
	const { id } = useParams()
	const [editTitle, setEditTitle] = useState(false)
	const dispatch = useAppDispatch()
	const tasks = useAppSelector(state => state.tasks.tasks)

	return (
		<div
			className='
				 flex-1
			 bg-blue
			   flex
				 justify-center'
		>
			{id &&
				tasks
					.filter(task => task.id === parseFloat(id))
					.map(task => (
						<div
							key={task.id}
							className='w-[1181px] max-h-[548px] bg-white rounded-md mt-[22px] mb-[20px] p-[25px] '
						>
							{!editTitle ? (
								<div className=''>
									<h1
										onClick={() => {
											setEditTitle(prev => !prev)
										}}
										className='text-[#000] text-[24px] font-roboto mb-[35px] cursor-pointer border-transparent rounded-md pl-[10px] pr-[10px] border-[2px] min-w-[120px] w-fit h-fit hover:border-blue transition-all'
									>
										{task.content}
									</h1>
								</div>
							) : (
								<div>
									<input
										onChange={e => {
											dispatch(
												updateTask({ id: task.id, content: e.target.value })
											)
										}}
										className='text-[#000] text-[24px] font-roboto mb-[35px] cursor-pointer border-[2px] border-transparent rounded-md pl-[10px] outline-none max-w-full w-fit h-fit focus:border-blue'
										autoFocus
										onBlur={() => {
											setEditTitle(prev => !prev)
										}}
										defaultValue={task.content}
									></input>
								</div>
							)}
							<textarea
								className='font-[18px] font-roboto outline-none resize-none w-[621px] transition-all border-[2px] border-transparent hover:border-blue rounded-md pl-[13px] p-[5px] focus:border-blue'
								placeholder='Enter some details'
								defaultValue={task.details}
								onChange={e => {
									dispatch(
										updateDetails({
											id: task.id,
											details: e.target.value,
										})
									)
								}}
							></textarea>
						</div>
					))}
		</div>
	)
}

export default TaskPage
