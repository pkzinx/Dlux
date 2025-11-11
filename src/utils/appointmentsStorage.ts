export type StoredAppointment = {
  id: string;
  serviceTitle: string;
  barberName?: string;
  clientName?: string;
  startDatetime: string; // ISO string
  endDatetime: string;   // ISO string
  createdAt: string;     // ISO string
};

const STORAGE_KEY = 'dlux.appointments';

function readAll(): StoredAppointment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean);
  } catch (_) {
    return [];
  }
}

function writeAll(list: StoredAppointment[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list || []));
  } catch (_) {
    // ignore
  }
}

export function getActiveAppointments(now: Date = new Date()): StoredAppointment[] {
  const list = readAll();
  return list.filter((a) => {
    const end = new Date(a.endDatetime).getTime();
    return end > now.getTime();
  });
}

export function addAppointment(appt: Omit<StoredAppointment, 'id' | 'createdAt'> & { id?: string }) {
  const list = readAll();
  const id = appt.id || `apt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const item: StoredAppointment = { ...appt, id, createdAt: new Date().toISOString() };
  writeAll([item, ...list]);
  return item;
}

export function removeAppointment(id: string) {
  const list = readAll();
  writeAll(list.filter((a) => a.id !== id));
}

export function clearExpired(now: Date = new Date()) {
  const list = readAll();
  const filtered = list.filter((a) => new Date(a.endDatetime).getTime() > now.getTime());
  writeAll(filtered);
}

export function onStorageChange(callback: (items: StoredAppointment[]) => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback(getActiveAppointments());
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}