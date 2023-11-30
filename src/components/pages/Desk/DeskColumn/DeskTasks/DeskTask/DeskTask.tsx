import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { Task } from '../../../../../../types/types'
import { useAppDispatch } from '../../../../../../hooks/hook'
import { deleteTask, updateTask } from '../../../../../../store/tasksSlice.ts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const DeskTask = ({
	task,
	toggleEditMode,
}: {
	task: Task
	toggleEditMode: boolean
}) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const [active, setActive] = useState(false)
	const [editMode, setEditMode] = useState(toggleEditMode)
	const dispatch = useAppDispatch()
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: { type: 'Task', task },
		disabled: editMode,
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}
	if (isDragging) {
		return (
			<div
				style={style}
				{...attributes}
				{...listeners}
				ref={setNodeRef}
				className='
				w-full
				h-[35px]
				flex
				justify-between
				rounded-[5px]
				border-[1px]
				border-blue
				transition-color
				overflow-y-auto
				overflow-x-hidden
				scroll-style
				cursor-pointer
				bg-white
				opacity-50
				font-roboto'
			></div>
		)
	}
	if (editMode) {
		return (
			<div
				className='w-full'
				// style={style}
				// ref={setNodeRef}
				// {...attributes}
				// {...listeners}
			>
				<textarea
					ref={textAreaRef}
					autoFocus
					onChange={e => {
						// resizeText()
						dispatch(updateTask({ id: task.id, content: e.target.value }))
					}}
					onBlur={() => {
						setEditMode(prev => !prev)
						setActive(false)
						if (task.content === '') {
							task.content = task.initialContent
						}
					}}
					placeholder={task.content}
					className='
					resize-none 
					rounded-[5px] 
					p-[5px] 
					font-roboto 
					border-none 
					h-[35px] 
					scroll-style
					w-full'
				/>
			</div>
		)
	}

	return (
		<div
			style={style}
			{...attributes}
			{...listeners}
			ref={setNodeRef}
			onMouseEnter={() => {
				setActive(prev => !prev)
			}}
			onMouseLeave={() => {
				setActive(prev => !prev)
			}}
			className='
			w-full
			max-h-[57px]
			h-fit
			flex
			justify-between
			rounded-[5px]
			border-[1px]
			border-transparent
			transition-color
			overflow-y-auto
			overflow-x-hidden
			scroll-style
			cursor-pointer
			hover:border-blue
			bg-white
			font-roboto'
		>
			<div className='w-full max-w-[217px] p-[5px]'>
				<Link to={`/${task.id}`}>
					<p className='break-words'>{task.content}</p>
				</Link>
			</div>
			<div className='p-[5px]'>
				<button
					onClick={() => {
						dispatch(deleteTask(task.id))
					}}
					type='button'
					className={`
					flex 
					justify-center 
					items-center 
					w-[25px] 
					h-[25px] 
					bg-dark-gray 
					rounded-sm 
					transition-all 
					text-[#b33f3f] 
					hover:text-[#8f3232]
					${active ? 'opacity-100' : 'opacity-0 pointer-events-none relative z-40'}`}
				>
					<FaTrashAlt />
				</button>
			</div>
		</div>
	)
}

export default DeskTask
