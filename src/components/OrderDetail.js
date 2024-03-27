app.component("order-details", {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  template:
    /*html*/
    `
    <section class="summary">
    <strong>Order Details</strong>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td v-if="product.active">
            {{ product.quantity }}x {{ product.name }}
          </td>
          <td v-if="product.active">
            {{ (product.price * product.quantity).toFixed(2) }}
          </td>
        </tr>

        <tr>
          <th>Total</th>
          <th>{{ calculateTotals() }}</th>
        </tr>
      </tbody>
    </table>
  </section>`,
  data() {
    return {};
  },
  methods: {
    calculateTotals() {
      let final = 0;
      this.products.forEach((product) => {
        if (product.active) {
          final += product.price * product.quantity;
        }
      });
      return final.toFixed(2);
    },
  },
});
