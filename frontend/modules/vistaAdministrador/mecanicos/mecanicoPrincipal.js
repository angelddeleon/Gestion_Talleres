

let mechanics = [];
        let selectedSpecialties = new Set();

        const specialtyModal = document.getElementById('specialtyModal');
        const addSpecialtyBtn = document.getElementById('addSpecialtyBtn');
        const cancelSpecialtyBtn = document.getElementById('cancelSpecialty');
        const confirmSpecialtyBtn = document.getElementById('confirmSpecialty');
        const selectedSpecialtiesContainer = document.getElementById('selectedSpecialties');
        const specialtySelect = document.getElementById('specialtySelect')

        

        addSpecialtyBtn.onclick = () => specialtyModal.classList.remove('hidden');
        cancelSpecialtyBtn.onclick = () => specialtyModal.classList.add('hidden');

        confirmSpecialtyBtn.onclick = () => {
            const specialty = document.getElementById('specialtySelect').value;
            if (!selectedSpecialties.has(specialty)) {
                selectedSpecialties.add(specialty);
                updateSpecialtiesDisplay();
            }
            specialtyModal.classList.add('hidden');
        };

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
        
       

        document.addEventListener('DOMContentLoaded', () => {
            loadSpecialities()
            
        });