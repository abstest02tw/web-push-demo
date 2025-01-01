document.getElementById('subscribeBtn').addEventListener('click', () => {
    // 模擬訂閱資訊
    const subscription = {
        endpoint: "https://example.com/fcm/send/some-id",
        keys: {
            p256dh: "sample-p256dh-key",
            auth: "sample-auth-key"
        }
    };

    // 將訂閱資訊保存為文件
    const subscriptionJSON = JSON.stringify(subscription, null, 2);
    const blob = new Blob([subscriptionJSON], { type: 'application/json' });
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = URL.createObjectURL(blob);

    // 顯示下載按鈕
    document.getElementById('downloadSection').style.display = 'block';
});
