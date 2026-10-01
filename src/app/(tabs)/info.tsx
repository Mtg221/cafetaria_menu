import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function InfoScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Main Campus Student Union</Text>
        <Text style={styles.cardSub}>Building B, 1st Floor Dining Hall</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>🕒 Operating Hours</Text>

        <View style={styles.hoursRow}>
          <Text style={styles.dayText}>Monday - Thursday</Text>

          <Text style={styles.timeText}>7:30 AM - 8:30 PM</Text>
        </View>
        <View style={styles.hoursRow}>
          <Text style={styles.dayText}>Friday</Text>
          <Text style={styles.timeText}>7:30 AM - 7:00 PM</Text>
        </View>
        <View style={styles.hoursRow}>
          <Text style={styles.dayText}>Saturday - Sunday</Text>
          <Text style={styles.timeText}>9:00 AM - 6:00 PM</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🥗 Dietary & Food Safety</Text>
        <Text style={styles.infoText}>
          All menu items are clearly labeled for common allergens and dietary restrictions including Vegan, Vegetarian, Gluten-Free, Halal, and Nut-Free options.
        </Text>
        <Text style={styles.infoText}>
          If you have severe food allergies, please notify our head chef before placing your order.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱 Express Pickup Ordering</Text>
        <Text style={styles.infoText}>
          Order ahead using this app to skip the long lines during peak hours (12:00 PM - 1:30 PM).
        </Text>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push('/cart' as any)}
        >
          <Text style={styles.actionBtnText}>View Current Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  content: {
    padding: 16
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4
  },
  cardSub: {
    fontSize: 14,
    color: '#64748B'
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 14
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  dayText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500'
  },
  timeText: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '700'
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginTop: 8
  },
  actionBtn: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
  }
});
