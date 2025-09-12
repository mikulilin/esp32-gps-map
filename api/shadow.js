const WebSocket = require('ws');

let clients = [];
let latestData = { longitude: 108.073, latitude: 34.280, eventTime: new Date().toISOString() };

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', ws => {
  clients.push(ws);
  ws.send(JSON.stringify(latestData));

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
}

// HTTP handler
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { longitude, latitude } = req.body;
    const eventTime = new Date().toISOString();
    latestData = { longitude, latitude, eventTime };
    broadcast(latestData);
    return res.json({ ok: true });
  }
  if (req.method === 'GET') {
    return res.json(latestData);
  }
  res.status(405).send('Method Not Allowed');
};

// 导出 WebSocket server
module.exports.wss = wss;
