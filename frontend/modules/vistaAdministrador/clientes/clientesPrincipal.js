let vehicles = [];
        let customers = [];
        let selectedCustomer = null;
        let vehicleToDelete = null;

        const deleteModal = document.getElementById("deleteModal");
        const editModal = document.getElementById("editModal");
        const confirmDeleteBtn = document.getElementById("confirmDelete");
        const cancelDeleteBtn = document.getElementById("cancelDelete");
        const resultDiv = document.getElementById("customerSearchResult")





        // Eventos

        
        confirmDeleteBtn.addEventListener("click", () => {
       
            hideDeleteModal();
        });

        cancelDeleteBtn.addEventListener("click", hideDeleteModal);

        
        document.getElementById("editVehicleForm").addEventListener("submit", function(e) {
           
            
        });

        document.getElementById("vehicleForm").addEventListener("submit", function(e) {

            e.preventDefault()
            const placa = document.getElementById("plate").value
            const marca = document.getElementById("brand").value
            const modelo = document.getElementById("model").value
            const year = document.getElementById("year").value
    

            let vehiculo = {placa, marca, modelo, year}

            if (selectedCustomer){
                const cliente = selectedCustomer
                createClient(vehiculo, cliente, 0)

            }else{
                
                const nombre = document.getElementById("customerName").value
                const cedula =  document.getElementById("customerId").value
                const telefono = document.getElementById("customerPhone").value
                const correo = document.getElementById("customerEmail").value
                const direccion = document.getElementById("customerAddress").value
                const cliente = {nombre,cedula,telefono,correo,direccion}
                createClient(vehiculo, cliente, 1)

            }

            clearNewCustomerForm()
            this.reset();
            selectedCustomer = null;
            document.getElementById("customerSearchResult").innerHTML = "";
           
        });


        //UI

        function showDeleteModal(id) {
            vehicleToDelete = id;
            deleteModal.classList.remove("hidden");
        }

        function hideDeleteModal() {
            deleteModal.classList.add("hidden");
            vehicleToDelete = null;
        }

        function showEditModal() {
            editModal.classList.remove("hidden");
        }

        function hideEditModal() {
            editModal.classList.add("hidden");
        }

        
        function toggleCustomerForm(type) {
            const existingForm = document.getElementById("existingCustomerForm");
            const newForm = document.getElementById("newCustomerForm");
            const existingBtn = document.getElementById("existingCustomerBtn");
            const newBtn = document.getElementById("newCustomerBtn");
            
            if (type === "existing") {
                existingForm.classList.remove("hidden");
                newForm.classList.add("hidden");
                existingBtn.classList.add("bg-blue-600", "text-white");
                existingBtn.classList.remove("bg-gray-100", "text-gray-700");
                newBtn.classList.remove("bg-blue-600", "text-white");
                newBtn.classList.add("bg-gray-100", "text-gray-700");
            
                document.getElementById("customerName").removeAttribute("required")
                document.getElementById("customerId").removeAttribute("required")
                document.getElementById("customerPhone").removeAttribute("required")
                document.getElementById("customerEmail").removeAttribute("required")
                document.getElementById("customerAddress").removeAttribute("required")
                document.getElementById('searchCustomerId').setAttribute("required", "")
                document.getElementById('searchCustomerId').value = ""
                document.getElementById("registerButton").disabled = false
                
                clearNewCustomerForm();
            } else {
                existingForm.classList.add("hidden");
                newForm.classList.remove("hidden");
                newBtn.classList.add("bg-blue-600", "text-white");
                newBtn.classList.remove("bg-gray-100", "text-gray-700");
                existingBtn.classList.remove("bg-blue-600", "text-white");
                existingBtn.classList.add("bg-gray-100", "text-gray-700");
                selectedCustomer = null;
                document.getElementById('searchCustomerId').removeAttribute("required")
                
                document.getElementById("customerName").setAttribute("required", "")
                document.getElementById("customerId").setAttribute("required", "")
                document.getElementById("customerPhone").setAttribute("required", "")
                document.getElementById("customerEmail").setAttribute("required", "")
                document.getElementById("customerAddress").setAttribute("required", "")
                document.getElementById("customerSearchResult").innerHTML = "";
                document.getElementById('searchCustomerId').value = ""
                document.getElementById("registerButton").disabled = false
            }
        }

        function clearNewCustomerForm() {
            document.getElementById("customerName").value = "";
            document.getElementById("customerId").value = "";
            document.getElementById("customerPhone").value = "";
            document.getElementById("customerEmail").value = "";
            document.getElementById("customerAddress").value = "";
            document.getElementById('searchCustomerId').value = ""
        }


        function editVehicle(vehicle, cliente) {
          

            document.getElementById("editVehicleId").value = vehicle.id;
            document.getElementById("editPlate").value = vehicle.placa;
            document.getElementById("editBrand").value = vehicle.marca;
            document.getElementById("editModel").value = vehicle.modelo;
            document.getElementById("editYear").value = vehicle.year;
         
            document.getElementById("editCustomerName").value = cliente.nombre
            document.getElementById("editCustomerId").value = cliente.cedula
            document.getElementById("editCustomerPhone").value = cliente.telefono
            document.getElementById("editCustomerEmail").value = cliente.correo
            document.getElementById("editCustomerAddress").value = cliente.direccion

            showEditModal();
        }


        function updateTable() {
            const tbody = document.getElementById("vehiclesTableBody");
            tbody.innerHTML = "";
            
            vehicles.forEach(vehicle => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${vehicle.plate}</td>
                    <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">
                        <div class="font-medium">${vehicle.brand} ${vehicle.model}</div>
                        <div class="text-gray-500">Year: ${vehicle.year} | Color: ${vehicle.color}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">
                        <div class="font-medium">${vehicle.customer.name}</div>
                        <div class="text-gray-500">ID: ${vehicle.customer.id}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-normal text-sm text-gray-900">
                        <div>${vehicle.customer.phone}</div>
                        <div class="text-gray-500">${vehicle.customer.email}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onclick="editVehicle(${vehicle.id})" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button onclick="showDeleteModal(${vehicle.id})" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        //Controllers

        async function createClient(vehiculo, cliente, newClient){

            const validateC = validateClient(cliente)
            const validateV = validateVehicle(vehiculo)

            if (validateC && validateV){

                if (newClient === 1){
                try{
                    await fetchCreateClient(cliente)
                    const { id }= await fetchClienteId(cliente)
                    await fetchCreateVehiculo(vehiculo, id)
                    
                }catch{
                    alert("Error al crear cliente")
                }
            }else{
                try{
                    const { id }= await fetchClienteId(cliente)
                    await fetchCreateVehiculo(vehiculo, id)
                    
                }catch{
                    alert("Error al crear cliente")
                }

            }
               
            }else{
                alert("Datos no validos")
            }
        }





        

        function validateClient(cliente){

            return true
        }
        function validateVehicle(vehiculo){

            return true
        }

        
        async function searchCustomer() {
                const cedula = document.getElementById("searchCustomerId").value
                const cliente = await fetchClienteId({cedula})
                if (Object.keys(cliente).length === 0) {
                    selectedCustomer = null;
                    resultDiv.innerHTML = `
                        <div class="p-4 bg-red-50 border border-red-200 rounded-md">
                            <p class="text-red-700">Cliente no registrado</p>
                        </div>
                    `;
                    document.getElementById("registerButton").disabled = true
                   
                } else {     
                    selectedCustomer = cliente;
                    resultDiv.innerHTML = `
                        <div class="p-4 bg-green-50 border border-green-200 rounded-md">
                            <p class="font-medium text-green-800">Customer Found:</p>
                            <p class="text-green-700">${cliente.nombre} (ID: ${cliente.cedula})</p>
                            <p class="text-green-700">${cliente.telefono}</p>
                        </div>
                    `;
                }    
        }

        //Fetchs

        async function fetchCreateClient(client){


            try{

                const response = await fetch("/clientes", {
                  method: "POST", // Tipo de solicitud
                  headers: {
                    "Content-Type": "application/json", // Especifica que se está enviando JSON
                  },
                  body: JSON.stringify(client), // Convierte el objeto a un string JSON
                })

          }catch{

            alert("Error en el fetch")
              
              
          }   
        }

        async function  fetchClienteId(client) {

            try{
                console.log(client)
                const response = await fetch(`/clientes/${client.cedula}`)
                const cliente = await response.json()
                return cliente
            }catch{
                alert("Error Creando")
            }
            
        }

        async function fetchCreateVehiculo(vehiculo, idCliente) {

            vehiculo.id_cliente = idCliente
            

            try{

                const response = await fetch("/vehiculos", {
                  method: "POST", // Tipo de solicitud
                  headers: {
                    "Content-Type": "application/json", // Especifica que se está enviando JSON
                  },
                  body: JSON.stringify(vehiculo), // Convierte el objeto a un string JSON
                })

          }catch{

            alert("Error en el fetch al vehiculo")
              
              
          }   
            
        }



        



        toggleCustomerForm("new");





