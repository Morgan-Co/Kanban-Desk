import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Task } from '../../../../../../types/types'
import { useAppDispatch } from '../../../../../../hooks/hook'
import { deleteTask, updateTask } from '../../../../../../store/tasksSlice.ts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import DeleteButton from '../../../../../ui/DeleteButton.tsx'

const DeskTask = ({ task }: { task: Task }) => {
	const [mouseIsOver, setMouseIsOver] = useState(false)
	const [editMode, setEditMode] = useState(true)
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
	const toggleEditMode = () => {
		setEditMode(prev => !prev)
		setMouseIsOver(false)
	}

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	if (isDragging) {
		return (
			<div
				style={style}
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
				scroll-style
				bg-white
				opacity-50
				font-roboto
				cursor-grab'
			></div>
		)
	}
	if (editMode) {
		return (
			<div style={style} ref={setNodeRef} {...attributes} {...listeners}>
				<textarea
					autoFocus
					placeholder={task.content}
					onChange={e => {
						dispatch(updateTask({ id: task.id, content: e.target.value }))
					}}
					onBlur={() => {
						toggleEditMode()
						if (task.content === '') {
							task.content = task.initialContent
						}
					}}
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
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onMouseEnter={() => {
				setMouseIsOver(true)
			}}
			onMouseLeave={() => {
				setMouseIsOver(false)
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
			scroll-style
			hover:border-blue
			bg-white
			font-roboto
			cursor-grab
			relative'
		>
			<Link
				to={`${task.id}`}
				className='
				w-full
				p-[5px]
			hover:text-blue
				transition-colors
				cursor-pointer'
			>
				<p className='h-full w-full break-words overflow-y-auto overflow-x-hidden scroll-style'>
					{task.content}
				</p>
			</Link>
			<DeleteButton
				onClick={() => {
					dispatch(deleteTask(task.id))
				}}
				mouseIsOver={mouseIsOver}
			/>
		</div>
	)
}

export default DeskTask
