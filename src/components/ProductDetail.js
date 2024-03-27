app.component("product-detail", {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product" v-for="(product, index) in products" :key="index" @click="changeActive(index)" :class="{ selected: product.active }">
        <div class="photo">
            <img :src="product.photo" />
        </div>
        <div class="description">
            <span class="name">{{ product.name }}</span>
            <span class="price">$ {{ product.price }}</span>
            <div class="quantity-area" v-if="product.active">
                <button @click.stop="decrementProduct(index)">-</button>
                <span class="quantity">{{ product.quantity }}</span>
                <button @click.stop="incrementProduct(index)">+</button>
            </div>
        </div>
    </div>`,
  data() {
    return {};
  },
  methods: {
    changeActive(id) {
      this.products[id].active = !this.products[id].active;
      if (this.products[id].active) {
        this.products[id].quantity = 1;
      } else {
        this.products[id].quantity = 0;
      }
      this.$emit("update-price", this.products);
    },
    incrementProduct(id) {
      if (this.products[id].active) {
        this.products[id].quantity++;
      }
      this.$emit("update-price", this.products);
    },
    decrementProduct(id) {
      if (this.products[id].active && this.products[id].quantity > 1) {
        this.products[id].quantity--;
      }
      this.$emit("update-price", this.products);
    },
  },
});
