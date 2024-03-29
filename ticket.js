//ticket.js file

console.info("Ticket store loaded!");

document.addEventListener('alpine:init', () => {
  Alpine.data('tickets', () => ({
      date: null,
      totalPrice:0,
      TimeDuration:0,
      Guests: [
            {
              name: 'Foreign Adult',
              normal: 10,
              peak: 13,
              count: 0,
              total: 0
          },
          {
              name: 'Foreign Child',
              normal: 5,
              peak: 8,
              count: 0,
              total: 0
          },
          {
              name: 'Sri Lankan Adult',
              normal: 4,
              peak: 6,
              count: 0,
              total: 0
          },
          {
              name: 'Sri Lankan Child',
              normal: 2,
              peak: 3,
              count: 0,
              total: 0
          },
          {
              name: 'Infant',
              normal: 0,
              peak: 0,
              count: 0,
              total: 0
          },
      ],
      Times: [
          {
              title: '7am to 8am',
              isPeak: false
          },
          {
              title: '8am to 9am',
              isPeak: false
          },
          {
              title: '9am to 10am',
              isPeak: false
          },
          {
              title: '10am to 11am (Peak)',
              isPeak: true
          },
          {
              title: '11am to 12am (Peak)',
              isPeak: true
          },
          {
              title: '12pm to 1pm (Peak)',
              isPeak: true
          },
          {
              title: '1pm to 2pm',
              isPeak: false
          },
          {
              title: '2pm to 3pm',
              isPeak: false
          },
          {
              title: '3pm to 4pm (Peak)',
              isPeak: true
          },
          {
              title: '4pm to 5pm (Peak)',
              isPeak: true
          },
          {
              title: '5pm to 6pm (Peak)',
              isPeak: true
          },
      ],

      selectedTimeSlots: [], //array that holds indices of selected time slots

      showTimes: false, //to control the select time slot option

      disablePastDate(){ 
        const dateInput = document.getElementById('date'); //fetches date input field in html
        const currentDate = new Date(); //date object w current date 
        const formattedDate = currentDate.toISOString().split('T')[0]; //fornat current date to ISO 8601 standard YYYY-MM-DDTHH:mm:ss.sssZ" and extract only the part b4 the 'T'
        dateInput.setAttribute('min', formattedDate); //set min date that can be selected to the extracted date
      },

      selectTimeSlot(index) { //to ensure that time slots are selected consecutively

          // if index is already in array remove it from array to allow for toggling the selection
          if (this.selectedTimeSlots.includes(index)) {
              this.selectedTimeSlots = this.selectedTimeSlots.filter(item => item !== index);

          } else { //else store the selected time slot index to the selectTimeSlots array
             // Get the index of the last selected time slot 
            let lastElement = this.selectedTimeSlots[this.selectedTimeSlots.length - 1];

            // Check if the array is empty or if the selected index is exactly one more than the last selected index
              if (!this.selectedTimeSlots.length || index - 1 == lastElement) {
                // Add the index to the selectedTimeSlots array  
                this.selectedTimeSlots.push(index);

              } else {
                  alert('Please select consecutive time slots only');
              }
          }

          //sort array to ensure the time slots are in ascending order
          this.selectedTimeSlots = this.selectedTimeSlots.sort();
          this.TimeDuration = this.selectedTimeSlots.length;

          console.log(this.selectedTimeSlots);
      },


      calculate(Guest) { //to calculate total price for each guest type

          let total = 0;

          this.selectedTimeSlots.forEach((timeSlotIndex) => {
             // For each selected time slot, calculate the total price based on guest type

              // calculating total for each guest type  // If the time slot is a peak time, use the Guest peak price; otherwise, use the  Guest normal price
              total += parseInt(Guest.count * (this.Times[timeSlotIndex].isPeak ? Guest.peak : Guest.normal));
          });

          Guest.total = total;
          this.CalculateTotal();
      },

      // function to calculate total payable
      CalculateTotal(Guest) { 

        let totalPrice = 0;

        this.Guests.forEach((Guest) => {             
            
            totalPrice += Guest.total;
        });

        this.totalPrice = totalPrice;

        console.log("Total price equal ", totalPrice);
    },

      Continue(){
          localStorage.setItem('Guests', JSON.stringify(this.Guests));
          localStorage.setItem('selectedTimeSlots',JSON.stringify(this.selectedTimeSlots));
          localStorage.setItem('Times', JSON.stringify(this.Times));
          localStorage.setItem('date',this.date);
          localStorage.setItem('totalPrice', this.totalPrice);
          localStorage.setItem('timeDuration',JSON.stringify(this.selectedTimeSlots.length));
          localStorage.setItem('TimeDuration',this.TimeDuration);

          // if total price is not 0 lead to the details page
          if(this.totalPrice!==0){
            window.location.href = 'details.html';
          }
        
      },

  }));
})


