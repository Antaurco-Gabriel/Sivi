const symptomatologyData = Vue.createApp({
  data(){
    return{
      companies: [],
      company: '',
      ruc: '',
      display: 'flex'
    }
  },
  async created(){
    await this.getData();
    this.display = 'none';

  },
  watch: {
    company(){
      let company = this.company;
      if(company === "") this.ruc = '';

      for (const com of this.companies) {
        if (com._id === this.company) {
          this.ruc = com.ruc;
        }
      }
      
    }
  },
  methods: {
    async getData() {
      this.companies = JSON.parse(document.getElementById('symptomatology').getAttribute('data-symptomatology'));
      console.log(this.companies);
    },
  },
  computed:{ }
})

symptomatologyData.mount("#symptomatology");



let enviando = false;

function checkSubmit() {
    if (!enviando) {
        enviando = true;
        return true;
    } else {
        return false;
    }
}