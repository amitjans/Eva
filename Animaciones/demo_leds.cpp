/*
 * Everloop rainbow example
 */

/////////////////////////
// INCLUDE STATEMENTS //
///////////////////////

// System calls
#include <unistd.h>
// Input/output streams and functions
#include <iostream>
// Included for sin() function.
#include <cmath>

// Interfaces with Everloop
#include "matrix_hal/everloop.h"
// Holds data for Everloop
#include "matrix_hal/everloop_image.h"
// Communicates with MATRIX device
#include "matrix_hal/matrixio_bus.h"

int main(int argc, char *argv[]) {
  ////////////////////
  // INITIAL SETUP //
  //////////////////

  
  char opcion = argv[1][0];
  std::cout<<opcion<<std::endl;
  // Create MatrixIOBus object for hardware communication
  matrix_hal::MatrixIOBus bus;
  // Initialize bus and exit program if error occurs
  if (!bus.Init()) return false;

  /////////////////
  // MAIN SETUP //
  ///////////////

  // Holds the number of LEDs on MATRIX device
  int ledCount = bus.MatrixLeds();
  // Create EverloopImage object, with size of ledCount
  matrix_hal::EverloopImage everloop_image(ledCount);
  // Create Everloop object
  matrix_hal::Everloop everloop;
  // Set everloop to use MatrixIOBus bus
  everloop.Setup(&bus);

  // Variables used for sine wave rainbow logic
  float counter = 0;
  long counter2 = 0;
  long counter3 = 0;
  const float freq = 0.375;

  switch(opcion){
    case '1':
	for (matrix_hal::LedValue &led : everloop_image.leds) {
    		// Turn off Everloop
    		led.red = 0;
    		led.green = 0;
    		led.blue = 0;
    		led.white = 0;
  	}

	break;
    case '2': 
	//for (int i = 0; i <= 250; i++) {
    	while(1){
	// For each led in everloop_image.leds, set led value
    		for (matrix_hal::LedValue &led : everloop_image.leds) {
      			// Sine waves 120 degrees out of phase for rainbow
      			led.red = (std::sin(freq * counter + (M_PI / 180 * 240)) * 155 + 100) / 10;
      			led.green = (std::sin(freq * counter + (M_PI / 180 * 120)) * 155 + 100) / 10;
      			led.blue = (std::sin(freq * counter + 0) * 155 + 100) / 10;
      			// If MATRIX Creator, increment by 0.51
      			if (ledCount == 35) {
        			counter = counter + 0.51;
      			}
      			// If MATRIX Voice, increment by 1.01
      			if (ledCount == 18) {
        			counter = counter + 1.01;
      			}
    		}

    		// Updates the LEDs
    		everloop.Write(&everloop_image);

    		// Sleep for 40000 microseconds
    		usleep(40000);
  	}
	break;
    
    case '3':
// 10 sec loop for rainbow effect 500*20000 microsec = 10 sec
while(1) {
    // For each led in everloop_image.leds, set led value to 0
    for (matrix_hal::LedValue &led : everloop_image.leds) {
    // Turn off Everloop
    led.red = 0;
    led.green = 0;
    led.blue = 40;
    }

    // Set led color per led
    //everloop_image.leds[(counter2 / 2) % everloop_image.leds.size()].red = 40;
    //everloop_image.leds[(counter2 / 2) % everloop_image.leds.size()].blue = 40;
    //everloop_image.leds[(counter2 / 7) % everloop_image.leds.size()].green = 60;
    //everloop_image.leds[(counter2 / 11) % everloop_image.leds.size()].blue = 60;
    //everloop_image.leds[everloop_image.leds.size()-1-(counter2 % everloop_image.leds.size())].red = 0;
    everloop_image.leds[everloop_image.leds.size()-1-(counter2 % everloop_image.leds.size())].green = 80;
    everloop_image.leds[everloop_image.leds.size()-1-(counter2 % everloop_image.leds.size())].blue = 80;

    //everloop_image.leds[everloop_image.leds.size()-2-(counter2 % everloop_image.leds.size())].red = 0;
    everloop_image.leds[everloop_image.leds.size()-2-(counter2 % everloop_image.leds.size())].green = 80;
    everloop_image.leds[everloop_image.leds.size()-2-(counter2 % everloop_image.leds.size())].blue = 80;

    //everloop_image.leds[everloop_image.leds.size()-3-(counter2 % everloop_image.leds.size())].red = 0;
    everloop_image.leds[everloop_image.leds.size()-3-(counter2 % everloop_image.leds.size())].green = 80;
    everloop_image.leds[everloop_image.leds.size()-3-(counter2 % everloop_image.leds.size())].blue = 80;

    //everloop_image.leds[everloop_image.leds.size()-4-(counter2 % everloop_image.leds.size())].red = 0;
    everloop_image.leds[everloop_image.leds.size()-4-(counter2 % everloop_image.leds.size())].green = 80;
    everloop_image.leds[everloop_image.leds.size()-4-(counter2 % everloop_image.leds.size())].blue = 80;

    // Updates the Everloop on the MATRIX device
    everloop.Write(&everloop_image);
    // Increment counter
    counter2++;

    // Sleep for 20000 microseconds
    usleep(40000);
}

        break;
   
    case '4':
while(1) {
    // For each led in everloop_image.leds, set led value to 0
    for (matrix_hal::LedValue &led : everloop_image.leds) {
    // Turn off Everloop
    led.red = 30;
    led.green = 0;
    led.blue = 0;
    }

    // Set led color per led
    //everloop_image.leds[(counter2 / 2) % everloop_image.leds.size()].red = 40;
    //everloop_image.leds[(counter2 / 2) % everloop_image.leds.size()].blue = 40;
    //everloop_image.leds[(counter2 / 7) % everloop_image.leds.size()].green = 60;
    //everloop_image.leds[(counter2 / 11) % everloop_image.leds.size()].blue = 60;
    everloop_image.leds[everloop_image.leds.size()-1-(counter3 % everloop_image.leds.size())].red = 70;
    everloop_image.leds[everloop_image.leds.size()-1-(counter3 % everloop_image.leds.size())].green = 20;
    //everloop_image.leds[everloop_image.leds.size()-1-(counter3 % everloop_image.leds.size())].blue = 0;

    everloop_image.leds[everloop_image.leds.size()-2-(counter3 % everloop_image.leds.size())].red = 70;
    everloop_image.leds[everloop_image.leds.size()-2-(counter3 % everloop_image.leds.size())].green = 20;
    //everloop_image.leds[everloop_image.leds.size()-2-(counter3 % everloop_image.leds.size())].blue = 0;

    //everloop_image.leds[everloop_image.leds.size()-3-(counter3 % everloop_image.leds.size())].red = 0;
    //everloop_image.leds[everloop_image.leds.size()-3-(counter3 % everloop_image.leds.size())].green = 0;
    //everloop_image.leds[everloop_image.leds.size()-3-(counter3 % everloop_image.leds.size())].blue = 0;

    //everloop_image.leds[everloop_image.leds.size()-4-(counter3 % everloop_image.leds.size())].red = 0;
    //everloop_image.leds[everloop_image.leds.size()-4-(counter3 % everloop_image.leds.size())].green = 0;
    //everloop_image.leds[everloop_image.leds.size()-4-(counter3 % everloop_image.leds.size())].blue = 0;

    // Updates the Everloop on the MATRIX device
    everloop.Write(&everloop_image);
    // Increment counter
    counter3++;

    // Sleep for 20000 microseconds
    usleep(80000);
}
	
	break;

    case '5':
	//cafe
	for (matrix_hal::LedValue &led : everloop_image.leds) {
    		// Turn off Everloop
    		led.red = 15;
    		led.green = 7;
    		led.blue = 0;
    	}
	everloop.Write(&everloop_image);

	break;
    case '6':
	//verde
        for (matrix_hal::LedValue &led : everloop_image.leds) {
                // Turn off Everloop
                led.red = 20;
                led.green = 40;
                led.blue = 0;
        }
        everloop.Write(&everloop_image);

        break;
    case '7':
	//azul
        for (matrix_hal::LedValue &led : everloop_image.leds) {
                // Turn off Everloop
                led.red = 0;
                led.green = 20;
                led.blue = 40;
        }
        everloop.Write(&everloop_image);

        break;
    case '8':
	//morado
        for (matrix_hal::LedValue &led : everloop_image.leds) {
                // Turn off Everloop
                led.red = 20;
                led.green = 0;
                led.blue = 40;
        }
        everloop.Write(&everloop_image);

        break;
    case '9':
	//lila
        for (matrix_hal::LedValue &led : everloop_image.leds) {
                // Turn off Everloop
                led.red = 50;
                led.green = 10;
                led.blue = 50;
        }
        everloop.Write(&everloop_image);

        break;
    case 'A':
	//amarillo
        for (matrix_hal::LedValue &led : everloop_image.leds) {
                // Turn off Everloop
                led.red = 40;
                led.green = 40;
                led.blue = 0;
        }
        everloop.Write(&everloop_image);

        break;
    case 'B':
        for (matrix_hal::LedValue &led : everloop_image.leds) {
                // Turn off Everloop
                led.red = 40;
                led.green = 20;
                led.blue = 0;
        }
        everloop.Write(&everloop_image);

        break;
    case 'C':
        for (matrix_hal::LedValue &led : everloop_image.leds) {
                // Turn off Everloop
                led.red = 40;
                led.green = 0;
                led.blue = 40;
        }
        everloop.Write(&everloop_image);

        break;


    default:
	break;
  }

  
  // Updates the Everloop on the MATRIX device
  everloop.Write(&everloop_image);

  // For each led in everloop_image.leds, set led value to 0
  /*for (matrix_hal::LedValue &led : everloop_image.leds) {
    // Turn off Everloop
    led.red = 0;
    led.green = 0;
    led.blue = 0;
    led.white = 0;
  }

  // Updates the Everloop on the MATRIX device
  everloop.Write(&everloop_image);*/

  return 0;
}
