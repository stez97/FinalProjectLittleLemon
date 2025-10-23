import React, { useMemo, useState, useContext, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  ScrollView
} from "react-native";
//import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import HeaderWithProfile from "../../components/HeaderWithProfile";
import { dynamicWidth } from "../../constants/metrics";
import { useNavigation } from "@react-navigation/native";
import { Modal, Dimensions } from "react-native";
import { makeReservation, appendReservation } from "../../storage/reservation";
import { UserContext } from "../../context/UserContext";

//import { deleteKey, mergeData, retrieveData } from "../../storage/storage";
//import * as ImagePicker from "expo-image-picker";
//import { clearMenu } from "../../storage/dbUtils";

const OrderTable = () => {
  // Constant created, to use and update the values using useContext hook.
  const { user, setUser } = useContext(UserContext);
  /*const [showPopup, setShowPopup] = useState(false);
  const [phNumber, setPhNumber] = useState(null);
  const [avtar, setAvtar] = useState(null);*/
  const navigation = useNavigation();
  /*const [orderStatus, setOrderStatus] = useState(null);
  const [passwordChange, setPasswordChange] = useState(null);
  const [specialOffer, setSpecialOffer] = useState(null);
  const [newsletter, setNewsletter] = useState(null);*/

  //const router = useRouter(); // se usi expo-router

  const [seating, setSeating] = useState("indoor"); 
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [guestsModal, setGuestsModal] = useState(false);

  const minDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const onReserve = () => {
    if (!date || !time) {
      Alert.alert("Completa i campi", "Seleziona data e ora.");
      return;
    }
    const when = new Date(date);
    when.setHours(time.getHours(), time.getMinutes(), 0, 0);

     const userId = user?.email || "guest";

    const reserv = makeReservation({
      userId,
      restaurantName: "Little Lemon",
      seating,
      guests,
      datetimeISO: when.toISOString(),
      notes,
  });

  try {
    const reservationId = appendReservation(userId, reserv);
    navigation.navigate("OrderConfirmation", { reservationId });
  } catch (e) {
    console.log("appendReservation error", e);
    Alert.alert("Errore", "Non sono riuscito a salvare la prenotazione.");
  }
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithProfile />

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
        style={{ flex: 1, flexDirection: "column" }}
      >
        <ScrollView>
          <ImageBackground
            source={require("../../image/lemon-background.jpg")}
            resizeMode="cover"
            style={styles.bg}
            imageStyle={{ opacity: 0.95 }}
          >

         <Text style={styles.title}>Book a table</Text>

           <View style={styles.card}>
              {/* Seating */}
              <View style={styles.row}>
                <Text style={styles.label}>Seating:</Text>
                <View style={styles.choiceRow}>
                  <Radio
                    label="Indoor"
                    selected={seating === "indoor"}
                    onPress={() => setSeating("indoor")}
                  />
                  <Radio
                    label="Outdoor"
                    selected={seating === "outdoor"}
                    onPress={() => setSeating("outdoor")}
                  />
                </View>
              </View>

            {/* Date */}
            <FieldButton
            label="Date"
            placeholder="Select date"
            value={date ? date.toLocaleDateString("it-IT") : ""}
            icon={<Ionicons name="calendar-outline" size={16} color="#fff"/>}
            onPress={() => setShowDate(true)}
            />

            {Platform.OS !== "web" && (
            <DateTimePickerModal
                isVisible={showDate}
                mode="date"
                date={date ?? minDate}
                minimumDate={minDate}
                display={Platform.OS === "ios" ? "spinner" : "calendar"}
                locale="it-IT"
                themeVariant="light"            
                textColor="#000"
                onConfirm={(d) => { setDate(d); setShowDate(false); }}
                onCancel={() => setShowDate(false)}
            />
            )}

            {/* Time */}
            <FieldButton
            label="Time"
            placeholder="Select time"
            value={time ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
            icon={<Ionicons name="time-outline" size={16} color="#fff" />}
            onPress={() => setShowTime(true)}
            />

            {Platform.OS !== "web" && (
            <DateTimePickerModal
                isVisible={showTime}
                mode="time"
                date={time ?? new Date()}
                is24Hour
                locale="it-IT"
                themeVariant="light"
                textColor="#000"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onConfirm={(t) => { setTime(t); setShowTime(false); }}
                onCancel={() => setShowTime(false)}
            />
            )}

            {/* Guests */}
            <View style={{ marginTop: 14 }}>
            <Text style={styles.label}>Guests:</Text>
            <Pressable style={styles.fieldBtn} onPress={() => setGuestsModal(true)}>
                <Ionicons name="person-outline" size={16} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.fieldText}>{guests}</Text>
                <Ionicons name="chevron-down" size={16} color="#fff" style={{ marginLeft: "auto", opacity: 0.6 }} />
            </Pressable>

            <GuestsPickerModal
                visible={guestsModal}
                value={guests}
                onClose={() => setGuestsModal(false)}
                onConfirm={(n) => { setGuests(n); setGuestsModal(false); }}
            />
            </View>
              {/* Notes */}
              <View style={{ marginTop: 16 }}>
                <Text style={styles.label}>Special requests:</Text>
                <TextInput
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Type your message..."
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  multiline
                  numberOfLines={4}
                  style={styles.textarea}
                />
              </View>

              {/* CTA */}
              <Pressable
                style={[styles.btnPrimary, { width: dynamicWidth(0.9) }]}
                onPress={onReserve}
              >
                <Text style={styles.btnPrimaryText}>Reserve a table</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OrderTable;

/* ---------- UI helper components ---------- */
function Radio({ label, selected, onPress }) {
  return (
    <Pressable
      style={styles.radio}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={[styles.radioOuter, selected && styles.radioOuterActive]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </Pressable>
  );
}

function FieldButton({ label, placeholder, value, onPress, icon }) {
  const showValue = value && value.length > 0;
  return (
    <View style={{ marginTop: 14 }}>
      <Text style={styles.label}>{label}:</Text>
      <Pressable style={styles.fieldBtn} onPress={onPress} accessibilityRole="button">
        {icon}
        <Text style={[styles.fieldText, !showValue && { opacity: 0.6 }]}>
          {showValue ? value : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color="#fff" style={{ marginLeft: "auto", opacity: 0.6 }} />
      </Pressable>
    </View>
  );
}


function GuestsPickerModal({ visible, value, onClose, onConfirm }) {
  const [temp, setTemp] = React.useState(value);

  React.useEffect(() => {
    if (visible) setTemp(value);
  }, [visible, value]);

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose} />
      <View style={styles.modalSheet}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select guests</Text>
        </View>

        {/* Picker identico a quello di data/ora */}
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 20,
            backgroundColor: "#fff",
          }}
        >
          <Picker
            selectedValue={temp}
            onValueChange={(v) => setTemp(Number(v))}
            style={{
              width: "100%"
            }}
            dropdownIconColor="#fff"
            mode={Platform.OS === "android" ? "spinner" : undefined}
            itemStyle={{
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {numbers.map((n) => (
              <Picker.Item key={n} label={String(n)} value={n} color="#000" />
            ))}
          </Picker>
        </View>

        <View style={styles.modalButtons}>
          <Pressable
            style={[styles.modalBtn, styles.modalBtnGhost]}
            onPress={onClose}
          >
            <Text style={styles.modalBtnGhostText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.modalBtn, styles.modalBtnPrimary]}
            onPress={() => onConfirm(temp)}
          >
            <Text style={styles.modalBtnPrimaryText}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  bg: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#e8f0f2",
    letterSpacing: 0.5,
    paddingHorizontal: 100,
    marginTop: 8,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowRadius: 6,
  },
  card: {
    marginTop: 50,
    marginHorizontal: 12,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 18,
    //borderWidth: StyleSheet.hairlineWidth,
    //borderColor: "rgba(255,255,255,0.06)",
    //shadowColor: "#000",
    //shadowOpacity: 0.35,
    //shadowRadius: 12,
    //shadowOffset: { width: 0, height: 6 },
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  label: { color: "#dfe7ea", fontWeight: "600", width: 90 },
  choiceRow: { flexDirection: "row", gap: 14, alignItems: "center" },

  radio: { flexDirection: "row", alignItems: "center" },
  radioOuter: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  radioOuterActive: { borderColor: "#ffd13a" },
  radioInner: { height: 8, width: 8, borderRadius: 4, backgroundColor: "#ffd13a" },
  radioLabel: { color: "#fff", fontWeight: "500" },

  fieldBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 12,
  },
  fieldText: { color: "#fff", fontWeight: "600" },

  pickerWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    //borderColor: "rgba(255,255,255,0.16)",
    borderColor: "#fff",
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 8,
  },
  picker: {
    flex: 1,
    color: "#fff",
    ...Platform.select({ android: { marginTop: -6 } }),
  },
  textarea: {
    minHeight: 96,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    //backgroundColor: "rgba(255,255,255,0.08)",
    backgroundColor: "#fff",
    color: "#fff",
    textAlignVertical: "top",
  },

  btnPrimary: {
    alignSelf: "center",
    marginTop: 18,
    height: 50,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffd13a",
    //shadowColor: "#000",
    //shadowOpacity: 0.25,
    //shadowRadius: 10,
    //shadowOffset: { width: 0, height: 6 },
  },
  btnPrimaryText: { fontSize: 16, fontWeight: "800", letterSpacing: 0.3 },
  modalBackdrop: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.45)",
},

modalSheet: {
  position: "absolute",
  left: 16,
  right: 16,
  top: "30%",
  borderRadius: 14,
  //backgroundColor: "rgba(12,12,12,0.98)",
  backgroundColor: "#fff",
  borderWidth: 1,
  //borderColor: "rgba(255,255,255,0.12)",
  overflow: "hidden",
  shadowColor: "#fff",
  shadowOpacity: 0.3,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 8 },
},

modalHeader: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderBottomWidth: StyleSheet.hairlineWidth,
  //borderBottomColor: "rgba(255,255,255,0.12)",
  borderBottomColor: "#fff"
},

modalTitle: { color: "#000", fontWeight: "800", fontSize: 16},

modalButtons: {
  flexDirection: "row",
  justifyContent: "flex-end",
  padding: 12,
  gap: 8,
  borderTopWidth: StyleSheet.hairlineWidth,
  //borderTopColor: "rgba(255,255,255,0.12)",
},

modalBtn: {
  height: 40,
  paddingHorizontal: 14,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
},

modalBtnGhost: {
  borderWidth: 1,
  //borderColor: "rgba(255,255,255,0.2)",
},

modalBtnGhostText: {
  color: "#000",
  fontWeight: "700",
},

modalBtnPrimary: {
  backgroundColor: "#ffd13a",
},

modalBtnPrimaryText: {
  color: "#000",
  fontWeight: "800",
}
});
