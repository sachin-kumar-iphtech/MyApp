// src/utils/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "AUTH_DEMO";

export async function saveAuth(obj) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

export async function loadAuth() {
  const s = await AsyncStorage.getItem(STORAGE_KEY);
  if (!s) return null;
  try { return JSON.parse(s); } catch { return null; }
}

export async function clearAuth() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
