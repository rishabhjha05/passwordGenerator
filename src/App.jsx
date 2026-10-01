import { use, useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Toast from '../components/toast'

function App() {
  const [length, setLength] = useState(8);
  const [password,setPassword]=useState("242fwrf")
  const [isNumAllowed,setIsNumAllowed]=useState(false);
  const [isCharAllowed,setIsCharAllowed]=useState(false);

  function generatePassword(){
    let allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(isNumAllowed){
      allowedChars = "abcde0fgh2ijk1lmn5op4qr3st6uvw8xy7zABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if(isCharAllowed){
      allowedChars = "abcde0f!gh$2i@jk1#lmn5op4q%r3st6uv^w8xy7zABCD&EFG*HI)J(KLMNOPQ+RSTU-VWXYZ";
    }
    let pass="";
    for(let i=0;i<length;i++){
      const randomIndex=Math.floor(Math.random()*allowedChars.length);
      pass+=allowedChars[randomIndex];
    }
    setPassword(pass);
  }
  function copyPassword(){
    navigator.clipboard.writeText(password);  
    const toast = document.querySelector('.toast');
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 1000);
  }
  useEffect(()=>generatePassword(),[length,isNumAllowed,isCharAllowed])
  return (
    <>
      <h1 className='heading'>PassWord Generator</h1>
      <div className='container'>
        <div className="input-container">
          <input value={password} id='password' placeholder='Password'/>
          <button className='cpyBtn' onClick={copyPassword}>
            Copy <i class="fa-regular fa-copy"></i>
          </button>
        </div>
        <div className="controls">
          <input type='range' min="6" max="16" defaultValue="8" step="1"  id="length-slider" onChange={(e) => setLength(e.target.value)}/>
          <label htmlFor="length-slider">Length: {length}</label>

          <input type='checkbox' id="checkBox-1" onChange={()=>setIsNumAllowed(!isNumAllowed)}/>
          <label htmlFor="checkBox-1">Numbers</label>
          <input type='checkbox' id="checkBox-2" onChange={()=>setIsCharAllowed(!isCharAllowed)}/>
          <label htmlFor="checkBox-2">Characters</label>
        </div>
      </div>
      <Toast message="Password copied to clipboard!" type="success" />
    </>
  )
}

export default App
