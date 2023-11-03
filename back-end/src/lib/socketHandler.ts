export const statusCache = new Map<string, string>(); // switch to redis to avoid memory usage
export const heartbeatInterval = 60 * 1000; // 3 minute

export const removeFromStatusCache = (id: string) => {
  statusCache.delete(id);
};

export const isAppInStatusCache = (app_id: string, user_id: string) => {
  for (const [_, value] of statusCache.entries()) {
    if (value === user_id + ":" + app_id) return true;
  }
  return false;
};
