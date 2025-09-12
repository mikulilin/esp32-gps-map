// 模拟 Vercel API，等待 ESP32 数据接入
let lastData = { longitude:108.073, latitude:34.280, eventTime:new Date().toISOString() };

export default function handler(req, res) {
  // 这里可以改成接收 ESP32 上传的数据
  // 现在返回假数据
  const delta = 0.0005;
  const newPos = {
    longitude: lastData.longitude + (Math.random()-0.5)*delta,
    latitude: lastData.latitude + (Math.random()-0.5)*delta,
    eventTime: new Date().toISOString()
  };
  lastData = newPos;
  res.status(200).json(newPos);
}
