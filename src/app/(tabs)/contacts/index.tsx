import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link } from "expo-router";
import { CONTACTS } from "@/data/contacts";
import { ContactRow } from "@/components/ContactRow";

export default function Contacts() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return CONTACTS.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  return (
    <FlatList
      data={filtered}
      keyExtractor={(contact) => contact.id}
      renderItem={({ item }) => (
        <Link
          href={{ pathname: "/contacts/[id]", params: { id: item.id } } as any}
          asChild
        >
          <Pressable>
            <ContactRow contact={item} />
          </Pressable>
        </Link>
      )}
      ListHeaderComponent={
        <View>
          <View style={styles.headerRow}>
            <Text style={styles.h1}>Contacts</Text>
            <Text style={styles.count}>({filtered.length})</Text>
          </View>
          <TextInput
            style={styles.search}
            placeholder="Search..."
            value={query}
            onChangeText={setQuery}
          />
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <Text style={styles.empty}>
          No contact matches &quot;{query}&quot;.
        </Text>
      }
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  h1: { fontSize: 22, fontWeight: "bold", color: "#1a5276" },
  count: { color: "#888" },
  search: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  separator: { height: 1, backgroundColor: "#e5e5e5" },
  empty: { textAlign: "center", color: "#888", paddingVertical: 32 },
});
