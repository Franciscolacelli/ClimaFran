import { useState, useEffect } from "react";

const Climate = ( {data} ) => {

    const temperature = Math.round(data.main?.temp -273.15)

    const viento = Math.round((data.wind?.speed) * 3.6)

    const image = (data.weather?.[0].main)
  

     
    const f = "ºF"
    const c = "ºC"

    const[ grados, setGrados ] = useState(temperature)
 
    useEffect(() => {
        setGrados((temperature)+c)
    },[temperature])

    const changeGrados = () => {
        if ((temperature)+c === grados) {
            setGrados(Math.round(((temperature * 1.8) + 32 ))+f)
            
        }
        else setGrados((temperature)+c)
    }



    return (
        <>
                   

        <div className="conteiner">
            
           <div className="grados-icon">
                <h1> {grados} </h1>
                <div className="img" style={{backgroundImage: "url('"+image+".svg')"}}> </div>
              
            </div>

           <div className="date">

           <h3><i className='bx bx-wind'></i> / Viento / {viento} Km/h</h3>
           <h3><i className='bx bxs-cloud'></i> / Nubosidad / {data.weather?.[0].description} </h3>
           <h3><i className='bx bx-reflect-horizontal'></i> / Presión / {data.main?.pressure} Hectopascales </h3>
           <h3><i className='bx bx-water'></i> / Humedad / {data.main?.humidity} % </h3>
           </div>
        
           <div className="city"> 
             <h2>{data.name}, {data.sys?.country}</h2>
           </div>
        </div>

        <button onClick={changeGrados}>Cambiar de Grados</button>
        </>
    );
};

export default Climate;