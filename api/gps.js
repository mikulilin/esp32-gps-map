export default function handler(req, res) {
  // 模拟 ESP32 上传的 GPS 数据
  const longitude = 108.073 + (Math.random()*0.01 - 0.005);
  const latitude = 34.280 + (Math.random()*0.01 - 0.005);
  const eventTime = new Date().toISOString();
  
  res.status(200).json({ longitude, latitude, eventTime });
}
