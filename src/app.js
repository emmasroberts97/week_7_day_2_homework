import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app",
    data: {
      currencies: [],
      selectedCurrencyEuro: null,
      convertAmountEuro: null,
      selectedCurrencyOther: null,
      convertAmountOther: null,
      firstSelectedCurrencyCross: null,
      secondSelectedCurrencyCross: null,
      convertAmountCross: null
    },
    computed: {
      convertEuros: function(){
        return (this.selectedCurrencyEuro * this.convertAmountEuro);
      },
      convertOthers: function(){
        return (this.convertAmountOther/this.selectedCurrencyOther);
      },
      convertCross: function(){
        return ((this.convertAmountCross * this.secondSelectedCurrencyCross)/this.firstSelectedCurrencyCross);
      }
    },
    filters: {
      round: function (value) {
        return value.toFixed(2);
      }
    },
    mounted(){
      this.fetchCurrencies();
    },
    methods: {
      fetchCurrencies: function(){
        const request = fetch('https://api.exchangeratesapi.io/latest')
        .then(response => response.json())
        .then(data => this.currencies = data.rates);
      }
    }
  })
})
