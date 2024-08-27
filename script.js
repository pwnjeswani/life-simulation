let simulate = document.querySelector('.submit-btn');
let back = document.querySelector('.back-btn');

const floorHeightInPx = getComputedStyle(document.querySelector("html")).getPropertyValue("--floor-height");
const floorHeight = parseInt(floorHeightInPx.slice(0, floorHeightInPx.length - 2));
let liftsCount, floorsCount;
const liftsAvailabilitiy = new Map();
const liftAt = new Map();
const floorLiftMap = new Map();
const pendingCalls = [];

simulate.addEventListener('click', (e) => {
    e.preventDefault();
    floorsCount = document.querySelector('#floors').value;
    liftsCount = document.querySelector('#lifts').value;

     console.log(floorsCount, "-- ",lifts);
    
     if (isNaN(floorsCount) || floorsCount < 1) {
        alert('Please enter a valid number of floors more than 1');
        return;
      }
    
      if (isNaN(liftsCount) || liftsCount < 2 || liftsCount > 50) {
        alert('Please enter a valid number of lifts between 2 and 50.');
        return;
      }

    document.querySelector('.lifts-section').style.display = 'block';
    document.querySelector('.input-section').style.display = 'none';
    console.log('second page is visbile now')
    createFloors(floorsCount,liftsCount);
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
  
    for (let currentFloor = totalFloors-1; currentFloor >= 0; currentFloor--) {
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
      upButton.addEventListener("click", (event) => handleLiftCall(currentFloor));
        
  
      // Create button element for Down
      const downButton = document.createElement('button');
      downButton.className = 'down';
      downButton.textContent = 'Down';
      downButton.id = `down${currentFloor}`;
      downButton.addEventListener("click", (event) => handleLiftCall(currentFloor));
  
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
      if (currentFloor == totalFloors-1) {
        upButton.style.display = 'none';
      } else if (currentFloor == 0) {
        downButton.style.display = 'none';
      }
  
      // Append floor element to container
      const floorId = `floor-${currentFloor}`;
      floorLiftMap.set(floorId,null);
      floorContainer.appendChild(floorElement);
    }
    // Create the main lift container
    let liftContainer = document.createElement('div');
    floorLiftMap.set("floor-0", null);
    liftContainer.classList.add('mainLift');

    // Loop to create individual lifts
    for (let currentLift = 1; currentLift <= liftCount; currentLift++) {

        console.log("inside lifts loop now")
        // Create a single lift element
        let liftElement = document.createElement('div');
        liftElement.classList.add('lift');
        liftElement.id = `lift${currentLift}`;
        liftElement.setAttribute('flag', 'free');

        // Create the gates container
        let gatesContainer = document.createElement('div');
        gatesContainer.classList.add('gates');
        gatesContainer.id = `gates`;

        // Create the floor number display
        let floorNumberDisplay = document.createElement('div');
        floorNumberDisplay.classList.add('floornobox');
        floorNumberDisplay.id = `lifts${currentLift}`;
        gatesContainer.appendChild(floorNumberDisplay);

        // Create the individual gate elements
        let gate1 = document.createElement('div');
        gate1.classList.add('gate1');
        gatesContainer.appendChild(gate1);

        let gate2 = document.createElement('div');
        gate2.classList.add('gate2');
        gatesContainer.appendChild(gate2);

        // Add the gates container to the lift element
        liftElement.appendChild(gatesContainer);

        // Add the lift element to the main container
        liftContainer.appendChild(liftElement);
        liftsAvailabilitiy.set(`lift${currentLift}`, true);
        liftAt.set(`lift${currentLift}`, 0);
    
    }

    // Select all created buttonLift elements
    const buttonLiftElements = document.querySelectorAll('.buttonLift');

    // Get the last buttonLift element
    const lastButtonLift = buttonLiftElements[buttonLiftElements.length - 1];

    // Append the main lift container to the last buttonLift element
    lastButtonLift.appendChild(liftContainer);
    

}

function handleLiftCall(currentFloor){
    console.log("handleLiftCall ---- with currentFloor",currentFloor);
    const floorId = `floor-${currentFloor}`;
    if(floorLiftMap.get(floorId) != null){
        const mappedLiftId = floorLiftMap.get(floorId);
        if(liftsAvailabilitiy.get(mappedLiftId)){
            liftsAvailabilitiy.set(mappedLiftId, false);
            openAndCloseDoors(floorId, mappedLiftId);
        }
        return;
    }
    //search for a freeLift
    for(let liftNumber = 1; liftNumber <= liftsCount; liftNumber++){
        const liftId = `lift${liftNumber}`;
        if(liftsAvailabilitiy.get(liftId)){
            moveLift(floorId, liftId);
            return;
        }
    }
    
    pendingCalls.push(floorId);
}   

function moveLift(floorId, liftId){
    if(floorLiftMap.get(floorId) != null){
        const mappedLiftId = floorLiftMap.get(floorId);
        if(liftsAvailabilitiy.get(mappedLiftId)){
            liftsAvailabilitiy.set(mappedLiftId, false);
            openAndCloseDoors(floorId, mappedLiftId);
        }
        return;
    }

    liftsAvailabilitiy.set(liftId, false);
    floorLiftMap.set(floorId, liftId);
    floorLiftMap.forEach((value, key) => {
        if(key !== floorId && value === liftId){
            floorLiftMap.set(key, null);
        }
    });

    const floor = document.querySelector(`#${floorId}`);
    console.log("before document.querySelector lifId is - ",liftId);
    const lift = document.querySelector(`#${liftId}`);
    const arr = floorId.split('-');
    const floorNumber = parseInt(arr[arr.length - 1]);
    console.log("before document.querySelector floorNumber is - ",floorNumber);
    const prevFloor = liftAt.get(liftId);
    const diff = Math.abs(prevFloor - floorNumber);
    const transitionDuration = diff*2;

    console.log("floorNumber*floorHeight",floorNumber*floorHeight)

    console.log("floorNumber",floorNumber)

    console.log("floorHeight",floorHeight)
    lift.style.transform = `translateY(-${floorNumber*floorHeight}px)`;
    lift.style.transition  = `all ${transitionDuration}s`;
    setTimeout(() => {
        openAndCloseDoors(floorId, liftId);
    }, transitionDuration * 1000);  

    liftAt.set(liftId, floorNumber);
}

function openAndCloseDoors(floorId, liftId) {

    const lift = document.querySelector(`#${liftId}`);
    const leftDoor = lift.querySelector(".gate1");
    const rightDoor = lift.querySelector(".gate2");
    leftDoor.classList.add("left-move");
    rightDoor.classList.add("right-move");  
    setTimeout(() => {
        leftDoor.classList.remove("left-move");
        rightDoor.classList.remove("right-move"); 
        //this lift will be free after 2500ms
        setTimeout(() => {
            liftsAvailabilitiy.set(liftId, true);
            if(pendingCalls.length > 0){
                const floorIdFromRemainingCalls = pendingCalls[0];
                pendingCalls.shift();
                moveLift(floorIdFromRemainingCalls, liftId);
            }
        }, 2500);
    }, 2500);
}
