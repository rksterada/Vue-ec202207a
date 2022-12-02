<template>
  <HeaderView />
  <div class="detail">
    <div class="detail__itemDetail">
      <img :src="item.imagePath" class="detail__itemDetail__image" />
      <div class="detail__itemDetail__content">
        <p class="detail__itemDetail__content__name">{{ item.name }}</p>
        <p class="detail__itemDetail__content__description">
          {{ item.description }}
        </p>
        <p class="detail__itemDetail__content__price">
          {{ Number(item.price).toLocaleString() }}円(税抜)
        </p>
      </div>
    </div>

    <div class="detail__topping">
      <p class="detail__topping__title">Topping</p>
      <span
        v-for="topping in toppings"
        :key="topping.id"
        class="detail__topping__list"
      >
        <input
          type="checkbox"
          v-model="topping.checked"
          @change="checked(topping)"
          class="detail__topping__checkbox"
        />
        <span class="detail__topping__name">{{ topping.name }}</span>
      </span>
    </div>

    <div class="detail__quantity">
      <p class="detail__quantity__title">数量</p>
      <select
        v-model="quantity"
        @change="addQuantity()"
        class="detail__quantity__select"
      >
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="detail__total">
      <p>
        <span class="detail__total__title">合計金額</span>
        <span class="detail__total__price"
          >{{ totalPrice().toLocaleString() }}円(税抜)</span
        >
      </p>
    </div>
    <div class="detail__btn">
      <button class="detail__btn__cart" @click="addCart()">AddCart</button>
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
    item: {},
    toppings: {},
    quantity: 1,
    isShowTopping: [],
    checkToppingList: [],
    toppingPrice: 0,
    quantityPrice: 0,
  }),

  mounted: async function () {
    const id = this.$route.params.id;
    const detailData = await fetch(`http://localhost:8000/items/${id}`).then(
      (res) => res.json()
    );
    this.item = detailData;

    const toppingList = await fetch(`http://localhost:8000/topping`).then(
      (res) => res.json()
    );
    this.toppings = toppingList;
  },

  methods: {
    checked: function (topping) {
      if (topping.checked === true) {
        this.isShowTopping.push(topping);
      }
      this.addToppingList();
    },

    addToppingList: function () {
      const arr = this.isShowTopping.filter((topping) => {
        return topping.checked === true;
      });
      this.checkToppingList = arr.filter(
        (element, index) => arr.indexOf(element) === index
      );
      this.toppingPrice = 0;
      this.checkToppingList.forEach((checkTopping) => {
        this.toppingPrice += checkTopping.price;
      });
    },

    addQuantity: function () {
      this.quantityPrice = 0;
      this.quantityPrice = Number(this.item.price) * (this.quantity - 1);
    },

    totalPrice: function () {
      return Number(this.item.price) + this.quantityPrice + this.toppingPrice;
    },

    addCart: async function () {
      await fetch("http://localhost:8000/orderItems", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imagePath: this.item.imagePath,
          name: this.item.name,
          price: this.item.price,
          toppings: this.checkToppingList,
          quantity: this.quantity,
          total: this.totalPrice(),
        }),
      });
      this.$router.push("/");
    },
  },
};
</script>
