<template>
  <HeaderView />
  <div class="thankyou">
    <p class="thankyou__text">ご注文ありがとうございました！</p>
    <div class="thankyou__goHome">
      <router-link to="/"><a>ホームへ戻る</a></router-link>
    </div>
  </div>
</template>

<script>
import HeaderView from "../components/HeaderView.vue";

export default {
  components: {
    HeaderView,
  },
  data: () => ({}),
};
</script>
