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

int siguiente(int);
int anterior(int);

int main()
{
	// Create MatrixIOBus object for hardware communication
	matrix_hal::MatrixIOBus bus;
	// Initialize bus and exit program if error occurs
	if (!bus.Init())
		return false;
	// Holds the number of LEDs on MATRIX device
	int ledCount = bus.MatrixLeds();
	// Create EverloopImage object, with size of ledCount
	matrix_hal::EverloopImage everloop_image(ledCount);
	// Create Everloop object
	matrix_hal::Everloop everloop;
	// Set everloop to use MatrixIOBus bus
	everloop.Setup(&bus);
	int ledInicio = 9, izq = 0, der = 0, etapa = 0, cant = 0;
	bool direccion = true, start = true, rebaso = true;

	while (true)
	{
		izq = anterior(ledInicio - 1);
		der = siguiente(ledInicio + 1);

		// for (int i = 0; i < 18; i++)
		// {
		// 	everloop_image.leds[i].red = 100;
		// 	everloop_image.leds[i].green = 255;
		// 	everloop_image.leds[i].blue = 153;
		// }

		everloop_image.leds[izq].red = 100;
		everloop_image.leds[izq].green = 255;
		everloop_image.leds[izq].blue = 0;
		everloop_image.leds[der].red = 100;
		everloop_image.leds[der].green = 255;
		everloop_image.leds[der].blue = 0;

		izq = anterior(izq);
		der = siguiente(der);

		everloop_image.leds[izq].red = 100;
		everloop_image.leds[izq].green = 255;
		everloop_image.leds[izq].blue = 0;
		everloop_image.leds[der].red = 100;
		everloop_image.leds[der].green = 255;
		everloop_image.leds[der].blue = 0;

		int start = siguiente(ledInicio + 8);

		if (etapa == 0)
		{
			everloop_image.leds[start].red = 100;
			everloop_image.leds[start].green = 255;
			everloop_image.leds[start].blue = 0;
		}
		else if (etapa == 1)
		{
			everloop_image.leds[siguiente(start)].red = 100;
			everloop_image.leds[siguiente(start)].green = 255;
			everloop_image.leds[siguiente(start)].blue = 0;
			everloop_image.leds[anterior(start)].red = 100;
			everloop_image.leds[anterior(start)].green = 255;
			everloop_image.leds[anterior(start)].blue = 0;
		}
		else if (etapa == 2)
		{
			everloop_image.leds[siguiente(start + 1)].red = 100;
			everloop_image.leds[siguiente(start + 1)].green = 255;
			everloop_image.leds[siguiente(start + 1)].blue = 0;
			everloop_image.leds[anterior(start - 1)].red = 100;
			everloop_image.leds[anterior(start - 1)].green = 255;
			everloop_image.leds[anterior(start - 1)].blue = 0;
		}
		else if (etapa == 3)
		{
			everloop_image.leds[siguiente(start + 2)].red = 100;
			everloop_image.leds[siguiente(start + 2)].green = 255;
			everloop_image.leds[siguiente(start + 2)].blue = 0;
			everloop_image.leds[anterior(start - 2)].red = 100;
			everloop_image.leds[anterior(start - 2)].green = 255;
			everloop_image.leds[anterior(start - 2)].blue = 0;
			direccion = !direccion;
		}
		else if (etapa % 2 == 0)
		{
			for (int i = anterior(start - 2); i < siguiente(start + 3); i++)
			{
				everloop_image.leds[i].red = 0;
				everloop_image.leds[i].green = 0;
				everloop_image.leds[i].blue = 0;
			}
		}
		else
		{
			everloop_image.leds[start].red = 100;
			everloop_image.leds[start].green = 255;
			everloop_image.leds[start].blue = 0;
			everloop_image.leds[siguiente(start)].red = 100;
			everloop_image.leds[siguiente(start)].green = 255;
			everloop_image.leds[siguiente(start)].blue = 0;
			everloop_image.leds[anterior(start)].red = 100;
			everloop_image.leds[anterior(start)].green = 255;
			everloop_image.leds[anterior(start)].blue = 0;
			everloop_image.leds[siguiente(start + 1)].red = 100;
			everloop_image.leds[siguiente(start + 1)].green = 255;
			everloop_image.leds[siguiente(start + 1)].blue = 0;
			everloop_image.leds[anterior(start - 1)].red = 100;
			everloop_image.leds[anterior(start - 1)].green = 255;
			everloop_image.leds[anterior(start - 1)].blue = 0;
			everloop_image.leds[siguiente(start + 2)].red = 100;
			everloop_image.leds[siguiente(start + 2)].green = 255;
			everloop_image.leds[siguiente(start + 2)].blue = 0;
			everloop_image.leds[anterior(start - 2)].red = 100;
			everloop_image.leds[anterior(start - 2)].green = 255;
			everloop_image.leds[anterior(start - 2)].blue = 0;
			cant++;
		}
		if (cant <= 3)
		{
			etapa++;
		}
		else
		{
			etapa = 0;
			cant = 0;
			izq = 0;
			der = 0;
			for (int i = anterior(start - 2); i < siguiente(start + 3); i++)
			{
				everloop_image.leds[i].red = 0;
				everloop_image.leds[i].green = 0;
				everloop_image.leds[i].blue = 0;
			}
		}
		everloop.Write(&everloop_image);
		usleep(40000 * 10);
	}
	return 0;
}

int siguiente(int value)
{
	return value + 1 >= 18 ? value - 17 : value + 1;
}

int anterior(int value)
{
	return value - 1 < 0 ? 18 + (value - 1) : value - 1;
}
