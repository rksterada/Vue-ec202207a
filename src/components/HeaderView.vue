<template>
  <header class="header">
    <router-link to="/">
      <img src="favicon.ico" class="header__logo" />
    </router-link>

    <div v-show="isCookie">
      <nav class="header__nav">
        <ul class="header__list">
          <li class="header__item">
            <router-link to="/cart">
              <a>Cart</a>
            </router-link>
          </li>
          <li class="header__item">
            <router-link to="/login">
              <a>Login</a>
            </router-link>
          </li>
          <li class="header__item">
            <router-link to="/signup">
              <a>SignUp</a>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div v-show="!isCookie">
      <nav class="header__nav">
        <ul class="header__list">
          <li class="header__item">
            <router-link to="/cart">
              <a>Cart</a>
            </router-link>
          </li>
          <li >
            <p>{{ name }}さんようこそ</p>
          </li>
          <li >
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    isCookie: false,
    name: "",
  }),

  methods: {
    logout: function () {
      const cookieId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("id"));
      const cookieName = document.cookie
        .split("; ")
        .find((row) => row.startsWith("name"));
      document.cookie = `${cookieId}; max-age=0`;
      document.cookie = `${cookieName}; max-age=0`;
      this.isCookie = true;
    },
  },

  mounted: function () {
    if (document.cookie) {
      this.isCookie = false;
      this.name = document.cookie
        .split("; ")
        .find((row) => row.startsWith("name"))
        .split("=")[1];
    } else {
      this.isCookie = true;
    }
  },
};
</script>
