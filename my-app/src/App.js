

import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Chat from './components/Chat';


function App() {
  return (
    <div className="App">
         <BrowserRouter>
            <Routes>
                 <Route path='/' element={< Login/>}/>
                 <Route path='/chat' element={< Chat/>}/>
            </Routes>
         </BrowserRouter>
    </div>
  );
}

export default App;
