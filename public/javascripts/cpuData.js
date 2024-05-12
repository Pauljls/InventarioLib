//window.onload=()=>{
//    const form = document.getElementById('cpuData')
//    form.onsubmit=(e)=>{
//        console.log('Esto es un click')
//        const dataForm = new FormData(form)
//        const data = Object.fromEntries(dataForm)
//        console.log(data)
//    }
//
//    const editar = document.getElementById('editar')
//    editar.onsubmit=(e)=>{
//        console.log('form enviado')
//    }
//}

const visualizar=async(id)=>{
    const response = await fetch(`/equiposInformaticos/cpus/${id}`,{
        method : 'GET',
        headers : {
            'Content-type':'application/json',
        }
    })
    const data = await response.json()
    const nombre = document.getElementById('nombre')
    const serie = document.getElementById('nSerie')
    const fecha = document.getElementById('fecha')
    const ubicacion = document.getElementById('ubicacion')
    const estado = document.getElementById('estado')
    const ram = document.getElementById('ram')
    const procesador = document.getElementById('cpu')
    const so = document.getElementById('so')
    const image = document.getElementById('image')
    const date = new Date(data.fechaAdquisicion);
    const formattedDate = date.toISOString().split('T')[0];

    const path = data.image.split('/').slice(-3).join('/')

    nombre.value = data.nombre
    serie.value = data.serie
    fecha.value = formattedDate
    ubicacion.value = data.ubicacion
    estado.value = data.estado
    ram.value = data.ram
    procesador.value = data.procesador
    so.value = data.so
    image.src = `/${path}`
    console.log(data.image)
}

const editar = async(id)=>{
    const response = await fetch(`/equiposInformaticos/cpus/${id}`,{
        method : 'GET',
        headers : {
            'Content-type':'application/json',
        }
    })
    const data = await response.json()
    const editForm = document.getElementById('editarForm')
    const nombre = document.getElementById('nombreE')
    const serie = document.getElementById('nSerieE')
    const fecha = document.getElementById('fechaE')
    const ubicacion = document.querySelector('select[name="ubicacion"]')
    const estado = document.getElementById('estadoE')
    const radios = document.querySelectorAll('input[type="radio"][name="ram"]');
    const procesador = document.getElementById('cpuE')
    const so = document.getElementById('soE')
    const image = document.getElementById('imageE')
    const date = new Date(data.fechaAdquisicion);
    const formattedDate = date.toISOString().split('T')[0];

    const path = data.image.split('/').slice(-3).join('/')

    nombre.value = data.nombre
    serie.value = data.serie
    fecha.value = formattedDate
    //ubicacion.value = data.ubicacion
    //estado.value = data.estado
    //ubicacion.querySelectorAll('option').forEach(option => {
    //    // Compara el valor de cada opción con el valor del estado del JSON
    //    if (option.value === data.ubicacion) {
    //      // Establece la propiedad selected de la opción en true si coincide
    //      option.selected = true;
    //    }
    //  });
        

    radios.forEach(radio => {
      if (radio.value == data.ram) {
        radio.checked = true;
      }
    });
    procesador.value = data.procesador
    so.value = data.so
    editForm.addEventListener('submit', async (e) => {
       
    
        const formData = new FormData(editForm);
        const dataEdit = Object.fromEntries(formData);
        console.log(JSON.stringify(dataEdit));
    
        try {
          const response = await fetch(`/equiposInformaticos/cpus/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(dataEdit)
          });
    
        } catch (error) {
          // Maneja errores de red u otros errores no controlados
          console.error('Error en la solicitud fetch:', error);
        }
      });
}


const eliminar=async(id)=>{
    const response = await fetch(`/equiposInformaticos/cpus/${id}`,{
        method : 'GET',
        headers : {
            'Content-type':'application/json',
        }
    })

    const data = await response.json()
    const titulo =  document.getElementById('eliminarLabel')
    const eliminar =  document.getElementById('eliminarForm')
    titulo.innerHTML=`Estas seguro que deseas eliminar ${data.nombre}`    
    eliminar.onsubmit=async(e)=>{
        console.log('Eliminar')
        await fetch(`/equiposInformaticos/cpus/${id}`,{
            method : 'DELETE'
        })
    }
}

