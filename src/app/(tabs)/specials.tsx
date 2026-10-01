import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { CAFETERIA_ITEMS } from '../../data/cafeteriaMenu';
import { useCart } from '../../context/CartContext';

export default function SpecialsScreen() {
  const router = useRouter();
  const { addToCart } = useCart();

  const specials = CAFETERIA_ITEMS.filter((item) => item.isSpecial);

  const handleOpenDetail = (id: string) => {
    // REQUIREMENT 5: Only identifier travels
    router.push({
      pathname: '/item/[id]' as any,
      params: { id }
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Banner */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroBadge}>🔥 TODAY&apos;S CAMPUS DEALS</Text>
        <Text style={styles.heroTitle}>Student Special Discounts</Text>
        <Text style={styles.heroSub}>
          Save up to 25% on selected entrees & beverages today with your Student ID!
        </Text>
      </View>

      {/* Specials List */}
      <Text style={styles.sectionHeader}>Featured Offers</Text>

      {specials.map((item) => (
        <View key={item.id} style={styles.specialCard}>
          <View style={styles.cardHeader}>
            <Image
              source={item.imageSource}
              style={styles.cardImage}
              contentFit="cover"
              transition={300}
            />
            <View style={styles.headerInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>SPECIAL</Text>
            </View>
          </View>

          <Text style={styles.desc}>{item.description}</Text>

          <View style={styles.priceRow}>
            <View style={styles.priceBox}>
              <Text style={styles.specialPrice}>{item.specialPrice?.toLocaleString()} FCFA</Text>
              <Text style={styles.oldPrice}>{item.price.toLocaleString()} FCFA</Text>
            </View>

            <View style={styles.btnRow}>
              <Pressable
                style={styles.detailBtn}
                onPress={() => handleOpenDetail(item.id)}
              >
                <Text style={styles.detailBtnText}>View Details</Text>
              </Pressable>

              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addToCart(item, 1)}
              >
                <Text style={styles.addBtnText}>+ Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Daily Combo Special */}
      <View style={styles.comboCard}>
        <Text style={styles.comboTitle}>🍱 Ultimate Study Combo</Text>
        <Text style={styles.comboDesc}>
          Pair any Main Course with a Bissap & Thiakry for only 3,000 FCFA (Save 1,000 FCFA!)
        </Text>
        <TouchableOpacity
          style={styles.comboBtn}
          onPress={() => router.push('/cart' as any)}
        >
          <Text style={styles.comboBtnText}>Build Your Combo in Cart</Text>
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
  heroBanner: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20
  },
  heroBadge: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6
  },
  heroSub: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12
  },
  specialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#E2E8F0'
  },
  headerInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A'
  },
  itemCategory: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },
  discountBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800'
  },
  desc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6
  },
  specialPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#D97706'
  },
  oldPrice: {
    fontSize: 14,
    color: '#94A3B8',
    textDecorationLine: 'line-through'
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8
  },
  detailBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  detailBtnText: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 13
  },
  addBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8
  },
  addBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13
  },
  comboCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginTop: 8
  },
  comboTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 6
  },
  comboDesc: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 18,
    marginBottom: 12
  },
  comboBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center'
  },
  comboBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
  }
});
