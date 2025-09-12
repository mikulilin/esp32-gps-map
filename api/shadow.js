const axios = require('axios');

const AK = "gpsguiji";
const SK = "123456guiji";
const PROJECT_ID = "45672752-fa2e-43d2-9d8d-fbd6fb539b11";
const DEVICE_ID = "68bfe47d32771f177b5e1bf8_guiji-001";
const REGION = "5791e7b116.st1";

exports.default = async function handler(req, res) {
  try {
    // 模拟获取 GPS 数据（可改为真实数据接口）
    const data = {
      longitude: (108 + Math.random()*0.01).toFixed(6),
      latitude: (34 + Math.random()*0.01).toFixed(6),
      eventTime: new Date().toISOString()
    };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
