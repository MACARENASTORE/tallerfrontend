class FormEngine {
  async medico() {
    const response = await fetch('http://localhost:3000/formulario/Medico');
    const form = await response.json();

    const formContainer = document.createElement('div');
    formContainer.classList.add('container');

    const formElement = document.createElement('form');
    formElement.classList.add('form');

    for (const [key, value] of Object.entries(form.properties)) {
      const label = document.createElement('label');
      label.innerText = key;
      formElement.appendChild(label);

      const inputContainer = document.createElement('div');
      inputContainer.classList.add('form-input-container');

      const input = document.createElement('input');
      input.name = key;
      input.classList.add('form-control');

      if (value.type === 'integer') {
        input.type = 'number';
      } else {
        input.type = 'text';
      }

      inputContainer.appendChild(input);
      formElement.appendChild(inputContainer);
    }

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.innerHTML = '<i class="bi bi-cloud-arrow-up-fill me-2"></i>Enviar';
    formElement.appendChild(submitButton);

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const updateButton = document.createElement('button');
    updateButton.type = 'button';
    updateButton.classList.add('btn', 'btn-secondary');
    updateButton.innerHTML = '<i class="bi bi-pencil-fill me-2"></i>Actualizar';
    formElement.appendChild(updateButton);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.innerHTML = '<i class="bi bi-trash-fill me-2"></i>Eliminar';
    formElement.appendChild(deleteButton);

    formElement.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const formValues = Object.fromEntries(formData.entries());

      const response = await fetch('http://localhost:3000/crear_medico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      if (response.ok) {
        messageElement.textContent = 'Datos enviados Gracias';
      } else {
        messageElement.textContent = 'Error al enviar los datos ';
      }
    });

    updateButton.addEventListener('click', async () => {
      const formData = new FormData(formElement);
      const formValues = Object.fromEntries(formData.entries());

      const response = await fetch('http://localhost:3000/actualizar_medico/tarjetaProfesional', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      if (response.ok) {
        messageElement.textContent = 'Datos actualizados ';
      } else {
        messageElement.textContent = 'Error al actualizar los datos ';
      }
    });

    deleteButton.addEventListener('click', async () => {
      const formData = new FormData(formElement);
      const formValues = Object.fromEntries(formData.entries());

      const response = await fetch('http://localhost:3000/eliminar_medico/tarjetaProfesional', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      if (response.ok) {
        messageElement.textContent = 'Datos eliminados ';
      } else {
        messageElement.textContent = 'Error al eliminar los datos ';
      }
    });

    formContainer.appendChild(formElement);
    formContainer.appendChild(messageElement);
    document.body.appendChild(formContainer);
  }
}

const miFormEngine = new FormEngine();
miFormEngine.medico();