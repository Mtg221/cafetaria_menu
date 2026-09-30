import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { CONTACTS } from "@/data/contacts";

type Contact = (typeof CONTACTS)[number];

export function ContactRow({ contact }: { contact: Contact }) {
  return (
    <View style={styles.row}>
      <Image
        source={`https://i.pravatar.cc/100?u=${contact.id}`}
        style={styles.avatar}
      />
      <View style={styles.rowText}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.program}>{contact.program}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  rowText: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  program: { fontSize: 13, color: "#666" },
});
