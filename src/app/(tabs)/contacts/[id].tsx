import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { CONTACTS } from "@/data/contacts";

export default function ContactDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const contact = CONTACTS.find((c) => c.id === id);

  if (!contact) {
    return (
      <View style={styles.screen}>
        <Text style={styles.missing}>Contact not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: contact.name }} />

      <Image
        source={`https://i.pravatar.cc/200?u=${contact.id}`}
        style={styles.avatar}
      />
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.program}>{contact.program}</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.navigate("/contacts/chat" as any)}
      >
        <Text style={styles.buttonLabel}>Send a message</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", paddingTop: 32, gap: 8 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  name: { fontSize: 22, fontWeight: "bold" },
  program: { fontSize: 15, color: "#666" },
  button: {
    backgroundColor: "#1a5276",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 16,
  },
  buttonLabel: { color: "#fff", fontWeight: "600" },
  missing: { color: "#888", paddingTop: 32 },
});
