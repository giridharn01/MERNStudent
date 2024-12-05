
import {Route,Routes} from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import AddStudent from './pages/addStudent';
import AddMarks from './pages/addmarks';
import ViewMarks from './pages/viewmarks';
import UpdateStudent from './pages/updateStudent';
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addStudent" element={<AddStudent/>}/>
      <Route path="/addmarks/:id" element={<AddMarks/>}/>
      <Route path="/viewmarks/:id" element={<ViewMarks/>}/>
      <Route path="/updateStudent/:id" element={<UpdateStudent/>}/>
    </Routes>
  )
}

export default App
