const axios = require('axios');
const crypto = require('crypto');

const AK = "gpsguiji";          // 你的 AK
const SK = "123456guiji";       // 你的 SK
const PROJECT_ID = "45672752-fa2e-43d2-9d8d-fbd6fb539b11";
const DEVICE_ID = "68bfe47d32771f177b5e1bf8_guiji-001";
const REGION = "5791e7b116.st1";

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

        const reported = response.data.shadow[0]?.reported?.properties || {};
        res.status(200).json({
            longitude: reported.longitude || 108.073,
            latitude: reported.latitude || 34.280,
            eventTime: reported.eventTime || new Date().toISOString()
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
