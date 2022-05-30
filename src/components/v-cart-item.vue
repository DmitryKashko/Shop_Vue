<template>
  <div class="v-cart-item">
    <img class="v-cart-item_image" :src="require('../assets/images/' + cart_item_data.image)" alt="img">
    <div class="v-cart-item_info">
      <p>{{ cart_item_data.name }}</p>
      <p>{{ cart_item_data.price }}</p>
      <p>{{ cart_item_data.article }}</p>
    </div>
    <div class="v-cart-item_quantity">
      <p>Qty:</p>
      <span class="quantity_bth" @click="decrementItem">-</span>
      <span>
        {{cart_item_data.quantity}}
      </span>
      <span class="quantity_bth" @click="incrementItem">+</span>
    </div>
    <button  @click="deleteFromCart">Delete</button>
  </div>
</template>

<script>

export default {
  name: "v-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.$set(this.cart_item_data, 'quantity', 1)
  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart')
    },
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
  },
}
</script>

<style scoped>
  .v-cart-item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 16px;
    margin-bottom: 16px;
  }
  .v-cart-item_image {
    max-width: 50px;
  }
  span {
    font-size: 30px;
  }
  .quantity_bth {
    cursor: pointer;
  }
</style>