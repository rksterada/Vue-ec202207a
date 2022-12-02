<template>
  <div class="deliveryTime">
    <p v-show="isFalse" class="deliveryTime__error">
      翌日以降で入力してください
    </p>
    <p class="deliveryTime__title">配達日時</p>
    <div class="deliveryTime__content">
      <input
        type="datetime-local"
        name="time"
        id="time"
        v-model="delivery"
        @change="onChangeTime"
        class="deliveryTime__content__text"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    delivery: "",
    isFalse: false,
  }),

  methods: {
    onChangeTime: function (event) {
      const today = new Date();
      const yyyy = today.getUTCFullYear();
      const MM = ("0" + (today.getUTCMonth() + 1)).slice(-2);
      const dd = ("0" + (today.getUTCDate() + 1)).slice(-2);
      const hh = ("0" + today.getUTCHours()).slice(-2);
      const mm = ("0" + today.getUTCMinutes()).slice(-2);
      const todayDate = yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm;

      if (todayDate > event.target.value) {
        this.isFalse = true;
        event.target.value = "";
        this.delivery = "";
        this.$emit("onChangeTime", {
          deliveryTime: this.delivery,
        });
      } else {
        this.isFalse = false;
        this.$emit("onChangeTime", {
          deliveryTime: this.delivery,
        });
      }
    },
  },
};
</script>
