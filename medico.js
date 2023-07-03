document.addEventListener('DOMContentLoaded', () => {
  const medicoForm = document.getElementById('medicoForm');
  medicoForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (medicoForm.checkValidity()) {
      const tarjetaProfesional = document.getElementById('tarjetaProfesional').value;
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const consultorio = document.getElementById('consultorio').value;
      const correo = document.getElementById('correo').value;
      const idEspecialidad = document.getElementById('idEspecialidad').value;

      const formData = {
        tarjetaProfesional,
        nombre,
        apellido,
        consultorio,
        correo,
        idEspecialidad
      };

      try {
        const response = await fetch('http://localhost:3001/medicos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          document.getElementById('message').textContent = 'Datos enviados correctamente.';
          medicoForm.reset();
        } else {
          document.getElementById('message').textContent = 'Error al enviar los datos.';
        }
      } catch (error) {
        console.error(error);
        document.getElementById('message').textContent = 'Error al enviar los datos.';
      }
    }
    medicoForm.classList.add('was-validated');
  });
});
