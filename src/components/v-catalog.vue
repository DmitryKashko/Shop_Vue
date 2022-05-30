<template>
  <div class="v-catalog">
    <router-link :to="{name: 'cart', params: {cart_data: CART}}">
      <div class="v-catalog_link_to_cart">Cart: {{ CART.length }}</div>
    </router-link>

    <h1>Catalog</h1>
    <v-select
      :selected="selected"
      :options="categories"
      @select="sortByCategories"
    >

    </v-select>
    <div class="v-catalog_list">
      <v-catalog-item
        v-for="product in filterProducts"
        :key="product.article"
        :product_data="product"
        @addToCart="addToCart"
      ></v-catalog-item>
    </div>
  </div>
</template>

<script>
import VCatalogItem from "@/components/v-catalog-item";
import {mapActions, mapGetters} from 'vuex'
import VSelect from "@/components/v-select";


export default {
  name: "v-catalog",
  components:{
    VCatalogItem,
    VSelect
  },
  data() {
    return {
      categories: [
        {name: 'Все', value: 'ALL'},
        {name: 'Мужские', value: 'м'},
        {name: 'Женские', value: 'ж'},
      ],
      selected: 'Все',
      sortedProducts: []
    }
  },
  computed: {
    ...mapGetters([
        'PRODUCTS',
        'CART'
    ]),
    filterProducts() {
      if(this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.PRODUCTS
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
    sortByCategories(category) {
      this.sortedProducts = [];
      let vm =this
      this.PRODUCTS.map(function (item) {
        if(item.category === category.name) {
          vm.sortedProducts.push(item);
        }
      })
      this.selected = category.name
    },
    addToCart(data) {
      this.ADD_TO_CART(data)
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
        .then((response) => {
          if(response.data) {
            console.log('Data arrived!')
          }
        })
  }
}
</script>

<style scoped>
  .v-catalog_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .v-catalog_link_to_cart {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 16px;
    border: solid 1px #aeaeae;
  }

</style>