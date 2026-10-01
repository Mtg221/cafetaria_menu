import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, clearCart, totalPrice } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const tax = Math.round(totalPrice * 0.05); // 5% tax in FCFA
  const studentDiscount = totalPrice >= 3000 ? 500 : 0;
  const finalTotal = Math.max(0, totalPrice + tax - studentDiscount);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {orderPlaced ? (
        <View style={styles.successContainer}>
          <Text style={styles.successEmoji}>🎉</Text>
          <Text style={styles.successTitle}>Order Placed Successfully!</Text>
          <Text style={styles.orderNumber}>Pickup Order #CAMPUS-4829</Text>
          <Text style={styles.successDesc}>
            Your order has been sent to the Student Union Dining Hall kitchen. Estimated pickup time: 10 - 15 mins.
          </Text>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => router.dismiss()}
          >
            <Text style={styles.doneBtnText}>Back to Cafeteria</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.headerBox}>
              <Text style={styles.headerTitle}>🛒 Express Pickup Basket</Text>
              <Text style={styles.headerSub}>Student Union Cafeteria • Order Ahead</Text>
            </View>

            {cart.length === 0 ? (
              <View style={styles.emptyCartBox}>
                <Text style={styles.emptyCartEmoji}>🛍️</Text>
                <Text style={styles.emptyCartTitle}>Your Basket is Empty</Text>
                <Text style={styles.emptyCartSub}>
                  Explore today&apos;s cafeteria menu or daily specials to add delicious food!
                </Text>
                <TouchableOpacity
                  style={styles.browseBtn}
                  onPress={() => router.dismiss()}
                >
                  <Text style={styles.browseBtnText}>Browse Menu</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.itemList}>
                  {cart.map(({ item, quantity }) => {
                    const price = item.isSpecial && item.specialPrice ? item.specialPrice : item.price;
                    const itemSubtotal = price * quantity;

                    return (
                      <View key={item.id} style={styles.cartCard}>
                        <Image
                          source={item.imageSource}
                          style={styles.itemImage}
                          contentFit="cover"
                          transition={200}
                        />
                        <View style={styles.itemInfo}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemPrice}>{price.toLocaleString()} FCFA each</Text>
                        </View>

                        <View style={styles.qtyContainer}>
                          <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => updateQuantity(item.id, -1)}
                          >
                            <Text style={styles.qtyBtnText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.qtyNum}>{quantity}</Text>
                          <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => updateQuantity(item.id, 1)}
                          >
                            <Text style={styles.qtyBtnText}>+</Text>
                          </TouchableOpacity>
                        </View>

                        <Text style={styles.subtotal}>{itemSubtotal.toLocaleString()} FCFA</Text>
                      </View>
                    );
                  })}
                </View>

                {/* Summary Box */}
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryTitle}>Payment Summary</Text>
                  
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>{totalPrice.toLocaleString()} FCFA</Text>
                  </View>

                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Estimated Tax (5%)</Text>
                    <Text style={styles.summaryValue}>{tax.toLocaleString()} FCFA</Text>
                  </View>

                  {studentDiscount > 0 && (
                    <View style={styles.summaryRow}>
                      <Text style={styles.discountLabel}>🎓 Student Pass Discount</Text>
                      <Text style={styles.discountValue}>-{studentDiscount.toLocaleString()} FCFA</Text>
                    </View>
                  )}

                  <View style={styles.divider} />

                  <View style={styles.summaryRow}>
                    <Text style={styles.totalLabel}>Total Due</Text>
                    <Text style={styles.totalValue}>{finalTotal.toLocaleString()} FCFA</Text>
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          {cart.length > 0 && (
            <View style={styles.footerBar}>
              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={handlePlaceOrder}
              >
                <Text style={styles.checkoutBtnText}>
                  Confirm Pickup Order • {finalTotal.toLocaleString()} FCFA
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A'
  },
  content: {
    padding: 16,
    paddingBottom: 100
  },
  headerBox: {
    marginBottom: 16
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  headerSub: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2
  },
  emptyCartBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 32,
    marginTop: 20
  },
  emptyCartEmoji: {
    fontSize: 56,
    marginBottom: 12
  },
  emptyCartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6
  },
  emptyCartSub: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20
  },
  browseBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12
  },
  browseBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15
  },
  itemList: {
    gap: 10,
    marginBottom: 16
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155'
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#334155'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  },
  itemPrice: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 4,
    marginRight: 10
  },
  qtyBtn: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 6
  },
  qtyBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  qtyNum: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 8
  },
  subtotal: {
    color: '#10B981',
    fontSize: 15,
    fontWeight: '700',
    minWidth: 50,
    textAlign: 'right'
  },
  summaryCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  summaryLabel: {
    color: '#94A3B8',
    fontSize: 14
  },
  summaryValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600'
  },
  discountLabel: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '600'
  },
  discountValue: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '700'
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 10
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  totalValue: {
    color: '#10B981',
    fontSize: 20,
    fontWeight: '800'
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    padding: 16
  },
  checkoutBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16
  },

  // Success State
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: 16
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6
  },
  orderNumber: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '700',
    marginBottom: 12
  },
  successDesc: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24
  },
  doneBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15
  }
});
