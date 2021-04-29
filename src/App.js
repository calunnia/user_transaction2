import './App.css'
import React,{useState} from 'react'
import Loading from './components/Loading/Loading.jsx'
import Pets from './components/Pets/Pets.jsx'

const App = () => {

const [data, setData] = useState([])
const [loading,setLoading] = useState(false)
const [ input, setInput]    = useState('')

 const searchInput = (()=>{

setLoading(true)
setData([])

fetch(`api/clients?search=${input}`)

    .then( (response)=>(response.json()))
    .then( (resadat)=>(setData(resadat)))
    .catch( (error) => {
                        console.log('error', error);
                        setData(null);
                      } )
    .finally(() => {
                  console.log('fetch end');
                  setLoading(false);
                })
                         })
  
console.log(data);



  return (
    <div className="App">
     <h1>Client</h1>
     <input type="text" placeholder="client" onChange={(ev)=>(setInput(ev.target.value))}/>
     <button onClick={()=> (searchInput())}>Search</button>
            {loading && <Loading/>}

                  { (data === null) 
                                    ? <p>Something happend</p>
                                    :  data.map((client)=>( <div className="Client">{client.name}
                                    
                                                                      < Pets pets = {client.pets}/>
                                    
                                    </div>  ))

                  }
    </div>
  )
}

export default App
