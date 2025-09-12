// api/gps.js
let gpsData = [];  // 内存存储数据

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { longitude, latitude, eventTime } = req.body;

      if (!longitude || !latitude) {
        return res.status(400).json({ error: "缺少经纬度" });
      }

      gpsData.push({ longitude, latitude, eventTime });
      if (gpsData.length > 100) gpsData.shift(); // 保留最近100条

      return res.status(200).json({ message: "数据上传成功" });
    } catch (e) {
      return res.status(500).json({ error: "上传失败", details: e.message });
    }
  }

  if (req.method === "GET") {
    return res.status(200).json(gpsData);
  }

  return res.status(405).json({ error: "不支持该方法" });
}
