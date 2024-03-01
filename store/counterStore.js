import { createSlice } from "@reduxjs/toolkit";

// 创建store
const counterStore = createSlice({
  name: "counter",
  // 初始状态数据
  initialState: {
    // 商品列表
    ProductList: [],
    // 购物车列表
    cart: [],
    sum: 0,
  },
  // 修改状态的方法
  reducers: {
    // 第一次加载商品列表
    setCartList(state, action) {
      state.ProductList = action.payload;
    },
    // 把东西加到购物车
    addProduct(state, action) {
      let index = state.cart.findIndex((obj) => obj.id === action.payload.id);
      if (index === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[index].count++;
      }
    },
    increment(state, action) {
      let index = state.cart.findIndex((obj) => obj.id === action.payload);
      state.cart[index].count++;
    },
    decrement(state, action) {
      let index = state.cart.findIndex((obj) => obj.id === action.payload);
      if (state.cart[index].count > 0) {
        state.cart[index].count--;
      }
    },
    sumPrice(state, action) {
      state.sum = state.cart.reduce(
        (acc, crrObj) => acc + crrObj.price * crrObj.count,
        0
      );
    },
    clearOne(state, action) {
      let index = state.cart.findIndex((obj) => obj.id === action.payload);
      if (state.cart[index].count === 0) {
        state.cart.splice(index, 1); // 不买啦
      }
    },
    clearAll(state, action) {
      state.cart = [];
    },
  },
});

const {
  increment,
  decrement,
  sumPrice,
  clearOne,
  clearAll,
  setCartList,
  addProduct,
} = counterStore.actions; // 解构出reducers里的方法
const counterReducer = counterStore.reducer; // 获取reducer

// 导出
export {
  increment,
  decrement,
  sumPrice,
  clearOne,
  clearAll,
  setCartList,
  addProduct,
};
export default counterReducer;
