const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// IPN route
app.post('/notify', (req, res) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    data: req.body
  };

  // Append the log to a local file
  fs.appendFile('notify.log', JSON.stringify(logEntry, null, 2) + ',\n', (err) => {
    if (err) {
      console.error('Error writing to log:', err);
      return res.status(500).send('Failed');
    }
    console.log('IPN received:', logEntry);
    res.send('OK');
  });
});

// Test GET endpoint (optional)
app.get('/', (req, res) => {
  res.send('PayFast IPN Listener is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
