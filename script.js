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
    console.log('second page is visbile now')
    createFloors(floors,lifts);
});    

back.addEventListener('click',gobackToInput)

function gobackToInput() {
    document.querySelector('.lifts-section').style.display = 'none';
    document.querySelector('.input-section').style.display = 'block';

    deleteFloors();
}

function deleteFloors() {
    let floorsEntered = document.querySelector('#floors').value;

    for (let i = floorsEntered; i > 0; i--) {
        let floordiv = document.querySelector('.box');
        floordiv.remove();
    }
}

function createFloors(totalFloors, liftCount) {
    const floorContainer = document.querySelector('.lifts-section');
  
    for (let currentFloor = totalFloors; currentFloor > 0; currentFloor--) {
      // Create floor element
      const floorElement = document.createElement('div');
      floorElement.classList.add('box');
  
      // Create button container
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('buttonLift');
  
      // Create button element for Up
      const upButton = document.createElement('button');
      upButton.className  = 'up';
      upButton.textContent = 'Up';
      upButton.id = `up${currentFloor}`;
  
      // Create button element for Down
      const downButton = document.createElement('button');
      downButton.className = 'down';
      downButton.textContent = 'Down';
      downButton.id = `down${currentFloor}`;
  
      // Add buttons to button container
      buttonContainer.appendChild(upButton);
      buttonContainer.appendChild(downButton);
  
      // Create floor name separator
      const floorSeparator = document.createElement('div');
      floorSeparator.classList.add('hrfloorName');
  
      const separatorLine = document.createElement('hr');
      const floorNumber = document.createElement('span');
      floorNumber.textContent = `Floor ${currentFloor}`;
  
      floorSeparator.appendChild(separatorLine);
      floorSeparator.appendChild(floorNumber);
  
      // Add buttons and separator to floor element
      floorElement.appendChild(buttonContainer);
      floorElement.appendChild(floorSeparator);
  
      // Hide buttons based on floor number
      if (currentFloor == totalFloors) {
        upButton.style.display = 'none';
      } else if (currentFloor == 1) {
        downButton.style.display = 'none';
      }
  
      // Append floor element to container
      floorContainer.appendChild(floorElement);
    }
  }