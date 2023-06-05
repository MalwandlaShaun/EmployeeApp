import Form from './components/Form';
import './App.css';
import { useState } from 'react';

function App() {

  const [employee, setEmployee] = useState([])
  return (
    <div className="App">
      <Form />
    </div>
  );
}

export default App;
