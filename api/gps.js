// api/gps.js
export default function handler(req, res) {
  // 接收 ESP32 POST 上传数据
  if (req.method === "POST") {
    const { longitude, latitude } = req.body;
    if (!longitude || !latitude) {
      return res.status(400).json({ error: "缺少经纬度" });
    }
    global.gpsData = {
      longitude,
      latitude,
      eventTime: new Date().toISOString()
    };
    return res.json({ status: "ok" });
  }

  // GET 返回当前数据或模拟数据
  const data = global.gpsData || {
    longitude: (108.073 + Math.random()*0.01).toFixed(6),
    latitude: (34.280 + Math.random()*0.01).toFixed(6),
    eventTime: new Date().toISOString()
  };
  res.json(data);
}
