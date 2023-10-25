const express = require('express');
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

const app = express();
const PORT = 3000; // Set your desired port number

// Initialize the serial port
const portName = 'COM3'; // Replace with your COM port name
const port = new SerialPort(portName, { baudRate: 9600 }); // Set the appropriate baud rate

const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// Express route to send data to the COM port
app.get('/sendData', (req, res) => {
  const dataToSend = 'Hello, COM port!'; // Data to send

  // Write data to the COM port
  port.write(dataToSend, (err) => {
    if (err) {
      console.error('Error writing to COM port:', err);
      res.status(500).send('Error writing to COM port');
    } else {
      console.log(`Sent data to COM port: ${dataToSend}`);
      res.send('Data sent to COM port');
    }
  });
});

// Optional: Handle incoming data from the COM port
parser.on('data', (data) => {
  console.log(`Received data from COM port: ${data}`);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});