// 使用者自備的 OpenAI API Key（BYOK），只存在使用者自己的瀏覽器 localStorage
const STORAGE_KEY = "openai-api-key";
const CHANGE_EVENT = "openai-api-key-change";

export const API_KEY_HEADER = "X-OpenAI-Key";

// 移除複製貼上時常夾帶的空白、全形空白與零寬字元
export function normalizeApiKey(key: string) {
  return key.replace(/[\s​-‍⁠﻿]/g, "");
}

// Key 會放在 HTTP 標頭送出，標頭只接受 ASCII，含中文或全形字元時 fetch 會直接失敗
export function isValidApiKey(key: string) {
  return /^[\x21-\x7E]+$/.test(key);
}

// 無痕模式或封鎖網站資料時 localStorage 可能丟出例外，一律視為沒有 Key
export function getApiKey(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

export function setApiKey(key: string): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, key);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function clearApiKey() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// 給 useSyncExternalStore 用：同分頁的變更走自訂事件，其他分頁的變更走 storage 事件
export function subscribeApiKey(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function maskApiKey(key: string) {
  return key.length <= 10 ? "••••" : `${key.slice(0, 5)}••••${key.slice(-4)}`;
}
