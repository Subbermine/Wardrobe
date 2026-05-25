import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

// Configure how notifications should be handled when the app is running in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  console.log("[Push] Starting push notification registration...");
  console.log("[Push] Platform:", Platform.OS, "| appOwnership:", Constants.appOwnership);

  // Request permissions first (required for both local and push notifications)
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  console.log("[Push] Existing permission status:", existingStatus);
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
    console.log("[Push] Requested permission, new status:", finalStatus);
  }

  if (finalStatus !== "granted") {
    console.warn("[Push] ❌ Permission NOT granted. Push notifications won't work on this device.");
    return null;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
    console.log("[Push] Android notification channel created.");
  }

  // Android Push notifications (remote notifications) provided by expo-notifications
  // were removed from Expo Go with SDK 53. If running inside Expo Go on Android,
  // we bypass remote push token registration to avoid crashes/errors.
  if (Platform.OS === "android" && Constants.appOwnership === "expo") {
    console.log("[Push] ⚠️ Running inside Expo Go on Android: Skipping remote push registration (SDK 53+ restriction). Local notifications will still function.");
    return null;
  }

  try {
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId ??
      "87e834b3-3219-4447-a316-40f2c363d82e";

    console.log("[Push] Using projectId:", projectId);

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    console.log("[Push] ✅ Expo Push Token obtained:", token);
  } catch (error) {
    console.warn("[Push] ❌ Failed to get Expo Push Token:", error.message);
    console.warn("[Push] Full error:", JSON.stringify(error));
  }

  return token;
}

export async function sendPushNotification(expoPushTokens, message) {
  if (!expoPushTokens || (Array.isArray(expoPushTokens) && expoPushTokens.length === 0)) {
    console.warn("[Push] No tokens to send to.");
    return;
  }

  console.log("[Push] Sending to tokens:", expoPushTokens);

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: expoPushTokens, // supports both a single string or an array of strings
      sound: "default",
      title: "New Wardrobe Order",
      body: message,
      data: { message },
    }),
  });

  const data = await response.json();
  console.log("[Push] Expo API response:", JSON.stringify(data));

  // Check for per-token errors in the response tickets
  if (data?.data) {
    const tickets = Array.isArray(data.data) ? data.data : [data.data];
    tickets.forEach((ticket, i) => {
      if (ticket.status === "error") {
        console.warn(`[Push] ❌ Ticket[${i}] error: ${ticket.message} | details:`, JSON.stringify(ticket.details));
      } else {
        console.log(`[Push] ✅ Ticket[${i}] OK, id: ${ticket.id}`);
      }
    });
  }
}

// Triggers a native local notification instantly on the device
export async function scheduleLocalNotification(title, body, data = {}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: null, // null means trigger immediately
  });
}
