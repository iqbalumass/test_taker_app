import './App.css';
import Login from './Login Page/login';
import SubjectList from './Subject Page/subjectList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/subjectList" element={<SubjectList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;