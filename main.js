const publicVapidKey = "YOUR_PUBLIC_VAPID_KEY";

// Register the service worker and subscribe the user
async function subscribeUser() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log("Service Worker and Push are supported");

        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log("Service Worker registered:", registration);

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        console.log("Push subscription:", subscription);

        // Send subscription to the server
        await fetch('https://your-server-endpoint/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
        });
        alert("Subscribed successfully!");
    } else {
        alert("Push notifications are not supported in your browser.");
    }
}

// Utility to convert VAPID key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

document.getElementById('subscribeBtn').addEventListener('click', subscribeUser);

