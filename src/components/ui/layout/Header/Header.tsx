import { useState, useEffect, useRef } from 'react'
import defaultUser from '/defaultUser.png'
import { IoIosArrowDown } from 'react-icons/io'
import { liItems } from '../../../../data/KanbanData'

const Header = () => {
	const [rotate, setRotate] = useState(false)
	const headerRef = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				headerRef.current &&
				!headerRef.current.contains(event.target as Node)
			) {
				setRotate(false)
			}
		}
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])
	return (
		<header
			ref={headerRef}
			className=' p-[5px] h-[55px] w-full bg-water-blue flex items-center justify-between'
		>
			<h1 className=' font-roboto text-white sm:text-[26px] text-[16px]'>
				Awesome Kanban Board
			</h1>
			<div className='flex relative items-center'>
				<img
					className='w-[40px] h-[40px]'
					src={defaultUser}
					alt='default-user'
				/>
				<div className='flex'>
					<div
						onClick={() => setRotate(prev => !prev)}
						className={`cursor-pointer transition-all w-[16px] h-[16px]`}
					>
						<div
							className={`${
								rotate ? ' rotate-180' : 'rotate-0'
							} block w-full h-full text-[16px] text-white transition-all`}
						>
							<IoIosArrowDown />
						</div>
					</div>
					<ul
						className={`
					${rotate ? 'opacity-100' : 'opacity-0'}
					transition 
					absolute 
					top-[50px] 
					left-[-100px]
					w-[134px] 
					h-[60px]
				bg-white
					rounded-[5px] 
					flex 
					flex-col 
					justify-center 
					pl-[10px]`}
					>
						{liItems.map(item => (
							<li key={item} className='hover:text-blue transition-colors cursor-pointer'>
								<a href='' className='w-full block'>
									{item}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Header
