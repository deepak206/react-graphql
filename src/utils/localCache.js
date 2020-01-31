const ALS_MAP = new Map();

export function get(key) { return ALS_MAP.get(key); }
export function set(key, data) { ALS_MAP.set(key, data); }
