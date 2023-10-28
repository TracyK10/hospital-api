import React, { useState, useEffect } from 'react';
import { registerPatient } from './api'; 
import './index'
import './App.css'

function App() {
  const[data, setData] = useState([{}])

  useEffect(() => {
    fetch("/api/register").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  })

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [patientId, setPatientId] = useState(null);
  const [queueNumber, setQueueNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const handleRegister = async () => {
    if (name && email && phone) {
      setIsLoading(true);
      try {
        const response = await registerPatient(name, email, phone);
        setPatientId(response.patientId);
        setQueueNumber(response.queueNumber);
        setSuccessMessage('Registration successful!');
        setName('');
        setEmail('');
        setPhone('');
      } catch (error) {
        setErrorMessage('Error occurred during registration');
      }
      setIsLoading(false);
    } else {
      setErrorMessage('Please fill in all fields');
    }
  }

  return (
    <div className="register-form sm:text-center block text-sm pt-5 font-medium leading-6 text-gray-900">
      <h1 class='text-5xl flex items-center justify-center italic p-4'>Life Made Easier</h1>
      <p class='text-xl inline-block pl-40 pr-40 pt-10 pb-10 items-center'>Do you get tired of long queues in hospital? Well, we just made it easier for you. We have made it easier to make appointments to see your doctor instead of having to wait long in hospital. </p>
      
      <div class='p-6 flex pl-40 pr-10 pt-10 pb-10 md:max-w-2xl md:flex'><img className='box-border h-80 md:h-full md:w-48 rounded-3xl' src={require('./hand.jpeg')} alt="hand holding a phone"/><p class='mt-2 text-xl inline-block width- pl-3 pt-28 pr-40 text-center sm:text-left max-w-screen-desktop:50%'>You can now register online and you'll be given a queue number that you will use to know how long you have to wait before you see the doctor</p></div>
      <section className='bg-slate-400 from-slate-400 pl-10 pr-10 pt-10 pb-10 md:max-w-2xl md:flex'>
      <div class='flex items-center justify-center'><p class='text-xl inline-block pl-3 pt-28 pr-20'>No more frustration and no more waiting</p><img className='box-border h-80 w-60 md:h-full md:w-48 rounded-3xl' src={require('./boy.jpg')} alt=' a boy using a phone'/></div>
      
      <p class='py-4 text-xl pl-10 pr-10 pt-10'>Feel free to sign into the form below!</p>
      <h1 class='text-2xl underline pl-10'>Login Form</h1>
      <form class='sm:text-center items-center justify-center pl-10 pr-10 pt-10 pb-10'>
      <input 
        placeholder="Name"
        type = "text"
        value={name}
        onChange={handleNameChange} 
        aria-label="Name"
        class='block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      />
      <br/>
      <input
        placeholder="Email"
        type = "email"
        value={email}
        onChange={handleEmailChange}
        aria-label="Email"
        class='block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      />
      <br/>
      <input 
        placeholder="Phone"
        value={phone}
        onChange={handlePhoneChange}
        aria-label="Phone"
        class='block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
      />
      <br />
      <button class= 'bg-zinc-800 text-fuchsia-100 rounded-full p-4 border-black' onClick={handleRegister} disabled={isLoading} >
        {isLoading ? 'Loading...' : 'Register'}
      </button>
</form></section>
      {patientId && (
        <div>
          <p>Patient ID: {patientId}</p>
          <p>Queue Number: {queueNumber}</p> 
        </div>
      )}

      {successMessage && (
        <p>{successMessage}</p>
      )}

      {errorMessage && (
        <p>{errorMessage}</p>
      )}
      
    </div>
  );
}

export default App;