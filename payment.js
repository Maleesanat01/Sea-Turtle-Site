console.info("Pay store loaded!");


// payment.js
document.addEventListener('alpine:init', () => {
  Alpine.data('payDetails', () => ({
    cardNum: '',
    ExpireDate: '',
    cvc: '',
    nameOnCard: '',
    invalidExpiryDate: false,

    savePayDetails() {
      this.nameOnCard = this.nameOnCard.replace(/[^A-Za-z\s]/g, ''); //only letters 
      localStorage.setItem('cardNum', this.cardNum);
      localStorage.setItem('ExpireDate', this.ExpireDate);
      localStorage.setItem('cvc', this.cvc);
      localStorage.setItem('nameOnCard', this.nameOnCard);
    },

    loadPayDetails() {
      const storedCardNum = localStorage.getItem('cardNum');
      if (storedCardNum) {
        this.cardNum = storedCardNum;
      }

      const storedExpireDate = localStorage.getItem('ExpireDate');
      if (storedExpireDate) {
        this.ExpireDate = storedExpireDate;
      }

      const storedCvc = localStorage.getItem('cvc');
      if (storedCvc) {
        this.cvc = storedCvc;
      }

      const storedNameOnCard = localStorage.getItem('nameOnCard');
      if (storedNameOnCard) {
        this.nameOnCard = storedNameOnCard;
      }
    },

    // to validate and save the expiry date
    validateAndSaveExpireDate() {
      const datePattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
      if (this.ExpireDate.match(datePattern)) {
        const [month, year] = this.ExpireDate.split('/');
        const today = new Date();
        const currentYear = today.getFullYear() % 100; // Extract last two digits of the current year

        // Check if year is in future or if year is the current year and the month is not expired yet
        if (parseInt(year, 10) > currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) >= today.getMonth() + 1)) {
          // Valid expiry date, save to local storage
          localStorage.setItem('ExpireDate', this.ExpireDate);
          this.invalidExpiryDate = false;
          return;
        }
      }

      // Invalid expiry date, clear local storage key
      localStorage.removeItem('ExpireDate');
      this.invalidExpiryDate = true;
    },

    Continue(){
      // redirect to the confirmation pg 
      window.location.href = 'confirmation.html';
    },
  }));
});

