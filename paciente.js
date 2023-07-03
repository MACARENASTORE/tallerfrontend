document.addEventListener('DOMContentLoaded', () => {
  const pacienteForm = document.getElementById('pacienteForm');
  pacienteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (pacienteForm.checkValidity()) {
      const cedula = document.getElementById('cedula').value;
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const fecha = document.getElementById('fecha').value;
      const telefono = document.getElementById('telefono').value;

      const formData = {
        cedula,
        nombre,
        apellido,
        fecha,
        telefono
      };

      try {
        const response = await fetch('http://localhost:3001/pacientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          document.getElementById('message').textContent = 'Datos enviados correctamente.';
          pacienteForm.reset();
        } else {
          document.getElementById('message').textContent = 'Error al enviar los datos.';
        }
      } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = 'Error al enviar los datos.';
      }
    }
    pacienteForm.classList.add('was-validated');
  });
});
