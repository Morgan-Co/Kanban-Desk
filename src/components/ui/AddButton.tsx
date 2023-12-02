import { BiPlusCircle } from 'react-icons/bi'

const AddButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button
			onClick={onClick}
			type='button'
			className='
			flex
			items-center
			justify-center
			h-[40px]
			w-[135px]
		bg-dark-gray
			rounded-md
			transition-all
		hover:bg-[#a7a7a7]'
		>
			<span className='text-[18px] text-water-blue'>
				<BiPlusCircle />
			</span>
			<span className='ml-[10px] font-roboto'>Add card</span>
		</button>
	)
}

export default AddButton
