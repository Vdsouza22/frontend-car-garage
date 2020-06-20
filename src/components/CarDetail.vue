<template lang="html">

  <section class="car-detail">
   <div style="margin-top: 5%;">
    <b-container>
      <b-row>
        <b-col cols="6"><img src="../assets/Volkswagen.jpg" style="width: 85%; height:100%;"/></b-col>
        <b-col cols="6">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title" style="font-weight: bold;">{{carObject.carMake}}</h5>
              <div class="card-text text-center">
                Model : {{carObject.carModel}}<br>
                Year Model : {{carObject.carYearModel}}<br>
                Price : {{carObject.carPrice}}<br>
                Licensed : {{carObject.carLicensed}}<br>
                Date Added : {{carObject.date_added | formatDate}}<br>
                Warehouse Name : {{carObject.warehouseName}}<br> 
                Warehouse Location : {{carObject.warehouseLocation}}
              </div>
              <div style="margin-top: 4%;">
                <b-button pill variant="warning" v-on:click="updateCart(carObject)">Add to Cart</b-button>
                <b-button pill style="margin-left:3%" variant="success">Checkout</b-button>
              </div>
            </div>
          </div>
      </b-col>
      </b-row>
    </b-container>
   </div>
  </section>

</template>

<script lang="js">
  import moment from 'moment'
  import { bus } from '../main.js'
  export default  {
    name: 'car-detail',
    props: [],
    mounted () {

    },
    data () {
      return {
        carObject: {}
      }
    },
    methods: {
      fetchCarDetail: function() {
        var username= 'admin';
        var password= 'password';
        var basicAuth = 'Basic ' +btoa(username + ':'+password);
        this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        this.axios.defaults.headers.common['Authorization'] = basicAuth;
        this.axios.get('http://localhost:8091/api/v1/cars/'+this.$route.params.id).then(response => {
          this.carObject = response.data;
        }, error => {
            console.log(error)
        })
      },
      updateCart: function(selectedCarObject) {
        bus.$emit('updateCart', selectedCarObject);
      }
    },
    beforeMount(){
        this.fetchCarDetail()
    },
    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format('DD/MM/YYYY')
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .car-detail {

  }
</style>
