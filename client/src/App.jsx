import { ThemeProvider } from "@/components/theme-provider"
import Dashboard from './Dashboard';
import Validate from './Validate';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS

function App() {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <Router>
       <Routes>
         <Route path='/dashboard' element={<Dashboard/>} />
         <Route path='/' element={<Validate/>} />
       </Routes>
     </Router>
      <ToastContainer theme="dark" />
    </ThemeProvider>

    </>
  )
}

export default App
