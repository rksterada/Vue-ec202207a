<template>
  <div class="deliveryUser">
    <div class="deliveryUser__content">
      <p class="deliveryUser__title">お届け先情報</p>
      <label for="name" class="deliveryUser__content__label">お名前</label>
      <input
        type="text"
        id="name"
        v-model="name"
        placeholder="Name"
        @change="onChangeUser"
        class="deliveryUser__content__text"
      />

      <label for="email" class="deliveryUser__content__label"
        >メールアドレス</label
      >
      <input
        type="text"
        id="email"
        v-model="email"
        placeholder="Email"
        @change="onChangeUser"
        class="deliveryUser__content__text"
      />

      <label for="phonenumber" class="deliveryUser__content__label"
        >電話番号</label
      >
      <input
        type="text"
        id="phonenumber"
        v-model="phonenumber"
        placeholder="PhoneNumber"
        @change="onChangeUser"
        class="deliveryUser__content__text"
      />

      <label for="zipcode" class="deliveryUser__content__label">郵便番号</label>
      <input
        type="text"
        id="zipcode"
        v-model="zipcode"
        placeholder="Zipcode"
        @change="onChangeUser"
        class="deliveryUser__content__text"
      />

      <label for="address" class="deliveryUser__content__label">住所</label>
      <input
        type="text"
        id="address"
        v-model="address"
        placeholder="Address"
        @change="onChangeUser"
        class="deliveryUser__content__text"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "",
    email: "",
    phonenumber: "",
    zipcode: "",
    address: "",
    isFalse: false,
  }),

  methods: {
    onChangeUser() {
      this.isFalse = false;
      this.$emit("onChangeUser", {
        name: this.name,
        email: this.email,
        phonenumber: this.phonenumber,
        zipcode: this.zipcode,
        address: this.address,
      });
    },
  },
};
</script>
