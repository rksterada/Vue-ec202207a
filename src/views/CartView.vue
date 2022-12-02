<template>
  <HeaderView />
  <div class="cart">
    <h2>ショッピングカート</h2>
    <p v-show="isOrder" class="cart__alert">カートは空です</p>
    <div v-show="!isOrder">
      <div class="cart__content">
        <table class="cart__content__table">
          <tr>
            <th>商品内容</th>
            <th>数量</th>
            <th>トッピング</th>
            <th>小計</th>
            <th></th>
          </tr>

          <tr v-for="orderItem in orderItems" :key="orderItem.id">
            <td>
              <img
                :src="orderItem.imagePath"
                width="100"
                class="cart__content__image"
              />
              <p class="cart__content__name">{{ orderItem.name }}</p>
              <p class="cart__content__price">
                {{ orderItem.price.toLocaleString() }}円
              </p>
            </td>

            <td>
              <p class="cart__content__quantity">{{ orderItem.quantity }}個</p>
            </td>

            <td>
              <div class="cart__content__topping">
                <ul>
                  <li v-for="topping in orderItem.toppings" :key="topping.id">
                    {{ topping.name }} <span>{{ topping.price }}円</span>
                  </li>
                </ul>
              </div>
            </td>

            <td>
              <p class="cart__content__total">
                {{ orderItem.total.toLocaleString() }}円(税抜)
              </p>
            </td>

            <td>
              <button
                @click="orderDelete(orderItem.id)"
                class="cart__content__clearBtn"
              >
                削除
              </button>
            </td>
          </tr>
        </table>
      </div>

      <div class="cart__total">
        <p>
          合計金額
          <span>{{ totalOrderPrice.toLocaleString() }} 円(税込)</span>
        </p>
      </div>

      <div class="cart__btn">
        <button type="button" @click="gotoConfirm()" class="cart__btn__ok">
          確定
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from "../components/HeaderView.vue";

export default {
  components: {
    HeaderView,
  },

  data: () => ({
    orderItems: [],
    isTopping: false,
    isOrder: false,
    totalOrderPrice: 0,
  }),

  mounted: async function () {
    const orderData = await fetch("http://localhost:8000/orderItems").then(
      (res) => res.json()
    );
    this.orderItems = orderData;
    if (this.orderItems.length === 0) {
      this.isOrder = true;
    }

    this.orderItems.forEach((orderItem) => {
      this.totalOrderPrice += orderItem.total;
    });
    this.totalOrderPrice = Math.floor(this.totalOrderPrice * 1.1);
  },

  methods: {
    orderDelete: async function (id) {
      await fetch(`http://localhost:8000/orderItems/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.orderTotalPrice();
    },

    orderTotalPrice: async function () {
      const response = await fetch("http://localhost:8000/orderItems").then(
        (res) => res.json()
      );
      this.orderItems = response;
      this.totalOrderPrice = 0;
      this.orderItems.forEach((orderItem) => {
        this.totalOrderPrice += orderItem.total;
      });
      this.totalOrderPrice = Math.floor(this.totalOrderPrice * 1.1);

      if (this.orderItems.length === 0) {
        this.isOrder = true;
      }
    },

    gotoConfirm: function () {
      if (document.cookie) {
        this.$router.push("/confirm");
      } else {
        this.$router.push({
          name: "login",
          query: {
            from: "cart",
          },
        });
      }
    },
  },
};
</script>
