<template lang="html">

  <section class="header">
    <div> 
      <b-navbar type="dark">
        <b-navbar-brand href="#/home" style="text-align: left; margin-left: 3%; width: 22%;">
          <img src="../assets/car1.png" style="width: 17%;"/>
          <span style="color: white;">Cars4Sale</span>
        </b-navbar-brand>
        <b-navbar-nav style="width: 78%;">
          <b-nav-form>
            <b-input-group>
              <b-form-input size="md" placeholder="Search"></b-form-input>
              <b-input-group-append>
                <b-button><search-icon/></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-nav-form>    

          <b-nav-item-dropdown text="Vinita" style="color: black;">
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item>Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown style="margin-left: 2%;">
            <template v-slot:button-content>
              <b-badge variant="warning"><cart-icon class="icon-2x"></cart-icon>{{cartCount}}</b-badge>
            </template>          
            <b-dropdown-text style="width: 200px;">
              Car(s) selected: {{cartCount}}
            </b-dropdown-text>
            <b-dropdown-text>Total Price: {{totalPrice}}</b-dropdown-text>
            <b-dropdown-text><b-button pill variant="success">Checkout</b-button></b-dropdown-text>
          </b-nav-item-dropdown> 
        </b-navbar-nav>
      </b-navbar>
    </div>
  </section>

</template>

<script lang="js">
  import { bus } from '../main.js'
  export default  {
    name: 'header',
    props: [],
    mounted () {

    },
    created () {
      bus.$on('updateCart', (data)=> {
        this.cartCount = this.cartCount + 1;
        this.totalPrice = this.totalPrice + data.carPrice;
      })
    },
    data () {
      return {
        cartCount: 0,
        totalPrice: 0
      }
    },
    methods: {
      
    },
    computed: {
      
    }
}


</script>

<style scoped lang="scss">
  .header {

  }
  .navbar {
    background-color: black;
  }
  .material-design-icon.icon-2x {
    height: 1.5em;
    width: 1.5em;
  }
  .material-design-icon.icon-2x > .material-design-icon__svg {
    height: 1.5em;
    width: 1.5em;
  }

  .form-inline {
    width: 72%;
    display: grid;
  }

  .dropdown {
    top : 5px;
    font-weight: bold;
  }
</style>
