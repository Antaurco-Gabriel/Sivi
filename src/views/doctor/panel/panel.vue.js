const tableData = Vue.createApp({
  data(){
    return{
      data: [],
      filters: [],
      allFilters: true,
      dataOrigin: [],
      page:1,
      perPage:10,
      pages:[],
      display: 'flex'
    }
  },
  async created(){
    await this.getData()
    this.display = 'none'
    this.setNumberPages(this.data)
    // console.log(this.dataOrigin);
  },
  methods:{
    async getData() {
      let dataSheets = JSON.parse(document.getElementById("table").getAttribute("data-sheets"));
      for (const sheet of dataSheets) {
        sheet.formatDate = this.formatDate(sheet.date);
        sheet.formatHours = this.formatHours(sheet.date);
        sheet.company = sheet.company.name;
        sheet.preDiagnosis = sheet.preDiagnosis ? sheet.preDiagnosis : 'Pendiente';
        sheet.treatment = sheet.treatment ? sheet.treatment : 'Pendiente';
        sheet.dateNextFollowUp = sheet.dateNextFollowUp ? this.formatDate(sheet.dateNextFollowUp) : 'Pendiente';
        sheet.quarantinePeriod = sheet.quarantinePeriod ? sheet.quarantinePeriod : 'Pendiente';
      }
  
      this.dataOrigin = dataSheets
      this.data = this.dataOrigin

      console.log(this.data)
    },

    formatDate(date){
      const d = new Date(date);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      
      const newDate = day.toString().padStart(2, "0") + '-' + month.toString().padStart(2, "0") + '-' + year
      return newDate;
    },

    formatHours(date){
      const d = new Date(date);
      const hours = d.getHours() + 5;
      const minutes = d.getMinutes();
      const seconds = d.getSeconds();

      const newHours = hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ':' + + seconds.toString().padStart(2, "0")
      return newHours;
    },

    setNumberPages(data) {
      this.pages = []
      let numberOfPages = Math.ceil(data.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },

    setDataPerPage(data) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);

      return data.slice(from, to);
    },

  },
  computed:{
    displayedData() {
      let data = this
      let list = data.data
      // returna el arreglo filtrado por paginas
      return this.setDataPerPage(list)
    }
  }
})

tableData.mount("#table");

