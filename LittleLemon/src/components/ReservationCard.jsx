import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

function ReservationCard({ reservation }) {
  const when = new Date(reservation.datetimeISO);
  const dateStr = when.toLocaleDateString("it-IT");
  const timeStr = when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const statusColor =
    reservation.status === "confirmed" ? "#6EE7B7" :
    reservation.status === "cancelled" ? "#F87171" : "#F4CE14";

  return (
    <View style={cardStyles.card}>
      {/* Header */}
      <View style={cardStyles.headerRow}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="restaurant-outline" size={18} color="#fff" />
          <Text style={cardStyles.title}>{reservation.restaurantName}</Text>
        </View>
        <View style={[cardStyles.pill, { backgroundColor: statusColor }]}>
          <Text style={cardStyles.pillText}>{reservation.status}</Text>
        </View>
      </View>

      {/* Body */}
      <View style={{ gap: 8, marginTop: 8 }}>
        <Row icon="calendar-outline" label={`${dateStr}  ${timeStr}`} />
        <Row icon="people-outline" label={`${reservation.guests} guests`} />
        <Row icon="cube-outline" label={`Seating: ${reservation.seating}`} />
        {!!reservation.notes && (
          <Row icon="chatbubble-ellipses-outline" label={reservation.notes} />
        )}
      </View>
    </View>
  );
};

export default ReservationCard;


function Row({ icon, label, mono }) {
  return (
    <View style={cardStyles.row}>
      <Ionicons name={icon} size={16} color="rgba(255,255,255,0.9)" style={{ marginTop: 1 }} />
      <Text style={[cardStyles.rowText, mono && { fontVariant: ["tabular-nums"] }]} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 14,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: "#fff", fontWeight: "800", fontSize: 16, letterSpacing: 0.2 },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  pillText: { color: "#000", fontWeight: "800", fontSize: 12, letterSpacing: 0.3 },
  row: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  rowText: { color: "#eaeaea", fontWeight: "600", flex: 1 },
});
