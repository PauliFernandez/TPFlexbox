 // Validaciones
 const form = document.getElementById('myForm');
 const fullNameInput = document.getElementById('fullname');
 const emailInput = document.getElementById('email');
 const passwordInput = document.getElementById('password');
 const confirmPasswordInput = document.getElementById('confirm-password');
 const ageInput = document.getElementById('age');
 const phoneInput = document.getElementById('phone');
 const addressInput = document.getElementById('address');
 const cityInput = document.getElementById('city');
 const postalCodeInput = document.getElementById('postal-code');
 const dniInput = document.getElementById('dni');
 const errorElements = document.getElementsByClassName('error');

 iniciarDatos();

 function iniciarDatos() {
    var datosForm = localStorage.getItem('datos-form');

    if (!!datosForm) {
        datosFormJson = JSON.parse(datosForm);
        fullNameInput.value = datosFormJson.fullname;
        emailInput.value = datosFormJson.email;
        passwordInput.value = datosFormJson.password;
        confirmPasswordInput.value = datosFormJson['confirm-password']
        ageInput.value = datosFormJson.age;
        phoneInput.value = datosFormJson.phone;
        addressInput.value = datosFormJson.address;
        cityInput.value = datosFormJson.city;
        postalCodeInput.value = datosFormJson['postal-code'];
        dniInput.value = datosFormJson.dni;
    }
 }

 function showError(input, message) {
     const errorElement = document.getElementById(`${input.id}-error`);
     errorElement.innerText = message;
     input.classList.add('error-input');
 }
 
 function clearError(input) {
     const errorElement = document.getElementById(`${input.id}-error`);
     errorElement.innerText = '';
     input.classList.remove('error-input');
 }
 
 function validateFullName() {
     const value = fullNameInput.value.trim();
     if (value === '') {
         showError(fullNameInput, 'El nombre completo es requerido');
     } else if (value.split(' ').length < 2) {
         showError(fullNameInput, 'Debe ingresar al menos un nombre y un apellido');
     } else if (value.length <= 6) {
         showError(fullNameInput, 'El nombre completo debe tener más de 6 letras');
     } else {
         clearError(fullNameInput);
     }
 }
 
 function validateEmail() {
     const value = emailInput.value.trim();
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (value === '') {
         showError(emailInput, 'El email es requerido');
     } else if (!emailRegex.test(value)) {
         showError(emailInput, 'El email no es válido');
     } else {
         clearError(emailInput);
     }
 }
 
 function validatePassword() {
     const value = passwordInput.value;
     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
     if (value === '') {
         showError(passwordInput, 'La contraseña es requerida');
     } else if (!passwordRegex.test(value)) {
         showError(passwordInput, 'La contraseña debe tener al menos 8 caracteres, formados por letras y números');
     } else {
         clearError(passwordInput);
     }
 }
 
 function validateConfirmPassword() {
     const value = confirmPasswordInput.value;
     if (value === '') {
         showError(confirmPasswordInput, 'Debe confirmar la contraseña');
     } else if (value !== passwordInput.value) {
         showError(confirmPasswordInput, 'Las contraseñas no coinciden');
     } else {
         clearError(confirmPasswordInput);
     }
 }
 
 function validateAge() {
     const value = parseInt(ageInput.value);
     if (isNaN(value)) {
         showError(ageInput, 'La edad debe ser un número entero');
     } else if (value < 18) {
         showError(ageInput, 'Debe ser mayor o igual a 18 años');
     } else {
         clearError(ageInput);
     }
 }
 
 function validatePhone() {
  const value = phoneInput.value.replace(/[^\d]/g, '');
  if (value === '') {
      showError(phoneInput, 'El teléfono es requerido');
  } else if (value.length < 7) {
      showError(phoneInput, 'El teléfono debe tener al menos 7 dígitos');
  } else {
      clearError(phoneInput);
  }
}

function validateAddress() {
  const value = addressInput.value.trim();
  if (value === '') {
      showError(addressInput, 'La dirección es requerida');
  } else if (value.length < 5) {
      showError(addressInput, 'La dirección debe tener al menos 5 caracteres');
  } else {
      clearError(addressInput);
  }
}

function validateCity() {
  const value = cityInput.value.trim();
  if (value === '') {
      showError(cityInput, 'La ciudad es requerida');
  } else if (value.length < 3) {
      showError(cityInput, 'La ciudad debe tener al menos 3 caracteres');
  } else {
      clearError(cityInput);
  }
}

function validatePostalCode() {
  const value = postalCodeInput.value.trim();
  if (value === '') {
      showError(postalCodeInput, 'El código postal es requerido');
  } else if (value.length < 3) {
      showError(postalCodeInput, 'El código postal debe tener al menos 3 caracteres');
  } else {
      clearError(postalCodeInput);
  }
}

function validateDNI() {
  const value = dniInput.value.trim();
  const dniRegex = /^\d{7,8}$/;
  if (value === '') {
      showError(dniInput, 'El DNI es requerido');
  } else if (!dniRegex.test(value)) {
      showError(dniInput, 'El DNI debe tener 7 u 8 dígitos');
  } else {
      clearError(dniInput);
  }
}

function validateForm(e) {
  e.preventDefault();
  
  validateFullName();
  validateEmail();
  validatePassword();
  validateConfirmPassword();
  validateAge();
  validatePhone();
  validateAddress();
  validateCity();
  validatePostalCode();
  validateDNI();
  
  if (form.getElementsByClassName('error-input').length === 0) {
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
                }
                console.log(response);
                return response;
        })
        .then(data => {
            // Mostrar el mensaje de éxito o error en el modal
            const formData = new FormData(form);
            const formValues = Object.fromEntries(formData.entries());
            const datosForm = JSON.stringify(formValues, null, 2);

            localStorage.setItem('datos-form', datosForm)
            alert('Suscripción exitosa\n\n' + JSON.stringify(datosForm, null, 2));
        })
        .catch(error => {
            // Mostrar mensaje de error en el modal
            alert('Ocurrió un error al procesar la solicitud\n\n' + error);
        });
  }
}

// Event Listeners
fullNameInput.addEventListener('blur', validateFullName);
fullNameInput.addEventListener('focus', function () { clearError(fullNameInput); });
emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('focus', function () { clearError(emailInput); });
passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('focus', function () { clearError(passwordInput); });
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
confirmPasswordInput.addEventListener('focus', function () { clearError(confirmPasswordInput); });
ageInput.addEventListener('blur', validateAge);
ageInput.addEventListener('focus', function () { clearError(ageInput); });
phoneInput.addEventListener('blur', validatePhone);
phoneInput.addEventListener('focus', function () { clearError(phoneInput); });
addressInput.addEventListener('blur', validateAddress);
addressInput.addEventListener('focus', function () { clearError(addressInput); });
cityInput.addEventListener('blur', validateCity);
cityInput.addEventListener('focus', function () { clearError(cityInput); });
postalCodeInput.addEventListener('blur', validatePostalCode);
postalCodeInput.addEventListener('focus', function () { clearError(postalCodeInput); });
dniInput.addEventListener('blur', validateDNI);
dniInput.addEventListener('focus', function () { clearError(dniInput); });
form.addEventListener('submit', validateForm);
  