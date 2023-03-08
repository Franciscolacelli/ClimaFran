import axios from 'axios'
import './App.css'
import Loader from './components/Loader'
import Climate from './components/Climate'
import { useState, useEffect } from 'react'

function App() {


//----------LOADER ------------------

const [ isLoading, setIsLoading] = useState(false)


//---------- GEOLOCALITATION--------------
const API_endpoint = "https://api.openweathermap.org/data/2.5/weather?"
const API_key = "7fc5d11a4c3e729c71a871eb505630a3"
let lat = ""
let lon = ""
const [ character, setCharacter ] = useState({})

useEffect(() => {
    setIsLoading(true)
 
    navigator.geolocation.getCurrentPosition( possition => {
        lat = (possition.coords.latitude); 
        lon = (possition.coords.longitude); 
      
    axios
        .get(`${API_endpoint}lat=${lat}&lon=${lon}&appid=${API_key}`)
        .then( (resp) => setCharacter(resp.data))
        .catch( (error) => console.log(error) )
      })
      
      setTimeout(() =>{
        setIsLoading(false)
      }, 1500)
    
}, [])




//---------- TEXT IMPUT -------------

const [ text, setText ] = useState("")

const cityClimate = () => {
      setIsLoading(true)
      axios
         .get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}`)
         .then( (resp) => setCharacter(resp.data))
         .catch( (error) => console.log(error) )
      setTimeout(() =>{
        setIsLoading(false)
      }, 1500)
  }
console.log(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_key}`)
  return (
    <div className="App">

      <div className="buscador"> 
        <input value={text} onChange={ (e) => setText(e.target.value)} className='buscador-imput' type="text" name="city" placeholder= "   Ciudad..."/>
        <button onClick={cityClimate} className='btn-buscador'><i className='bx bx-search-alt-2'></i></button>
      </div>

      { isLoading && <Loader/>}
      <Climate data={character}/>
      
    </div>
  )
}

export default App