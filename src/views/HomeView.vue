<template>
  <HeaderView />
  <div>
    <serchItem />
  </div>
</template>

<script>
import serchItem from "../components/Search.vue";
import HeaderView from "../components/HeaderView.vue";

export default {
  components: {
    serchItem,
    HeaderView,
  },

  data: () => ({}),
};
</script>
