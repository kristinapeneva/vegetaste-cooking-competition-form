import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import FormSuccess from './components/FormSuccess';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState()
  function submitForm(isSuccess, mes) {
    setIsSubmitted(true)
    setIsSuccess(isSuccess)
    setMessage(mes)
  }
  return (
    <div className="App">
      {!isSubmitted ? (<Form submitForm={submitForm}/>) : (<FormSuccess isSuccess={isSuccess} message={message} />)}  
    </div>
  );
}

export default App;
