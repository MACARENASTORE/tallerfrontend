class FormEngine {
    async cita() {
      const response = await fetch('http://localhost:3001/formulario/Cita');
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
  
      formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());
  
        const response = await fetch('http://localhost:3001/Cita', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formValues)
        });
  
        if (response.ok) {
          console.log('Datos enviados a la base de datos');
        } else {
          console.error('Error al enviar los datos a la base de datos');
        }
      });
  
      formContainer.appendChild(formElement);
      document.body.appendChild(formContainer);
    }
  }
  
  const miFormEngine = new FormEngine();
  miFormEngine.cita();
  