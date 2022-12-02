<template>
  <HeaderView />
  <div class="confirm">
    <h2>ご注文内容の確認</h2>
    <div class="confirm__content">
      <table class="confirm__content__table">
        <tr>
          <th>商品内容</th>
          <th>数量</th>
          <th>トッピング</th>
          <th>小計</th>
        </tr>

        <tr v-for="orderItem in orderItems" :key="orderItem.id">
          <td>
            <img
              :src="orderItem.imagePath"
              width="100"
              class="confirm__content__image"
            />
            <p class="confirm__content__name">{{ orderItem.name }}</p>
            <p class="confirm__content__price">
              {{ orderItem.price.toLocaleString() }}円
            </p>
          </td>
          <td>
            <p class="confirm__content__quantity">{{ orderItem.quantity }}個</p>
          </td>
          <td>
            <div class="confirm__content__topping">
              <ul>
                <li v-for="topping in orderItem.toppings" :key="topping.id">
                  {{ topping.name }} <span>{{ topping.price }}円</span>
                </li>
              </ul>
            </div>
          </td>
          <td>
            <p class="confirm__content__total">
              {{ orderItem.total.toLocaleString() }}円(税抜)
            </p>
          </td>
        </tr>
      </table>
    </div>

    <div class="confirm__total">
      <p>
        合計金額 <span>{{ totalOrderPrice.toLocaleString() }}円(税込)</span>
      </p>
    </div>

    <div class="confirm__form">
      <p v-show="isUser" class="confirm__error">
        お届け先情報を入力してください
      </p>
      <DeliveryUser @onChangeUser="getDeliveryUser" />

      <p v-show="isTime" class="confirm__error">配達日時を入力してください</p>
      <DeliveryTime @onChangeTime="getDeliveryTime" />

      <div class="confirm__pay">
        <p class="confirm__pay__title">お支払い方法</p>
        <div class="confirm__pay__content">
          <input
            type="radio"
            id="money"
            name="pay"
            class="confirm__pay__content__text"
          />
          <label for="money" class="confirm__pay__content__label">現金</label>
          <input
            type="radio"
            id="credit"
            name="pay"
            class="confirm__pay__content__text"
          />
          <label for="credit" class="confirm__pay__content__label"
            >クレジットカード</label
          >
        </div>
      </div>
    </div>

    <div class="confirm__btn">
      <button type="button" @click="addOrder()" class="confirm__btn__ok">
        注文
      </button>
    </div>
  </div>
</template>

<script>
import DeliveryUser from "../components/DeliveryUser.vue";
import DeliveryTime from "../components/DeliveryTime.vue";
import HeaderView from "../components/HeaderView.vue";

export default {
  components: {
    DeliveryUser,
    DeliveryTime,
    HeaderView,
  },

  data: () => ({
    orderItems: [],
    totalOrderPrice: 0,
    DeliveryUser: {},
    DeliveryTime: {},
    isUser: false,
    isTime: false,
  }),

  mounted: async function () {
    const orderData = await fetch("http://localhost:8000/orderItems").then(
      (res) => res.json()
    );
    this.orderItems = orderData;

    this.orderItems.forEach((orderItem) => {
      this.totalOrderPrice += orderItem.total;
    });
    this.totalOrderPrice = Math.floor(this.totalOrderPrice * 1.1);
  },

  methods: {
    getDeliveryUser(value) {
      this.DeliveryUser = value;
    },
    getDeliveryTime(value) {
      this.DeliveryTime = value;
    },

    addOrder: async function () {
      if (
        !(
          this.DeliveryUser.name &&
          this.DeliveryUser.email &&
          this.DeliveryUser.phonenumber &&
          this.DeliveryUser.zipcode &&
          this.DeliveryUser.address
        )
      ) {
        this.isUser = true;
        this.isTime = false;
      } else if (!this.DeliveryTime.deliveryTime) {
        this.isUser = false;
        this.isTime = true;
      } else {
        this.isUser = false;
        this.isTime = false;
        await fetch("http://localhost:8000/order", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: this.DeliveryUser,
            time: this.DeliveryTime,
            item: this.orderItems,
            total: this.totalOrderPrice,
          }),
        });

        await this.orderItems.forEach((orderItem) => {
          fetch(`http://localhost:8000/orderItems/${orderItem.id}`, {
            method: "delete",
          });
        });

        this.$router.push("/thankyou");
      }
    },
  },
};
</script>
