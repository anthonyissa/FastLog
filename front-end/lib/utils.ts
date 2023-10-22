import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isObjectString = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

export const convertLogMessageToMap = (message: string) => {
  const obj = JSON.parse(message);
  const map = new Map();

  function traverse(obj: any, path: any) {
    for (const key in obj) {
      const newPath = path ? `${path}.${key}` : key;
      if (typeof obj[key] === "object") {
        traverse(obj[key], newPath);
      } else {
        map.set(newPath, obj[key]);
      }
    }
  }

  traverse(obj, "");
  return map;
};

export const getTimeAgo = (timestamp: number) => {
  const now = new Date().getTime();
  const timeDifference = now - timestamp;

  // Convert the time difference to seconds, minutes, hours, days, and years
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
};

export function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
