let simulate = document.querySelector('.submit-btn');
let back = document.querySelector('.back-btn');

simulate.addEventListener('click', (e) => {
    e.preventDefault();
    const floors = document.querySelector('#floors').value;
    const lifts = document.querySelector('#lifts').value;

     console.log(floors, "-- ",lifts);
    
     if (isNaN(floors) || floors < 1 || floors > 50) {
        alert('Please enter a valid number of floors between 1 and 50.');
        return;
      }
    
      if (isNaN(lifts) || lifts < 2 || lifts > 50) {
        alert('Please enter a valid number of lifts between 2 and 50.');
        return;
      }

    document.querySelector('.lifts-section').style.display = 'block';
    document.querySelector('.input-section').style.display = 'none';
});
      

back.addEventListener('click',gobackToInput)

function gobackToInput() {
    document.querySelector('.lifts-section').style.display = 'none';
    document.querySelector('.input-section').style.display = 'block';

}