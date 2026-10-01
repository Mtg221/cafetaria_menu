import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { CAFETERIA_ITEMS } from '../../data/cafeteriaMenu';
import { MenuItem, CategoryType } from '../../types/menu';
import { useCart } from '../../context/CartContext';

export default function MenuScreen() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Mains', 'Sides & Snacks', 'Drinks', 'Desserts'];

  // Filter items based on search and category
  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    // First filter all items
    const matchedItems = CAFETERIA_ITEMS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.dietary.some((d) => d.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Group into SectionList sections
    const categoryOrder: CategoryType[] = ['Mains', 'Sides & Snacks', 'Drinks', 'Desserts'];
    const sections: { title: CategoryType; data: MenuItem[] }[] = [];

    categoryOrder.forEach((cat) => {
      const catItems = matchedItems.filter((i) => i.category === cat);
      if (catItems.length > 0) {
        sections.push({ title: cat, data: catItems });
      }
    });

    return sections;
  }, [searchQuery, selectedCategory]);

  const handleItemPress = (itemId: string) => {
    // REQUIREMENT 5: Only the identifier travels; the detail screen looks the data up
    router.push({
      pathname: '/item/[id]' as any,
      params: { id: itemId }
    });
  };

  const handleOpenCart = () => {
    router.push('/cart' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar with Search & Cart */}
      <View style={styles.topBar}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search food, drinks, vegan..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* REQUIREMENT 7 MODAL TRIGGER: Cart Modal */}
        <TouchableOpacity style={styles.cartBtn} onPress={handleOpenCart}>
          <Text style={styles.cartIcon}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Category Filter Chips */}
      <View style={styles.chipContainer}>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, isSelected && styles.chipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* REQUIREMENT 3 & EXTENSION: SectionList Grouped Menu with Empty State */}
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.itemCard, pressed && styles.itemCardPressed]}
            onPress={() => handleItemPress(item.id)}
          >
            <Image
              source={item.imageSource}
              style={styles.itemImage}
              contentFit="cover"
              transition={300}
            />

            <View style={styles.itemDetails}>
              <View style={styles.itemTitleRow}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                {item.isSpecial && (
                  <View style={styles.specialBadge}>
                    <Text style={styles.specialBadgeText}>DEAL</Text>
                  </View>
                )}
              </View>

              <Text style={styles.itemDesc} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.itemMetaRow}>
                <View style={styles.priceContainer}>
                  {item.isSpecial && item.specialPrice ? (
                    <>
                      <Text style={styles.specialPrice}>{item.specialPrice.toLocaleString()} FCFA</Text>
                      <Text style={styles.originalPrice}>{item.price.toLocaleString()} FCFA</Text>
                    </>
                  ) : (
                    <Text style={styles.price}>{item.price.toLocaleString()} FCFA</Text>
                  )}
                </View>

                <View style={styles.ratingBadge}>
                  <Text style={styles.starIcon}>⭐</Text>
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.calText}> • {item.calories} cal</Text>
                </View>
              </View>

              {item.dietary.length > 0 && (
                <View style={styles.dietaryRow}>
                  {item.dietary.map((d) => (
                    <Text key={d} style={styles.dietaryTag}>
                      {d}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          // EXTENSION REQUIREMENT: Search field with an empty state
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyTitle}>No Menu Items Found</Text>
            <Text style={styles.emptySubtitle}>
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try searching for something else or clearing filters.
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              <Text style={styles.resetBtnText}>Clear Search & Filters</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A'
  },
  clearBtn: {
    padding: 4
  },
  clearText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: 'bold'
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  cartIcon: {
    fontSize: 20
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold'
  },
  chipContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    flexWrap: 'wrap'
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#E2E8F0'
  },
  chipActive: {
    backgroundColor: '#2563EB'
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569'
  },
  chipTextActive: {
    color: '#FFFFFF'
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24
  },
  sectionHeader: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 10,
    marginTop: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2
  },
  itemCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }]
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#E2E8F0'
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center'
  },
  itemTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
    marginRight: 6
  },
  specialBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F59E0B'
  },
  specialBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706'
  },
  itemDesc: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
    lineHeight: 18
  },
  itemMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#059669'
  },
  specialPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#D97706'
  },
  originalPrice: {
    fontSize: 13,
    color: '#94A3B8',
    textDecorationLine: 'line-through'
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  starIcon: {
    fontSize: 12,
    marginRight: 2
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155'
  },
  calText: {
    fontSize: 12,
    color: '#64748B'
  },
  dietaryRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
    flexWrap: 'wrap'
  },
  dietaryTag: {
    fontSize: 10,
    fontWeight: '600',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 40
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 12
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16
  },
  resetBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  }
});
