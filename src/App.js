import React ,{useState, Fragment,useEffect} from 'react';



function Cita ({cita,index,eliminarCita}){



  return(
    <div className="cita">
        <p>Mascota : <span>{ cita.mascota }</span> </p>
        <p>Propietario : <span>{ cita.propietario }</span> </p>
        <p>Fecha : <span>{ cita.fecha }</span> </p>
        <p>Hora :<span>{ cita.hora }</span></p>
        <p>Sintomas : <span>{ cita.sintomas }</span></p>
        <button type='button ' className="button eliminar u-full-width"
        onClick={() => eliminarCita(index) }
        >Eliminar</button>
    </div>

  )

}

function Formulario({CrearCita})
{

  const stateInicial ={
      mascota :'',
      propietario :'',
      fecha :'',
      hora :'',
      sintomas :'',
  }

  //cita = state actual
  //updateCita = fn que cambia state
  const[cita,updateCita] = useState(stateInicial);

  //actualizar State
  const actualizarState = (e) => {

    updateCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }


  //enviar cita al componente principal App
  const enviarCita = (e) => {
    e.preventDefault();

    console.log(cita);
   //pasar cita a componente principal
   CrearCita(cita);
   //reiniciar state(formatear formulario)
   updateCita(stateInicial);
  }

  

  return(
    <Fragment>
      <h2>Crear Cita</h2>

      <form onSubmit={enviarCita}> 
                  <label>Nombre Mascota</label>
                  <input 
                    type="text" 
                    name="mascota"
                    className="u-full-width" 
                    placeholder="Nombre Mascota" 
                    onChange={actualizarState}
                    value={cita.mascota}
                  />

                  <label>Nombre Dueño</label>
                  <input 
                    type="text" 
                    name="propietario"
                    className="u-full-width"  
                    placeholder="Nombre Dueño de la Mascota" 
                    onChange={actualizarState}
                    value={cita.propietario}
                  />

                  <label>Fecha</label>
                  <input 
                    type="date" 
                    className="u-full-width"
                    name="fecha"
                    onChange={actualizarState}
                    value={cita.fecha}
                  />               

                  <label>Hora</label>
                  <input 
                    type="time" 
                    className="u-full-width"
                    name="hora" 
                    onChange={actualizarState}
                    value={cita.hora}
                  />

                  <label>Sintomas</label>
                  <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={cita.sintomas}
                  ></textarea>

                  <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
  </Fragment>
  )
}


function App(){

//cargar las citas de localstorage como state inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales)
  {
    citasIniciales =[];
  }
  else{

  }

 // useState retorna dos funciones 
 // 1.1 state actual
 //1.2 state que actualiza metodo


  //traer state actuali
  //funcion que actualiza el state utilizando this.setstate();
  
  const[citas,guardarCita] = useState(citasIniciales);
  //** valor incial del state useState([]);


  //agregar nuevas Citas al state
  const CrearCita = cita =>{
    //tomar una copia del state para agregar cliente

    const NuevaCitas = [...citas,cita];
    //almacenar en state
    guardarCita(NuevaCitas);
  }

  // funcion para eliminar citas del state 
  const eliminarCita = index  => {

    const NuevaCitas = [...citas];

    //splice metodo para eliminar (que cosa , cuantos valores)
    NuevaCitas.splice(index,1);
    guardarCita(NuevaCitas);

  }


  //almacenar en local storage
  //se muestra cuando el componente se actualiza o cuando carga
  useEffect(

    () =>{
      let citasIniciales = JSON.parse(localStorage.getItem('citas'));

      if(citasIniciales)
      {
        localStorage.setItem('citas',JSON.stringify(citas));
      }
      else
      {
        localStorage.setItem('citas',JSON.stringify([]));
      }

      console.log('componente listo o algo cambio');
    }, [citas]

    
  )


  //cargar titulo de manera dinamica
  //Object.keys sirve para revisar arreglo en base a su posicion en el arreglo 
  const tituto = Object.keys(citas).length === 0 ? 'no hay citas' : 'administrar citas'


  return(
    <Fragment>
    <h1>Administrador de pacientes</h1>

    <div className="container">

      <div className="row">
          <div className="one-half column">
            <Formulario CrearCita ={CrearCita }/>
          </div>
          <div className="one-half column">

            <h2>{tituto}</h2> 
              {citas.map((cita,index) => (
              
                <Cita
                 key={index} 
                 index={index} 
                 cita={cita}
                 eliminarCita ={eliminarCita}
                 />

              ))}
          </div>

      </div>
      
    </div>
    </Fragment>
  )
  
}

export default App;