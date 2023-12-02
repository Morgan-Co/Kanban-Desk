import { FaTrashAlt } from 'react-icons/fa'

const DeleteButton = ({
	onClick,
	mouseIsOver,
}: {
	onClick: () => void
	mouseIsOver: boolean
}) => {
	return (
		<button
			onClick={onClick}
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
					absolute
					top-1/2
					-translate-y-1/2
					right-2
					text-[#b33f3f] 
					hover:text-[#8f3232]
					${mouseIsOver ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
		>
			<FaTrashAlt />
		</button>
	)
}

export default DeleteButton
