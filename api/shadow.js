const axios = require('axios');
const crypto = require('crypto');

// 这里直接在代码里写 AK/SK 和设备信息（安全性较低，正式环境建议用环境变量）
const AK = "gpsguiji";
const SK = "123456guiji";
const PROJECT_ID = "45672752-fa2e-43d2-9d8d-fbd6fb539b11";
const DEVICE_ID = "68bfe47d32771f177b5e1bf8_guiji-001";
const REGION = "5791e7b116.st1"; // 华为云域名前缀

// HMAC-SHA256 签名
function getSignature(method, uri, ak, sk, timestamp) {
    const signingStr = `${method}\n${uri}\n${timestamp}`;
    const hmac = crypto.createHmac('sha256', sk);
    hmac.update(signingStr);
    return `SDK-HMAC-SHA256 ${ak}:${hmac.digest('base64')}`;
}

module.exports = async (req, res) => {
    try {
        const apiUri = `/v5/iot/${PROJECT_ID}/devices/${DEVICE_ID}/shadow`;
        const apiUrl = `https://${REGION}.iotda-app.cn-north-4.myhuaweicloud.com${apiUri}`;
        const timestamp = new Date().toISOString();
        const signature = getSignature('GET', apiUri, AK, SK, timestamp);

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': signature,
                'X-Sdk-Date': timestamp
            }
        });

        const shadow = response.data.shadow;
        const reported = shadow[0]?.reported?.properties;
        if (!reported) return res.json({ error: "未获取到设备数据" });

        res.json({
            longitude: reported.longitude,
            latitude: reported.latitude,
            eventTime: reported.eventTime
        });

    } catch (err) {
        console.error(err);
        res.json({ error: err.message });
    }
};
