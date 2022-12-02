<template>
  <div>
    <div class="search">
      <p class="search__title">商品検索</p>
      <input type="text" class="search__text" v-model="itemName" placeholder="ItemName"/>
      <div class="search__btn">
        <button @click="search" class="searchBtn">検索</button>
        <button @click="cancel" class="clearBtn">クリア</button>
      </div>
    </div>
    <div class="content">
      <div v-if="isSearch">
        <div v-show="isFailed" class="content__failed">
          該当する商品がありません。
        </div>
        <div class="content__card">
          <div v-for="searchItem in searchItems" :key="searchItem.id">
            <router-link
              :to="{ name: 'detail', params: { id: searchItem.id } }"
              class="content__link"
            >
              <itemsCard :item="searchItem"></itemsCard
            ></router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="content__card">
          <div v-for="product in products" :key="product.id">
            <router-link
              :to="{ name: 'detail', params: { id: product.id } }"
              class="content__link"
            >
              <itemsCard :item="product"></itemsCard
            ></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemsCard from "./itemCard.vue";

export default {
  name: "searchItem",

  components: {
    itemsCard,
  },

  data: () => ({
    itemName: "",
    products: [],
    searchItems: [],
    isSearch: false,
    isFailed: false,
  }),

  async mounted() {
    const data = await fetch("http://localhost:8000/items");
    const json = await data.json();
    this.products = json;
  },

  methods: {
    search: function () {
      if (this.itemName.length > 0) {
        const itemsFilter = this.products.filter((e) => {
          return e.name.indexOf(this.itemName) >= 0;
        });
        this.isSearch = true;
        this.itemName = "";
        if (itemsFilter.length === 0) {
          this.searchItems = "";
          this.isFailed = true;
        } else {
          this.isFailed = false;
          this.searchItems = itemsFilter;
        }
      } else {
        return;
      }
    },

    cancel: function () {
      this.itemName = "";
      this.isSearch = false;
    },
  },
};
</script>
