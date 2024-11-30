/** @type {import('tailwindcss').Config} */
export default {
  content: ["./frontend/modules/vistaMecanico/mecanico.{html,js}",
    "./frontend/modules/vistaMecanico/mecanico.{html,js}",
    "./frontend/modules/vistaCliente/vistaCliente.{html,js}",
    "./frontend/modules/vistaAdministrador/index.{html}",
    "./frontend/modules/vistaAdministrador/clientes/clientes.{html}",
    "./frontend/modules/vistaAdministrador/clientes/clientesPrincipal.{js}",
    "./frontend/modules/vistaAdministrador/mecanicos/mecanico.{html}",
    "./frontend/modules/vistaAdministrador/mecanicos/mecanicoPrincipal.{js}",
    "./frontend/modules/vistaAdministrador/reparaciones/reparaciones.{html,js}",
    "./frontend/modules/vistaAdministrador/reportes/reportes/{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

