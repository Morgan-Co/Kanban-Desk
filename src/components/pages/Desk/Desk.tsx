import DeskColumn from './DeskColumn/DeskColumn'
import { columns } from '../../../data/columns.data'

const Desk = () => {

	/*
	TODO: 
		- Настроить Drag&Drop
		- Настроить искусственную авторизацию
	*/

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
				w-[1235px]
				gap-x-[24px]'
			>
				{columns.map(col => (
					<DeskColumn key={col.id} col={col} />
				))}
			</div>
		</div>
	)
}

export default Desk
