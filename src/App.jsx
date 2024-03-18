import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState('');

  //Button changes
  const [color, setColor] = useState('#1D4ED8')
  const [text, setText] = useState("copy")
  
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers) str += "0123456789"
    if(symbols) str += "!@#$%^&*()_-+=}{[]?<>"

    for(let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numbers, symbols])

  useEffect(() => {
    generatePassword()
  }, [length, numbers, symbols])

  const copyClipboard = () => {
    window.navigator.clipboard.writeText(password)
    setText("copied")
    setColor("#1BC900")
    passwordRef.current.select()
  }

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
        <button
        onClick={copyClipboard}
        className='outline-none text-white px-3 py-0.5 shrink-0' style={{backgroundColor: color}}>{text}</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        {/* length */}
        <div className="flex item-center gap-x-1">
          <input
          type="range"
          min={6} max={50} value={length}
          className='cursor-pointer' name='' id
          onChange={(e) => setLength(e.target.value)}/>
          <label htmlFor="length">length: {length}</label>
        </div>
        {/* Numbers */}
        <div className="flex item-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={numbers}
          name='' id=""
          onChange={() => {setNumbers((prev) => !prev)}}/>
          <label htmlFor="number">Numbers</label>
        </div>
        {/* Symbols */}
        <div className="flex item-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={symbols}
          name='' id=""
          onChange={() => {setSymbols((prev) => !prev)}}/>
          <label htmlFor="symbol">Symbols</label>
        </div>
      </div>
    </div>
  )
}

export default App
