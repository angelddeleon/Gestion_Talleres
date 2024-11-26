
let mechanics = [];
        let selectedSpecialties = new Set();
        let editingSpecialties = new Set();

        // 
        const specialtyModal = document.getElementById('specialtyModal');
        const addSpecialtyBtn = document.getElementById('addSpecialtyBtn');
        const cancelSpecialtyBtn = document.getElementById('cancelSpecialty');
        const confirmSpecialtyBtn = document.getElementById('confirmSpecialty');
        const selectedSpecialtiesContainer = document.getElementById('selectedSpecialties');
        const specialtySelect = document.getElementById('specialtySelect')
        const mechanicForm = document.getElementById('mechanicForm')
        const mecanicosTable = document.getElementById('mechanicsTableBody')
        const editSelectedSpecialtiesContainer = document.getElementById("editSelectedSpecialties");
        const editModal = document.getElementById("editModal");
        const editModalButton = document.getElementsByClassName("edit")
        const editAddSpecialtyBtn = document.getElementById("editAddSpecialtyBtn");
        const editForm = document.getElementById("editForm")
  

        
        //Eventos
        addSpecialtyBtn.onclick = () => specialtyModal.classList.remove('hidden');
        editAddSpecialtyBtn.onclick = () => specialtyModal.classList.remove("hidden");
        cancelSpecialtyBtn.onclick = () => specialtyModal.classList.add('hidden');
        confirmSpecialtyBtn.onclick = () => {

            const specialty = document.getElementById("specialtySelect").value;
            
            if (editModal.classList.contains("hidden")) {
                console.log("Hidden")
                if (!selectedSpecialties.has(specialty)) {
                    selectedSpecialties.add(specialty);
                    updateSpecialtiesDisplay();
                }
            }
             else {
                console.log("Aqui")
             
                if (!editingSpecialties.has(specialty)) {
                    editingSpecialties.add(specialty);
                    updateEditSpecialtiesDisplay();
                }
            }
            specialtyModal.classList.add("hidden");
        };
     
        mecanicosTable.addEventListener("click", (e)=>{

            if (e.target.classList.contains("edit-button")){

                const trElement = e.target.parentElement.parentElement
                const cedula = trElement.children[3].textContent
             editarMecanicoModal(cedula)
            }

           
        })  

        mechanicForm.addEventListener("submit",(event)=>{
            
            event.preventDefault()
            const nombre = document.getElementById('nombre').value  ;
            console.log(nombre)
            const telefono = document.getElementById('telefono').value;
            const correo = document.getElementById("correo").value
            const cedula = document.getElementById("cedula").value
            let interno = document.getElementById("interno").value 
            const especialidades = Array.from(selectedSpecialties)

            if (especialidades.length === 0){
                alert("Agrega al menos una especialidad");
                return
            }

            const mecanico ={
                nombre,
                cedula,
                telefono,
                correo,
                interno,
               especialidades
            }
           
            
            const response = createMecanico(mecanico)

            if (response){
                clearForm() 
                updateMecanicosTable()
            }
            
          
          
        })

        editForm.addEventListener("submit", (event)=>{
            event.preventDefault()
            const nombre = document.getElementById('editNombre').value  ;
            const telefono = document.getElementById('editTelefono').value;
            const correo = document.getElementById("editCorreo").value
            const cedula = document.getElementById("editCedula").value
            let interno = document.getElementById("editInterno").value 
            const especialidades = Array.from(editingSpecialties)

            if (especialidades.length === 0){
                alert("Agrega al menos una especialidad");
                return
            }

            const mecanico ={
                nombre,
                cedula,
                telefono,
                correo,
                interno,
               especialidades,
            }

            updateMecanico(mecanico)
            closeEditModal()
            updateMecanicosTable()

            
           
            
        })

        
        //UI Functions
        function updateSpecialtiesDisplay() {
            selectedSpecialtiesContainer.innerHTML = '';
            selectedSpecialties.forEach(specialty => {
                const tag = document.createElement('div');
                tag.className = 'inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm';
                tag.innerHTML = `
                    ${specialty}
                    <button type="button" onclick="removeSpecialty('${specialty}')" class="ml-2 text-blue-500 hover:text-blue-700">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                `;
                selectedSpecialtiesContainer.appendChild(tag);
            });
        }

        function updateEditSpecialtiesDisplay() {
            editSelectedSpecialtiesContainer.innerHTML = "";
            editingSpecialties.forEach(specialty => {
                const tag = document.createElement("div");
                tag.className = "inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm";
                tag.innerHTML = `
                    ${specialty}
                    <button type="button" onclick="removeEditSpecialty('${specialty}')" class="ml-2 text-blue-500 hover:text-blue-700">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                `;
                editSelectedSpecialtiesContainer.appendChild(tag);
            });
        }

        function closeEditModal() {
            editModal.classList.add("hidden");
            editingSpecialties.clear();
            document.getElementById("editForm").reset();
        }
        async function updateMecanicosTable(){

            const mecanicos = await fetchMecanicos()
            mecanicosTable.innerHTML = " "

            mecanicos.map((mecanico) =>{
                const row = `
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mecanico.nombre}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mecanico.telefono}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mecanico.correo}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mecanico.cedula}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mecanico.interno == 1 ? 'Sí' : 'No'}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mecanico.especialidades.map((especialidad)=>especialidad.nombre)}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button class="edit-button text-blue-600 hover:text-blue-900">Edit</button>
                </td>
                </tr>
              `;
              mecanicosTable.innerHTML += row;

            })
          


        }
        async function loadSpecialities(){

            const specialities = await fetchSpecialities()
            console.log(specialities)
    

            if (specialities.length === 0){
                console.log("Error")
            }

            specialities.forEach((speciality) =>{
                const option = document.createElement('option');
                option.value = speciality.nombre_especialidad;
                option.text = speciality.nombre_especialidad
                specialtySelect.appendChild(option)
            })

            
        }
        function removeSpecialty(specialty) {
            selectedSpecialties.delete(specialty);
            updateSpecialtiesDisplay();
        }

        function removeEditSpecialty(specialty) {
            editingSpecialties.delete(specialty);
            updateEditSpecialtiesDisplay();

        }

        function clearForm(){
            document.getElementById('nombre').value = ""  ;
            document.getElementById('telefono').value = "";
            document.getElementById("correo").value =""
            document.getElementById("cedula").value = ""
            selectedSpecialties.clear()
            updateSpecialtiesDisplay()
          
        }

        async function editarMecanicoModal(mecanico_cedula) {

            const mecanico = await fetchMecanicoById(mecanico_cedula)
            const editNombre = document.getElementById("editNombre")
            const editTelefono = document.getElementById("editTelefono")
            const editCorreo = document.getElementById("editCorreo")
            const editCedula = document.getElementById("editCedula")
            const editInterno = document.getElementById("editInterno")
            

            if (mecanico){
                editNombre.value = mecanico.nombre
                editTelefono.value = mecanico.telefono
                editCorreo.value = mecanico.correo
                editCedula.value = mecanico.cedula
                editInterno.value = mecanico.interno
                editingSpecialties = new Set(mecanico.especialidades.map((especialidad) => especialidad.nombre))
                console.log(editingSpecialties)
                updateEditSpecialtiesDisplay()
            
            }
           
            
            editModal.classList.remove("hidden");
            updateMecanicosTable()
            
        }

          
       
        //Fetchs
        async function fetchSpecialities(){

            try{
                const response = await fetch('/mecanicos/especialidad')
                const specialities = await response.json()
                return specialities
                

            }catch{
                console.error('Error loading specialities');
                return []
            }
            
        }

        async function fetchMecanicos() {
            try{
                const response = await fetch('/mecanicos')
                const mecanicos = await response.json()
        
                return mecanicos
                

            }catch{
                console.error('Error loading mecanicos');
                return []
            }
        }

        async function fetchMecanicoById(mecanico_cedula) {

            try{
                const response = await fetch(`/mecanicos/${mecanico_cedula}`)
                const mecanicos = await response.json()
    
                return mecanicos
                
            }catch{
                console.error('Error loading mecanicos');
                return []
            }

            
        }

        async function fetchCreateMecanico(mecanico) {



            try{

                  const response = await fetch("/mecanicos", {
                    method: "POST", // Tipo de solicitud
                    headers: {
                      "Content-Type": "application/json", // Especifica que se está enviando JSON
                    },
                    body: JSON.stringify(mecanico), // Convierte el objeto a un string JSON
                  })

                
 
            }catch{
                
                
            }   
            
        }

        async function fetchUpdateMecanico(mecanico) {


            try{
                const response = await fetch(`/mecanicos/${mecanico.cedula}`, {
                    method: "PATCH", // Tipo de solicitud
                    headers: {
                        "Content-Type": "application/json", 
                        },
                        body: JSON.stringify(mecanico), 
                        })
                }
             
            catch{

                alert("Error al actualizar mecanico")

            }

     
        }


        //Controllers

        async function createMecanico(mecanico){

            const validate = validateM(mecanico)

            if (!validate){
                alert("!!!!!")
                // Ingresar logica para mostrar donde estan los errores del usuario
                return false
            }

            const response = await fetchCreateMecanico(mecanico)

            if (!response){
                alert("Error al crear el mecanico")
                //Agregar logica para mostrar en donde esta el error
                return false
            }

            alert("Mecanico creado correctamente")
            return true

        }

        async function updateMecanico(mecanico,id) {

            const validate = validateM(mecanico)

            if (validate){

                const response = await fetchUpdateMecanico(mecanico)
            }
            
        }
        
      
        function validateM(mecanico){

            //Agregar todas las validaciones antes de mandarlo al servidor

            return true
        }

        


       
        
       

        document.addEventListener('DOMContentLoaded', () => {
            loadSpecialities()
            updateMecanicosTable()
            
        });