import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { getMenuItemById } from '../../data/cafeteriaMenu';
import { useCart } from '../../context/CartContext';

export default function ItemDetailScreen() {
  const router = useRouter();
  // REQUIREMENT 5: Only the identifier travels; the detail screen looks the data up
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = getMenuItemById(id || '');
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // REQUIREMENT 8: A not-found state when an identifier matches nothing
  if (!item) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        {/* REQUIREMENT 6: Set header title for Not Found state */}
        <Stack.Screen options={{ title: 'Item Not Found' }} />
        
        <Text style={styles.notFoundEmoji}>🔍❌</Text>
        <Text style={styles.notFoundTitle}>Item Not Found</Text>
        <Text style={styles.notFoundDesc}>
          Sorry, no menu item exists with ID &quot;{id}&quot;. It may have been removed or updated from today&apos;s cafeteria menu.
        </Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.backBtnText}>Return to Cafeteria Menu</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const effectivePrice = item.isSpecial && item.specialPrice ? item.specialPrice : item.price;
  const totalPrice = effectivePrice * quantity;

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* REQUIREMENT 6: The detail screen'header title is the item's name */}
      <Stack.Screen
        options={{
          title: item.name,
          headerBackTitle: 'Menu'
        }}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Hero Graphic */}
        <View style={styles.heroContainer}>
          <Image
            source={item.imageSource}
            style={styles.heroImage}
            contentFit="cover"
            transition={400}
          />
          {item.isSpecial && (
            <View style={styles.heroSpecialBadge}>
              <Text style={styles.heroSpecialBadgeText}>CAMPUS DEAL</Text>
            </View>
          )}
        </View>

        {/* Title & Category */}
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.category}>{item.category} • Prep time ~{item.prepTimeMinutes} mins</Text>

          <View style={styles.priceRow}>
            {item.isSpecial && item.specialPrice ? (
              <View style={styles.priceBadgeRow}>
                <Text style={styles.specialPriceText}>{item.specialPrice.toLocaleString()} FCFA</Text>
                <Text style={styles.oldPriceText}>{item.price.toLocaleString()} FCFA</Text>
              </View>
            ) : (
              <Text style={styles.priceText}>{item.price.toLocaleString()} FCFA</Text>
            )}

            <View style={styles.ratingBadge}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.calText}> ({item.calories} kcal)</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{item.detailedDescription}</Text>
        </View>

        {/* Dietary Tags & Allergens */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary & Allergens</Text>
          
          <View style={styles.tagRow}>
            {item.dietary.map((d) => (
              <View key={d} style={styles.dietaryBadge}>
                <Text style={styles.dietaryText}>✓ {d}</Text>
              </View>
            ))}
          </View>

          {item.allergens.length > 0 ? (
            <View style={styles.allergenBox}>
              <Text style={styles.allergenTitle}>⚠️ Contains Allergens:</Text>
              <Text style={styles.allergenText}>{item.allergens.join(', ')}</Text>
            </View>
          ) : (
            <Text style={styles.noAllergens}>No major allergens declared.</Text>
          )}
        </View>

        {/* EXTENSION REQUIREMENT: Second Level of Detail Button */}
        <TouchableOpacity
          style={styles.secondLevelBtn}
          onPress={() => setShowNutritionModal(true)}
        >
          <Text style={styles.secondLevelBtnIcon}>📊</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.secondLevelBtnTitle}>View Ingredients & Nutrition</Text>
            <Text style={styles.secondLevelBtnSub}>Detailed calorie breakdown & ingredient origins</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Quantity Selector */}
        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Select Quantity</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={[styles.qtyBtn, quantity <= 1 && styles.qtyBtnDisabled]}
              disabled={quantity <= 1}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyText}>{quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Floating Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceContainer}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>{totalPrice.toLocaleString()} FCFA</Text>
        </View>

        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>
            {addedToast ? '✓ Added to Cart!' : `Add ${quantity} to Order`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* EXTENSION REQUIREMENT: Second Level of Detail Modal */}
      <Modal
        visible={showNutritionModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNutritionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ingredients & Nutrition</Text>
              <TouchableOpacity onPress={() => setShowNutritionModal(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }}>
              <Text style={styles.modalSubtitle}>Recipe Ingredients for {item.name}:</Text>

              {item.ingredients.map((ing, idx) => (
                <View key={idx} style={styles.ingRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.ingName}>{ing.name}</Text>
                    <Text style={styles.ingAmount}>Portion: {ing.amount}</Text>
                  </View>
                  <Text style={styles.ingCal}>{ing.calories} kcal</Text>
                </View>
              ))}

              <View style={styles.nutrSummaryBox}>
                <Text style={styles.nutrSummaryTitle}>Nutritional Highlights</Text>
                <Text style={styles.nutrItem}>• Total Energy: {item.calories} Calories</Text>
                <Text style={styles.nutrItem}>• Category: {item.category}</Text>
                <Text style={styles.nutrItem}>• Prep Time: {item.prepTimeMinutes} Minutes</Text>
                <Text style={styles.nutrItem}>• Allergen Status: {item.allergens.length > 0 ? item.allergens.join(', ') : 'Allergen Safe'}</Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setShowNutritionModal(false)}
            >
              <Text style={styles.closeModalBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  content: {
    padding: 16,
    paddingBottom: 100
  },
  heroContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    backgroundColor: '#CBD5E1'
  },
  heroImage: {
    width: '100%',
    height: '100%'
  },
  heroSpecialBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#D97706',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  heroSpecialBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800'
  },
  headerInfo: {
    marginBottom: 16
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4
  },
  category: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#059669'
  },
  priceBadgeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8
  },
  specialPriceText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#D97706'
  },
  oldPriceText: {
    fontSize: 16,
    color: '#94A3B8',
    textDecorationLine: 'line-through'
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  star: {
    fontSize: 14,
    marginRight: 2
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#78350F'
  },
  calText: {
    fontSize: 12,
    color: '#92400E'
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10
  },
  dietaryBadge: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  dietaryText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '600'
  },
  allergenBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 4
  },
  allergenTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#991B1B'
  },
  allergenText: {
    fontSize: 12,
    color: '#B91C1C',
    marginTop: 2
  },
  noAllergens: {
    fontSize: 13,
    color: '#059669',
    fontWeight: '500'
  },
  secondLevelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16
  },
  secondLevelBtnIcon: {
    fontSize: 24,
    marginRight: 12
  },
  secondLevelBtnTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  },
  secondLevelBtnSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2
  },
  chevron: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8
  },
  quantitySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  qtyBtnDisabled: {
    opacity: 0.4
  },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A'
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A'
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomPriceContainer: {
    justifyContent: 'center'
  },
  totalLabel: {
    fontSize: 12,
    color: '#64748B'
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A'
  },
  addToCartBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12
  },
  addToCartText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15
  },

  // Not Found State Styles
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC'
  },
  notFoundEmoji: {
    fontSize: 64,
    marginBottom: 16
  },
  notFoundTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8
  },
  notFoundDesc: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24
  },
  backBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A'
  },
  closeBtn: {
    fontSize: 18,
    color: '#64748B',
    padding: 4
  },
  modalSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12
  },
  ingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  ingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B'
  },
  ingAmount: {
    fontSize: 12,
    color: '#64748B'
  },
  ingCal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB'
  },
  nutrSummaryBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  nutrSummaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6
  },
  nutrItem: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4
  },
  closeModalBtn: {
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16
  },
  closeModalBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15
  }
});
