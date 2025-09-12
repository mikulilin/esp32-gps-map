export default function handler(req, res) {
  // 模拟返回假GPS数据
  const baseLon = 108.073;
  const baseLat = 34.280;
  const delta = 0.0005;
  const randomLon = baseLon + (Math.random()-0.5)*delta*10;
  const randomLat = baseLat + (Math.random()-0.5)*delta*10;

  const data = {
    longitude: randomLon.toFixed(6),
    latitude: randomLat.toFixed(6),
    eventTime: new Date().toISOString()
  };

  res.status(200).json(data);
}
