import serial
import time
import argparse

def build_arg_parser():
    parser = argparse.ArgumentParser(description='Movimientos Eva')
    parser.add_argument("--gesto", dest="gesto", required=True,
            help="GEsto ")
    return parser

args = build_arg_parser().parse_args()
gesto = args.gesto
ser = serial.Serial('/dev/ttyUSB0',9600)
time.sleep(1.8)
ser.write(gesto)
value = ser.readline()

print '\nValor retornado de Arduino: %s' % (value)

ser.close()



