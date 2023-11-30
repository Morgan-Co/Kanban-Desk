import defaultUser from '/defaultUser.png'

const Header = () => {
	return (
		<header className=' p-[5px] h-[55px] w-full bg-water-blue flex items-center justify-between'>
			<h1 className=' font-roboto text-white text-[26px]'>
				Awesome Kanban Board
			</h1>
			<div>
				<img
					className='w-[40px] h-[40px]'
					src={defaultUser}
					alt='default-user'
				/>
			</div>
		</header>
	)
}

export default Header
