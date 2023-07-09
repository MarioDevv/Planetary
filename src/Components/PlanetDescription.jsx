import React, { useContext } from 'react'
import { Context } from 'react'
import { PlanetContext } from '../Context/PlanetContext'

function PlanetDescription() {
    const { currentPlanet, setCurrentPlanet } = useContext(PlanetContext)
    // setCurrentPlanet('Solar System') // This is an example
    
    return (
    <div className={`absolute top-5 left-5 w-[400px] h-[95%] backdrop-blur-md text-white p-5 rounded-lg shadow-[0_8px_20px_rgba(255,255,255,0.3)] ${currentPlanet == "" ? "hidden" : ""}`}>
        <h1 className='text-4xl'>
            {currentPlanet}
        </h1>
        <hr className=' my-5'/>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
    </div>
  )
}

export default PlanetDescription