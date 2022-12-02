<template>
  <div class="item">
    <img :src="item.imagePath" width="100" class="item__logo" />
    <div class="item__info">
      <p>{{ item.name }}</p>
      <p>{{ item.price.toLocaleString() }}円(税抜)</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    itemData: {},
  }),

  props: { item: { Object } },
};
</script>
