let simulate = document.querySelector('.submit-btn');
let back = document.querySelector('.back-btn');

simulate.addEventListener('click', (e) => {
    e.preventDefault();
    const floors = parseInt(document.getElementById("floors").value);
    const lifts = parseInt(document.getElementById("lifts").value);
    
    document.querySelector('.lifts-section').style.display = 'block';
    document.querySelector('.input-section').style.display = 'none';
});
      

back.addEventListener('click',gobackToInput)

function gobackToInput() {
    document.querySelector('.lifts-section').style.display = 'none';
    document.querySelector('.input-section').style.display = 'block';

}