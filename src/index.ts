import express from 'express';
import http from 'http';
import path from 'path';
import { SimulationHandler } from './SimulationHandler';
import cors from 'cors';
import { ManageFiles } from './ManageFiles';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const simulationHandler = new SimulationHandler(server);

app.use(cors());

app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.get('/api/params', (req, res) => {
  const fileParams = ManageFiles.readInputFile(path.resolve(__dirname, '../config/input.yml'));

  res.json({ 
    refreshInterval: fileParams.settings.rafraichissement,
    from: fileParams.mobile[0].route[0],
    to: fileParams.mobile[0].route[1]
  });
});

app.post('/api/params', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.get('/api/socket', async (req, res) => {
  const status = parseInt(req.query.status as string, 10);

  // status 1: switch on || status 0: switch off
  if (status === 1) {
    try {
      simulationHandler.onSocket();
      res.json({ status: 'Data processing and socket transmission initiated' });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: (error as Error).message });
    }
  } else if (status === 0) {
    simulationHandler.stopSocketLoop();
    res.json({ status: 'Data transmission stopped' });
  } else {
    res.status(400).json({ status: 'Invalid status parameter' });
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} at ${new Date().toISOString()}`);
});
