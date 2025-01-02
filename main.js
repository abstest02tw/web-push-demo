const publicVapidKey = "BJBLiWIvfuouLxxGaMZmRCHyucZV8UUKFD7nOchdzArtuzVHlLEZ72FBDk8iEvSjbIHQNpFg3rBctRhVbOG2l2c";

document.getElementById('subscribeBtn').addEventListener('click', subscribeUser);

async function subscribeUser() {
    console.log("Subscribe button clicked.");

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log("Service Worker registered:", registration);

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        console.log("Generated subscription:", subscription);

        saveSubscriptionToFile(subscription);
    } else {
        console.error("Push notifications are not supported in this browser.");
    }
}

function saveSubscriptionToFile(subscription) {
    console.log("Saving subscription to file...");

    const subscriptionJSON = JSON.stringify(subscription, null, 2);
    const blob = new Blob([subscriptionJSON], { type: 'application/json' });
    const downloadLink = document.getElementById('downloadLink');

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.style.display = 'block';

    const downloadSection = document.getElementById('downloadSection');
    downloadSection.style.display = 'block';

    console.log("Download link generated:", downloadLink.href);
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
