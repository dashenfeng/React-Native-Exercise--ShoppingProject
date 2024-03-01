import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAll,
  clearOne,
  decrement,
  increment,
  sumPrice,
} from "../store/counterStore";

export default function ShopCart() {
  const { cart, sum } = useSelector((state) => state.counter); // state.counter counter 为这个仓库的名字
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sumPrice());
  }, [dispatch]);

  return (
    <View style={styles.box}>
      {/* 导航栏 */}
      <View style={[styles.navBar, styles.header]}>
        <Text style={styles.navFont}>名称</Text>
        <Text style={styles.navFont}>价格</Text>
        <Text style={styles.navFont}>数量</Text>
      </View>
      {/* 商品列表 还没发请求 */}
      <View style={styles.body}>
        {cart.map((item) => (
          <View
            key={item.id}
            style={[
              styles.navBar,
              { borderBottomWidth: 1, borderColor: "gray", marginBottom: 30 },
            ]}>
            <Text style={{ width: 80 }}>{item.name}</Text>
            <Text style={{ width: 40 }}>{item.price}</Text>
            <View style={[styles.navBar, { width: 50 }]}>
              <Text
                hitSlop={10}
                onPress={() => {
                  dispatch(decrement(item.id));
                  dispatch(sumPrice());
                  dispatch(clearOne(item.id));
                }}>
                -
              </Text>
              <Text>{item.count}</Text>
              <Text
                hitSlop={10}
                onPress={() => {
                  dispatch(increment(item.id));
                  dispatch(sumPrice());
                }}>
                +
              </Text>
            </View>
          </View>
        ))}
        <Text>总价:{sum}</Text>
      </View>

      {/* 结算列表 */}
      <View style={styles.footer}>
        <Button
          title="结算"
          onPress={() => {
            dispatch(clearAll());
            dispatch(sumPrice());
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 大盒子
  box: {
    backgroundColor: "lightGray",
    flex: 1,
  },
  navBar: {
    // backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navFont: {
    color: "black",
    fontSize: 20,
    fontWeight: "normal",
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 8,
  },
  footer: {
    flex: 1,
  },
});
