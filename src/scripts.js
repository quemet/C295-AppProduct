const app = Vue.createApp({
  data() {
    return {
      username: "",
      password: "",
      products: [],
      token: "",
    };
  },
  methods: {
    ToParentChild(products) {
      this.products = products;
    },
    async checkLogin() {
      if (this.username == "" || this.password == "") {
        alert(
          "Les données pour le login sont incomplete. Veuillez remplire tout les champs"
        );
        return;
      }

      const data = await this.connectTheUser();

      this.token = data.token;

      const products = await this.getAllProducts();

      console.log(products.data[0]);

      this.username = "";
      this.password = "";
    },
    async connectTheUser() {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      return response.json();
    },
    async getAllProducts() {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          /*prettier-ignore*/
          "authorization": `Bearer ${this.token}`,
        },
      });
      return response.json();
    },
  },
});
