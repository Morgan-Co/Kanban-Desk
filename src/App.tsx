import { Routes, Route } from 'react-router-dom'
import Desk from './components/pages/Desk/Desk'
import Layout from './components/ui/layout/Layout'
import TaskPage from './components/pages/Desk/TaskPage/TaskPage'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Desk />} />
					<Route path=':id' element={<TaskPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
