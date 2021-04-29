import React from 'react'
import Pet from '../Pet/Pet.jsx'

function Pets({pets}) {
    return (
        <div className="Pet">
           {
               pets.map((pet) =>(
                                   <Pet pet={pet}/>

               ))
           } 
        </div>
    )
}

export default Pets
