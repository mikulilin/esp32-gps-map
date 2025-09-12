let lastData = null; // ESP32 未上传数据时为 null

export default function handler(req, res) {
  // 模拟 ESP32 上传数据（可替换为真实 ESP32 POST 数据）
  if (Math.random() < 0.5) { // 模拟有时无数据
    lastData = {
      longitude: 108.073 + (Math.random()-0.5)*0.001,
      latitude: 34.280 + (Math.random()-0.5)*0.001,
      eventTime: new Date().toISOString()
    };
  }

  if (lastData) {
    res.status(200).json(lastData);
  } else {
    res.status(200).json({ longitude:null, latitude:null, eventTime:null });
  }
}
