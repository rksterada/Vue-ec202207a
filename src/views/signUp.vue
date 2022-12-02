<template>
  <HeaderView />
  <form>
    <div class="signUp">
      <h2>新規登録</h2>
      <p v-show="isFailed" class="signUp__isFailed">
        全ての項目を正しく入力してください
      </p>
      <div class="signUp__inner">
        <label for="first_name" class="signUp__label">性</label>
        <input
          type="text"
          id="first_name"
          v-model="firstname"
          placeholder="firstName"
          class="signUp__text"
        />

        <label for="last_name" class="signUp__label">名</label>
        <input
          type="text"
          id="last_name"
          v-model="lastname"
          placeholder="lastName"
          class="signUp__text"
        />

        <label for="email" class="signUp__label">メールアドレス</label>
        <p v-show="emailFailed" class="signUp__isFailed">
          メールアドレスが既にあります
        </p>
        <input
          type="text"
          id="email"
          v-model="email"
          placeholder="email"
          class="signUp__text"
        />

        <label for="phonenumber" class="signUp__label">電話番号</label>
        <input
          type="text"
          id="phonenumber"
          v-model="phonenumber"
          placeholder="phoneNumber"
          class="signUp__text"
        />

        <label for="password" class="signUp__label"
          >パスワード(最低6文字)</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="password"
          class="signUp__text"
        />

        <label for="confirm_password" class="signUp__label"
          >確認用パスワード</label
        >
        <input
          type="password"
          id="confirm_password"
          v-model="confirmpassword"
          placeholder="confirmPassword"
          class="signUp__text"
        />
      </div>
      <div class="signUp__btn">
        <button @click="alert()" class="signUpBtn" type="button">SignUp</button>
        <button @click="clear()" class="clearBtn">Clear</button>
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
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
    isFailed: false,
    emailFailed: false,
  }),

  methods: {
    alert: function () {
      fetch("http://localhost:8000/users")
        .then((res) => res.json())
        .then((data) => {
          if (
            !(
              this.lastname &&
              this.firstname &&
              this.email.match(
                /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
              ) &&
              this.phonenumber.match(/^(0[5-9]0-[0-9]{4}-[0-9]{4})$/) &&
              6 <= this.password.length &&
              this.password.length <= 16 &&
              this.confirmpassword === this.password
            )
          ) {
            this.isFailed = true;
          } else if (
            data.filter((el) => el.email === this.email).length > 0 //入力したEメールの値とfetchしたデータの中のEメールの値が一致しており、0以上の文字数があるとき
          ) {
            // alert('Eメールアドレスが既にあります');
            this.emailFailed = true;
          } else {
            this.registerData();
          }
        });
    },

    registerData: async function () {
      await fetch("http://localhost:8000/users", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.firstname + " " + this.lastname,
          email: this.email,
          phone: this.phonenumber,
          password: this.password,
        }),
      });
      this.$router.push("/login");
    },

    clear: function () {
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.phonenumber = "";
      this.password = "";
      this.confirmpassword = "";
    },
  },
};
</script>
