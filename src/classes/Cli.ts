// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";

// define the Cli class
class Cli {

  // vehicles property to store an array of vehicles
  vehicles: (Car | Truck | Motorbike)[];

  // selectedVehicleVin property to store the vin of the selected vehicle
  selectedVehicleVin: string | undefined;

  // exit property to determine if the user wants to exit the cli
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the vin
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        }
        else if (answers.vehicleType === 'Truck') {
          // create a truck
          this.createTruck();
        }
        else if (answers.vehicleType === 'Motorbike') {
          // create a motorbike
          this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        // push the car to the vehicles array
        this.vehicles.push(car);
        console.log(`Car created.`);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();

      });
  }

  //method to create truck
  // method to create truck
  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        }
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity),
        );
        // push the truck to the vehicles array
        this.vehicles.push(truck);
        console.log(`Truck created.`);
        // set the selectedVehicleVin to the vin of the truck
        this.selectedVehicleVin = truck.vin;
        // perform actions on the truck
        this.performActions();

      });
  }

  // method to create motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
        );
        motorbike.wheelie();


        // push the motorbike to the vehicles array

        this.vehicles.push(motorbike);
        console.log(`Motorbike created.`);

        // set the selectedVehicleVin to the vin of the motorbike

        this.selectedVehicleVin = motorbike.vin;

        // perform actions on the motorbike

        this.performActions();
      });
  }

  // method to find a vehicle to tow
  findVehicleToTow(vehicle: Truck | Motorbike | Car): void {

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicle',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // find the selected vehicle
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === answers.vehicle) {
            // check if the selected vehicle is the truck
            if (this.vehicles[i] instanceof Truck) {
              // log that the truck cannot tow itself
              console.log('Truck cannot tow itself');
              this.performActions();
            } else {
              // tow the selected vehicle
              const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
              if (selectedVehicle instanceof Truck) {
                // tow the selected vehicle
                // call the tow method of the truck from truck.ts and pass the selected vehicle as an argument
                selectedVehicle.tow(this.vehicles[i]);
              } else {
                console.log('Selected vehicle is not a truck and cannot tow');
              }
              // perform actions on the truck
              this.performActions();
            }
          }
        }
      }
      );
  }



  // method to perform actions on a vehicle
  performActions(): void {
    inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action',
        choices: [
          'Print details',
          'Start vehicle',
          'Accelerate 5 MPH',
          'Decelerate 5 MPH',
          'Stop vehicle',
          'Turn right',
          'Turn left',
          'Reverse',
          'Tow',
          'Do A Wheelie!',
          'Select or create another vehicle',
          'Exit',
        ],
      },
    ])
      .then((answers) => {
        // perform the selected action
        if (answers.action === 'Print details') {
          // find the selected vehicle and print its details
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].printDetails();
              this.performActions();
            }
          }
        } else if (answers.action === 'Start vehicle') {
          // find the selected vehicle and start it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].start();
              this.performActions();
            }
          }
        } else if (answers.action === 'Accelerate 5 MPH') {
          // find the selected vehicle and accelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].accelerate(5);
              this.performActions();
            }
          }
        } else if (answers.action === 'Decelerate 5 MPH') {
          // find the selected vehicle and decelerate it by 5 MPH
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].decelerate(5);
              this.performActions();
            }
          }
        } else if (answers.action === 'Stop vehicle') {
          // find the selected vehicle and stop it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].stop();
              this.performActions();
            }
          }
        } else if (answers.action === 'Turn right') {
          // find the selected vehicle and turn it right
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('right');
              this.performActions();
            }
          }
        } else if (answers.action === 'Turn left') {
          // find the selected vehicle and turn it left
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].turn('left');
              this.performActions();
            }
          }
        } else if (answers.action === 'Reverse') {
          // find the selected vehicle and reverse it
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              this.vehicles[i].reverse();
              this.performActions();
            }
          }
        } else if (answers.action === 'Tow') {
          for (let i = 0; i < this.vehicles.length; i++) {
            // check if the selected vehicle is a truck
            //if vehicle is a truck, call the findVehicleToTow method
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              if (this.vehicles[i] instanceof Truck) {
                this.findVehicleToTow(this.vehicles[i]);
                return;
                //if vehicle is not a truck, log that the vehicle cannot tow
              } else if (this.vehicles[i] instanceof Car || this.vehicles[i] instanceof Motorbike) {
                console.log('This vehicle cannot tow.');
                this.performActions();

              }
            }
          }
        } else if (answers.action === 'Do A Wheelie!') {
          // find the selected vehicle and only if it is a motorbike, do a wheelie
          for (let i = 0; i < this.vehicles.length; i++) {
            if (this.vehicles[i].vin === this.selectedVehicleVin) {
              if (this.vehicles[i] instanceof Motorbike) {
                (this.vehicles[i] as Motorbike).wheelie();
              } else {
                console.log('This vehicle cannot do a wheelie :(');
              }
              this.performActions();
            }
          }
        }

        // start the cli to return to the initial prompt if the user wants to select or create another vehicle
        else if (answers.action === 'Select or create another vehicle') {
          this.startCli();
        } else if (answers.action === 'Exit') {
          this.exit = true;
        } else {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}


// export the Cli class
export default Cli;

