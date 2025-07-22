import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import App from "./App.jsx"

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    )
}

export default Routing