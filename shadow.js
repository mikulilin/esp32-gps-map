const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const path = require('path');

const app = express();

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// ====== 华为云设备信息 (直接放在代码里) ======
const AK = 'gpsguiji';
const SK = '123456guiji';
const PROJECT_ID = '45672752-fa2e-43d2-9d8d-fbd6fb539b11';
const DEVICE_ID = '68bfe47d32771f177b5e1bf8_guiji-001';
const REGION = '5791e7b116.st1'; // 华为云域名前缀

// HMAC-SHA256 签名
function getSignature(method, uri, ak, sk, timestamp) {
    const signingStr = `${method}\n${uri}\n${timestamp}`;
    const hmac = crypto.createHmac('sha256', sk);
    hmac.update(signingStr);
    return `SDK-HMAC-SHA256 ${ak}:${hmac.digest('base64')}`;
}

// HTTP接口：前端通过fetch调用
app.get('/api/shadow', async (req, res) => {
    try {
        const apiUri = `/v5/iot/${PROJECT_ID}/devices/${DEVICE_ID}/shadow`;
        const apiUrl = `https://${REGION}.iotda-app.cn-north-4.myhuaweicloud.com${apiUri}`;
        const timestamp = new Date().toISOString();
        const signature = getSignature('GET', apiUri, AK, SK, timestamp);

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: signature,
                'X-Sdk-Date': timestamp
            }
        });

        const reported = response.data.shadow[0]?.reported?.properties;
        if (!reported) return res.json({ error: '未获取到设备数据' });

        res.json({
            longitude: reported.longitude,
            latitude: reported.latitude,
            eventTime: reported.eventTime
        });
    } catch (err) {
        res.json({ error: err.message });
    }
});

// 启动服务
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
