import axios from "axios";
import crypto from "crypto";

export default async function handler(req, res) {
    // ---------- 直接写死AK/SK和设备信息 ----------
    const AK = "gpsguiji";
    const SK = "123456guiji";
    const PROJECT_ID = "45672752-fa2e-43d2-9d8d-fbd6fb539b11";
    const DEVICE_ID = "68bfe47d32771f177b5e1bf8_guiji-001";
    const REGION = "5791e7b116.st1";

    try {
        const apiUri = `/v5/iot/${PROJECT_ID}/devices/${DEVICE_ID}/shadow`;
        const apiUrl = `https://${REGION}.iotda-app.cn-north-4.myhuaweicloud.com${apiUri}`;
        const timestamp = new Date().toISOString();

        const signingStr = `GET\n${apiUri}\n${timestamp}`;
        const hmac = crypto.createHmac("sha256", SK).update(signingStr).digest("base64");
        const signature = `SDK-HMAC-SHA256 ${AK}:${hmac}`;

        const response = await axios.get(apiUrl, {
            headers: {
                "Authorization": signature,
                "X-Sdk-Date": timestamp
            }
        });

        // 允许前端访问
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json(response.data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
