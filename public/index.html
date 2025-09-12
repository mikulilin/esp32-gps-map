<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ESP32 GPS 轨迹演示</title>
  <script src="https://webapi.amap.com/maps?v=2.0&key=99aaad9da054b71f551fb168b5a88088"></script>
  <style>
    html, body { height: 100%; margin: 0; }
    #mapContainer { width: 100%; height: 100%; }
    #controls {
      position: absolute; top: 10px; left: 10px;
      background: rgba(255,255,255,0.9);
      padding: 10px; border-radius:6px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      z-index: 999;
      font-family: Arial, sans-serif;
    }
    #controls div { margin-bottom:5px; font-size:14px; }
    button { margin-right:5px; padding:5px 10px; border:none; border-radius:4px; cursor:pointer; }
    button.connect { background:#4CAF50; color:white; }
    button.disconnect { background:#f44336; color:white; }
    button.simulate { background:#2196F3; color:white; }
  </style>
</head>
<body>
  <div id="mapContainer"></div>
  <div id="controls">
    <div id="status">状态: 未连接</div>
    <div id="longitude">经度: --</div>
    <div id="latitude">纬度: --</div>
    <div id="time">时间: --</div>
    <button class="connect" onclick="connect()">连接</button>
    <button class="disconnect" onclick="disconnect()">断开</button>
    <button class="simulate" onclick="toggleSimulation()">模拟</button>
  </div>

  <script>
    const defaultPos = [108.073, 34.280];
    const map = new AMap.Map('mapContainer', { zoom: 15, center: defaultPos });
    const marker = new AMap.Marker({ position: defaultPos, map: map });
    let path = [];
    const polyline = new AMap.Polyline({ path:[defaultPos], strokeColor:"#FF0000", strokeWeight:4, map:map });

    let connected = false;
    let simulating = false;
    let timer = null;

    function resetMap() {
      path = [];
      marker.setPosition(defaultPos);
      polyline.setPath([defaultPos]);
      map.setCenter(defaultPos);
      document.getElementById("longitude").innerText = `经度: --`;
      document.getElementById("latitude").innerText = `纬度: --`;
      document.getElementById("time").innerText = `时间: --`;
    }

    async function fetchGPS() {
      try {
        let data;
        if (simulating || connected) {
          const res = await fetch("/api/gps");
          data = await res.json();
        } else {
          resetMap();
          return;
        }

        const { longitude, latitude, eventTime } = data;
        const pos = [parseFloat(longitude), parseFloat(latitude)];
        marker.setPosition(pos);
        path.push(pos);
        polyline.setPath(path);
        map.setCenter(pos);

        document.getElementById("longitude").innerText = `经度: ${longitude}`;
        document.getElementById("latitude").innerText = `纬度: ${latitude}`;
        document.getElementById("time").innerText = `时间: ${eventTime}`;
      } catch(err) {
        console.error("获取GPS失败:", err);
      }
    }

    function connect() {
      if (!connected) {
        if (simulating) { alert("请先关闭模拟再连接 ESP32"); return; }
        connected = true;
        document.getElementById("status").innerText = "状态: 已连接 ESP32";
        timer = setInterval(fetchGPS, 5000);
        fetchGPS();
      }
    }

    function disconnect() {
      if (connected) {
        connected = false;
        document.getElementById("status").innerText = "状态: 未连接";
        clearInterval(timer);
        resetMap();
      }
    }

    function toggleSimulation() {
      if (connected) { alert("请先断开 ESP32 连接再模拟"); return; }
      simulating = !simulating;
      document.getElementById("status").innerText = simulating ? "状态: 模拟中" : "状态: 未连接";
      clearInterval(timer);
      if (simulating) {
        timer = setInterval(fetchGPS, 5000);
        fetchGPS();
      } else {
        resetMap();
      }
    }
  </script>
</body>
</html>
