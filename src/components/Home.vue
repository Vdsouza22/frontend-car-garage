<template lang="html">

  <section class="home">
  <div style="text-align: right">
    <b-dropdown id="dropdown-1" right :text="'Sort by '+selectedOption" class="m-md-1">
    <b-dropdown-item v-on:click="sortBy('date', 'asc')">Oldest</b-dropdown-item>
    <b-dropdown-item v-on:click="sortBy('date', 'desc')">Most Recent</b-dropdown-item>
  </b-dropdown>
  </div>
    <div style="border-top: 1px solid lightgrey;">
      <div class="card-deck mt-3" v-for="(row, index) in formattedRows" :key="index">
        <div class="card" v-for="car in row" :key="car.id">
          <img class="card-img-top" src="../assets/Volkswagen.jpg" alt="Image">
          <div class="card-body">
            <h5 class="card-title" style="font-weight: bold;">{{car.carMake}}</h5>
            <div class="card-text text-center">
              Model : {{car.carModel}}<br>
              Year Model : {{car.carYearModel}}<br>
              Price : {{car.carPrice}}<br>
              Licensed : {{car.carLicensed}} 
            </div>
            <b-button pill :href="'#/carDetail/'+car.id" variant="info" :disabled="!car.carLicensed">More Info</b-button>
            <b-button pill style="margin-left:3%" v-on:click="updateCart(car)" variant="warning" :disabled="!car.carLicensed">Add to Cart</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="js">
  import { bus } from '../main.js'
  export default  {
    name: 'home',
    props: [],
    mounted () {

    },
    data () {
      return {
        carDetails: [],
        selectedOption: ''
      }
    },
    methods: {
      getCarDetails: function() {
        var username= 'admin';
        var password= 'password';
        var basicAuth = 'Basic ' +btoa(username + ':'+password);
        this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        this.axios.defaults.headers.common['Authorization'] = basicAuth;
        this.axios.get('http://localhost:8091/api/v1/cars').then(response => {
          this.carDetails = response.data;
        }, error => {
            console.log(error)
        })
      },
      sortBy: function(value, order) {
        if(order==="asc" && value==="date"){
          this.selectedOption = 'Oldest';
          this.carDetails.sort(function(a, b){
          return new Date(a.date_added) - new Date(b.date_added);
        })
        }
        else if(order==="desc" && value==="date"){
          this.selectedOption = 'Most Recent';
          this.carDetails.sort(function(a, b){
          return new Date(b.date_added) - new Date(a.date_added);
        })
        }
        else {
          return this.carDetails;
        }
        this.$forceUpdate();
      },
      updateCart: function(selectedCarObject) {
        bus.$emit('updateCart', selectedCarObject);
      }
    },
    beforeMount(){
        this.getCarDetails();
        this.sortBy('date', 'asc');
    },
    computed: {
      formattedRows() {
          return this.carDetails.reduce((c, n, i) => {
              if (i % 4 === 0) c.push([]);
              c[c.length - 1].push(n);
              return c;
          }, []);
      }
    }
}


</script>

<style scoped lang="scss">
  .home {

  }
</style>
