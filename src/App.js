import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import FormSuccess from './components/FormSuccess';
import Footer from './components/Footer';

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
      <Header />
      {!isSubmitted ? (<Form submitForm={submitForm}/>) : (<FormSuccess isSuccess={isSuccess} message={message} />)}
      <Footer />      
    </div>
  );
}

export default App;
