// api/shadow.js
let latestGPS = { longitude: 108.073, latitude: 34.280, eventTime: new Date().toISOString() };

export default function handler(req, res) {
  if (req.method === 'POST') {
    // ESP32 发送数据
    const { longitude, latitude } = req.body;
    latestGPS = {
      longitude: parseFloat(longitude),
      latitude: parseFloat(latitude),
      eventTime: new Date().toISOString()
    };
    res.status(200).json({ status: 'ok', latestGPS });
  } else if (req.method === 'GET') {
    // 前端轮询获取最新GPS
    res.status(200).json(latestGPS);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
