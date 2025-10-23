// src/storage/reservations.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const RESV_KEY = (userId) => `Reservations:${userId || "guest"}`;

// UID semplice e leggibile
const newId = () => `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

/** Costruisce l'oggetto prenotazione */
export function makeReservation({
  userId,
  restaurantId = "little-lemon",
  restaurantName = "Little Lemon",
  seating,               
  guests,                  
  datetimeISO,           
  notes = "",
}) {
  const now = new Date().toISOString();
  return {
    id: newId(),
    userId,
    restaurantId,
    restaurantName,
    seating,
    guests,
    datetimeISO,
    notes,
    status: "confirmed",
    createdAt: now,
    updatedAt: now,
  };
}

async function readList(userId) {
  const raw = await AsyncStorage.getItem(RESV_KEY(userId));
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

async function writeList(userId, list) {
  await AsyncStorage.setItem(RESV_KEY(userId), JSON.stringify(list));
}

/** Aggiunge una prenotazione in testa alla lista e ritorna l'id */
export async function appendReservation(userId, reservation) {
  const list = await readList(userId);
  list.unshift(reservation);
  await writeList(userId, list);
  return reservation.id;
}

export async function listReservations(userId) {
  return await readList(userId);
}

export async function getReservationById(userId, reservationId) {
  const list = await readList(userId);
  return list.find((r) => r.id === reservationId) || null;
}

export async function updateReservationStatus(userId, reservationId, nextStatus) {
  const list = await readList(userId);
  const idx = list.findIndex((r) => r.id === reservationId);
  if (idx === -1) return false;
  list[idx].status = nextStatus;
  list[idx].updatedAt = new Date().toISOString();
  await writeList(userId, list);
  return true;
}

export async function clearReservations(userId) {
  await AsyncStorage.removeItem(RESV_KEY(userId));
}
