const publicVapidKey = "YOUR_PUBLIC_VAPID_KEY";

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

        // Generate and download subscription file
        saveSubscriptionToFile(subscription);
    } else {
        alert("Push notifications are not supported in your browser.");
    }
}

function saveSubscriptionToFile(subscription) {
    // Convert subscription object to JSON string
    const subscriptionJSON = JSON.stringify(subscription, null, 2);

    // Create a Blob with the JSON data
    const blob = new Blob([subscriptionJSON], { type: 'application/json' });

    // Create a download link
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = URL.createObjectURL(blob);

    // Show the download section
    const downloadSection = document.getElementById('downloadSection');
    downloadSection.style.display = 'block';
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
