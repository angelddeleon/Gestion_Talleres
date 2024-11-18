let mechanics = [];
        let selectedSpecialties = new Set();

        const specialtyModal = document.getElementById('specialtyModal');
        const addSpecialtyBtn = document.getElementById('addSpecialtyBtn');
        const cancelSpecialtyBtn = document.getElementById('cancelSpecialty');
        const confirmSpecialtyBtn = document.getElementById('confirmSpecialty');
        const selectedSpecialtiesContainer = document.getElementById('selectedSpecialties');

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

        function removeSpecialty(specialty) {
            selectedSpecialties.delete(specialty);
            updateSpecialtiesDisplay();
        }
        
        document.getElementById("mechanicForm").addEventListener("submit", function(e) {
            e.preventDefault();
            
            const mechanic = {
                id: Date.now(),
                nombre: document.getElementById("nombre").value,
                telefono: document.getElementById("telefono").value,
                correo: document.getElementById("correo").value,
                cedula: document.getElementById("cedula").value,
                interno: document.getElementById("interno").value === "true",
                especialidades: Array.from(selectedSpecialties)
            };
            
            mechanics.push(mechanic);
            updateTable();
            this.reset();
            selectedSpecialties.clear();
            updateSpecialtiesDisplay();
        });

        function updateTable() {
            const tbody = document.getElementById("mechanicsTableBody");
            tbody.innerHTML = "";
            
            mechanics.forEach(mechanic => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mechanic.nombre}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mechanic.telefono}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mechanic.correo}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mechanic.cedula}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${mechanic.interno ? "Yes" : "No"}</td>
                    <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">${mechanic.especialidades.join(", ")}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onclick="deleteMechanic(${mechanic.id})" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function deleteMechanic(id) {
            mechanics = mechanics.filter(m => m.id !== id);
            updateTable();}