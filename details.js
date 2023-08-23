//detail.js file

console.info('Customer store loaded!');

document.addEventListener('alpine:init', () => {
  Alpine.data('CustomerDetails', () => ({
    name: '', 
    email: '',
    confirmEmail: '',
    phone: '',
    countryCode: '',
    gender: '',
    showError: false,
    emailPattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, //email format

      loadDetails() {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
          this.name = storedName;
        }
  
        const storedemail = localStorage.getItem('userEmail');
        if (storedemail) {
          this.email = storedemail;
        }
  
        const storedconfemail = localStorage.getItem('userConfEmail');
        if (storedconfemail) {
          this.confirmEmail = storedconfemail;
        }

        const storedGender = localStorage.getItem('selectedGender');
        if (storedGender) {
          this.gender = storedGender;
      }
  
        
        const storedCountryCode = localStorage.getItem('countryCode');
        const storedPhone = localStorage.getItem('phone');
        
        if (storedPhone) {
            this.phone = storedPhone;
        }
        if (storedCountryCode) { 
            this.countryCode = storedCountryCode;
        }
      
  //for country code drop down
      const phoneInput = document.querySelector('.phone-input'); //select phone input field from html
      const iti = window.intlTelInput(phoneInput, { //where user will input phone number
        initialCountry: storedCountryCode || 'auto', //initial country code to be selected when pg is loaded (if already selected load from local storage else just auto)
        separateDialCode: true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js'
      });
  
       // Update the phone number & save to local sotrage
       phoneInput.addEventListener('input', () => {
        this.phone = iti.getNumber();
        this.saveDetails();
      });
  
      // Update the country code and save to local storage 
      phoneInput.addEventListener('countrychange', () => {
        this.countryCode = iti.getSelectedCountryData().iso2;
        this.saveCountryCodeToStorage(this.countryCode);
        this.saveDetails();
      });
  
      // Setting the country code in intlTelInput
      if (storedCountryCode) {
        this.countryCode=storedCountryCode;
        iti.setCountry(storedCountryCode);
      }
    },

    saveCountryCodeToStorage(code) {
      localStorage.setItem('countryCode', code);
    },
  

    // Function to save details to local storage
    saveDetails() {
      this.name = this.name.replace(/[^A-Za-z\s]/g, '');
      localStorage.setItem('userName', this.name);
      localStorage.setItem('userEmail', this.email);
      if (this.showError == false) {
        localStorage.setItem('userConfEmail', this.confirmEmail);
      }

      localStorage.setItem('selectedGender', this.gender);
      this.phoneWithCountryCode = this.countryCode + ' ' + this.phone;
    
    // Save combined phoneWithCountryCode to the phone key in local storage
    localStorage.setItem('phone', this.phone);
    localStorage.setItem('countryCode', this.countryCode); // Save the selected country code to local storage
    },

    validateEmail() {
      if (this.email !== this.confirmEmail) {
        this.showError = true;
      } else {
        this.showError = false;
      }
      // Save updated confirmEmail to local storage
      this.saveDetails();
    },

   restrictNonNumeric(event) {
    // Allow only numeric and control keys
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter'];
    const inputValue = event.target.value;

    // Check if the pressed key is a numeric key or an allowed control key
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      // Prevent default action of the event (e.g., typing the character)
      event.preventDefault();
    }

    // If input value contains non-numeric characters, remove them
    if (/\D/.test(inputValue)) {
      event.target.value = inputValue.replace(/\D/g, '');
    }
  },

  Continue(){
    // redirect to the payment pg
    if(!this.name || !this.email || this.showError || !this.phone){
      return;
    }
    else{
      window.location.href = 'payment.html';
    }
   
  },

  }));
});

