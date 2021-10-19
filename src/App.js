import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import FormSuccess from './components/FormSuccess';
import Footer from './components/Footer';

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  function submitForm() {
    setIsSubmitted(true)
  }
  return (
    <div className="App">
      <Header />
      {!isSubmitted ? (<Form submitForm={submitForm}/>) : (<FormSuccess />)}
      <Footer />      
    </div>
  );
}

export default App;
