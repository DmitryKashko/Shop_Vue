<template>
  <div class="v-cart">
    <router-link :to="{name: 'catalog'}">
      <div class="v-catalog_link_to_cart">Back to Catalog</div>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!cart_data.length">There are no products in cart...</p>
    <v-cart-item
      v-for="(item, index) in cart_data"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart = "deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    ></v-cart-item>
    <div class="v-cart_total">
      <p class="total-name">Total:</p>
      <p>{{  cartTotalCost }} $</p>
    </div>
  </div>
</template>


<script>
import VCartItem from "@/components/v-cart-item";
import {mapActions} from "vuex";

export default {
  name: "v-cart",
  components: {
    VCartItem
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    cartTotalCost() {
      let result =[];

      if(this.cart_data.length) {
        for (let item of this.cart_data){
          result.push(item.price * item.quantity)
        }

        result = result.reduce(function (sum, el) {
          return sum +el;
        });
        return result;
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM',
    ]),
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index)
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    }
  }
}
</script>

<style scoped>
.v-cart {
  margin-bottom: 100px;
}
.v-catalog_link_to_cart {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 16px;
  border: solid 1px #aeaeae;
}
.v-cart_total {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 12px;
  display: flex;
  justify-content: center;
  background: #26ae68;
  color: #ffffff;
  font-size: 20px;
}
.total-name {
  margin-right: 12px;
}
</style>