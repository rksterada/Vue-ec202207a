<template>
  <HeaderView />
  <form>
    <div class="login">
      <h2 class="login__title">ログイン</h2>
      <div class="login__inner">
        <p v-show="isFailed" class="login__isFailed">
          メールアドレスまたはパスワードが正しくありません
        </p>
        <label for="email" class="login__label">メールアドレス</label>
        <input
          type="text"
          id="email"
          v-model="email"
          placeholder="email"
          class="login__text"
        />

        <label for="password" class="login__label">パスワード</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="password"
          class="login__text"
        />
      </div>
      <div class="login__btn">
        <button @click="userLogin" type="button" class="loginBtn">Login</button>
        <button @click="clear" class="clearBtn">clear</button>
      </div>
    </div>
  </form>
</template>

<script>
import HeaderView from "../components/HeaderView.vue";

export default {
  components: {
    HeaderView,
  },

  data: () => ({
    email: "",
    password: "",
    isFailed: false,
  }),

  methods: {
    userLogin: async function () {
      const userData = await fetch("http://localhost:8000/users").then((res) =>
        res.json()
      );
      userData.forEach((user) => {
        if (this.email === user.email && this.password === user.password) {
          document.cookie = `id=${user.id}; max-age=86400`;
          document.cookie = `name=${user.name}; max-age=86400`;
          if (this.$route.query.from) {
            this.$router.push("/cart");
          } else {
            this.$router.push("/");
          }
        } else {
          this.isFailed = true;
        }
      });
    },

    clear: function () {
      this.email = "";
      this.password = "";
    },
  },
};
</script>
