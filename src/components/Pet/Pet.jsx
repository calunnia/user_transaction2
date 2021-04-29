import React,{useState} from 'react'


function Pet({pet}) {

    const [data, setData] = useState([])
    const [loading,setLoading] = useState(false)  
    const [vaccinated, setVaccinated] =useState(pet.isVaccinated)


    const saveVaccination = (petName) => {      


        setLoading(true)                              
        setData([])
    
            fetch(`/api/pets`,  {
                                    method: 'post',
                                    headers: {  'Authorization' : 'dsadkfjghdfkhd',
                                                'Accept': 'application/json, text/plain, */*',
                                                'Content-Type': 'application/json'
                                              },
                                    body: JSON.stringify({ "name": petName, "isVaccinated": !vaccinated})       
                                }
                )
              .then( (response)=>(response.json()))
              .then( (resadat)=> {setData(resadat); setVaccinated( !vaccinated );  } )                          
              .catch( (error) => {
                                  console.log('error', error);
                                  setData(null);
                                } )
              .finally(() => {
                            console.log('fetch end');
                            setLoading(false);
                          }) 
          
             
      }


    return (
        <div>
            {pet.name} / {pet.animal}

                 <div>
                     
                     <button  onClick={ () =>( saveVaccination(pet.name))} >
                            {loading
                                     ? '...'
                                      :vaccinated  ? 'vaccinated'  :  'Not vaccinated'
                            
                            }


                     </button>
                     
                     
                     
                     
                     
                     </div>


        </div>
      
    )
}

export default Pet
