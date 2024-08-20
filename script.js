function calculate() {
    
    const floors = parseInt(document.getElementById("floors").value);
    const lifts = parseInt(document.getElementById("lifts").value);

  
    document.getElementById("input-section").style.display = "none";

  
    document.getElementById("floors-result").textContent = floors;
    document.getElementById("lifts-result").textContent = lifts;
}

function showInputSection() {
    document.getElementById("input-section").style.display = "block";
    document.getElementById("result-section").style.display = "none";
}
function createLiftUI() {
    const elevatorShaft = document.querySelector('.elevator-shaft');
  
    dataStore.lifts.forEach(lift => {
      const liftElement = document.createElement('div');
      liftElement.classList.add('lift');
      liftElement.dataset.liftId = lift.id;
  
      // Add elements for doors, floor indicators, and direction indicators
      const doors = document.createElement('div');
      doors.classList.add('doors');
      liftElement.appendChild(doors);
  
      const floorIndicator = document.createElement('div');
      floorIndicator.classList.add('floor-indicator');
      liftElement.appendChild(floorIndicator);
  
      const directionIndicator = document.createElement('div');
      directionIndicator.classList.add('direction-indicator');
      liftElement.appendChild(directionIndicator);
  
      elevatorShaft.appendChild(liftElement);
    });
  }

let dataStore = {};

function startSimulation() {

    document.getElementById("input-section").style.display = "none";
  const numFloors = parseInt(document.getElementById('floors').value);
  const numLifts = parseInt(document.getElementById('lifts').value);

  dataStore = {
    numFloors,
    numLifts,
    lifts: [],
    floorButtons: []
  };

  // Initialize lifts and floor buttons based on the new values
  initializeLiftsAndFloors();
  createLiftUI();
}

function initializeLiftsAndFloors() {
  dataStore.lifts = Array.from({ length: dataStore.numLifts }, (_, i) => ({
    id: i + 1,
    currentFloor: 1,
    status: 'idle',
    direction: 'up'
  }));

  dataStore.floorButtons = Array.from({ length: dataStore.numFloors }, (_, i) => ({
    floor: i + 1,
    pressed: false
  }));
}

function createUI() {
    const elevatorContainer = document.querySelector('.elevator-container');
    const floorContainer = document.querySelector('.floor-container');
  
    // Create lift elements
    dataStore.lifts.forEach(lift => {
      const liftElement = document.createElement('div');
      liftElement.classList.add('lift');
      liftElement.dataset.liftId = lift.id; // Add data attribute for identification
  
      // Basic lift visualization (you can customize this)
      liftElement.textContent = `Lift ${lift.id}`;
  
      elevatorContainer.appendChild(liftElement);
    });
  
    // Create floor elements and buttons
    for (let floor = dataStore.numFloors; floor >= 1; floor--) {
      const floorElement = document.createElement('div');
      floorElement.classList.add('floor');
      floorElement.textContent = floor;
  
      const floorButton = document.createElement('button');
      floorButton.textContent = 'Up';
      floorButton.dataset.floor = floor;
      floorButton.addEventListener('click', () => handleFloorButtonClick(floor));
  
      floorElement.appendChild(floorButton);
      floorContainer.appendChild(floorElement);
    }
  }