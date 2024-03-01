import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  increment,
  setCartList,
  sumPrice,
} from "../store/counterStore";

const forkFetch = () => {
  return new Promise((resolve) => {
    const data = [
      {
        id: 1,
        count: 2,
        name: "apple",
        price: 10,
      },
      {
        id: 2,
        count: 2,
        name: "orange",
        price: 20,
      },
      {
        id: 3,
        count: 2,
        name: "watermelon",
        price: 30,
      },
    ];
    setTimeout(() => {
      resolve(data);
    }, 1 * 1000);
  });
};

const RequestStatus = {
  IDLE: "IDLE",
  SUCCESS: "SUCCESS",
  PENDING: "PENDING",
  ERROR: "ERROR",
};

export default function Product({ navigation }) {
  const { ProductList, sum } = useSelector((state) => state.counter); // state.counter counter 为这个仓库的名字
  const dispatch = useDispatch();

  // 请求模拟的数据
  const [requestStatus, setRequestStatus] = useState(RequestStatus.IDLE);
  const getProductList = async () => {
    let result = await forkFetch();
    dispatch(setCartList(result));
    setRequestStatus(RequestStatus.SUCCESS);
    return "ok";
  };

  // 获取数据
  useEffect(() => {
    // 计算总价格
    dispatch(sumPrice());
    setRequestStatus(RequestStatus.PENDING);
    try {
      getProductList();
    } catch (error) {
      setRequestStatus(RequestStatus.ERROR);
      throw new Error("Fetch Error");
    }
  }, [dispatch]);

  if (requestStatus === 'PENDING') {
    return <Text>loading...</Text>
  }


  return (
    <View style={styles.box}>
      {/* 导航栏 */}
      <View style={[styles.navBar, styles.header]}>
        <Text style={styles.navFont}>名称</Text>
        <Text style={styles.navFont}>价格</Text>
        <Text style={styles.navFont}>操作</Text>
      </View>
      {/* 商品列表 还没发请求 */}
      <View style={styles.body}>
        {ProductList.map((item) => (
          <View
            key={item.id}
            style={[
              styles.navBar,
              { borderBottomWidth: 1, borderColor: "gray", marginBottom: 30 },
            ]}>
            <Text style={{ width: 80 }}>{item.name}</Text>
            <Text style={{ width: 40 }}>{item.price}</Text>
            <View style={[styles.navBar, { width: 50 }]}>
              <Button
                title="Add"
                onPress={() => {
                  dispatch(addProduct(item));
                  dispatch(sumPrice());
                }}></Button>
            </View>
          </View>
        ))}
        <Text>总价:{sum}</Text>
      </View>

      {/* 结算列表 */}
      <View style={styles.footer}>
        <Button
          title="查看购物车"
          onPress={() => navigation.navigate("Cart")}
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
