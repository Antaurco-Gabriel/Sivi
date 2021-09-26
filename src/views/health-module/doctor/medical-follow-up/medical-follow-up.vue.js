const sheetData = Vue.createApp({
  data(){
    return{
      sheetData: {},
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
      const sheet = JSON.parse(document.getElementById("sheet").getAttribute("data-sheet"));
      sheet.formatDate = this.formatDate(sheet.date);
      sheet.formatHours = this.formatHours(sheet.date);
      sheet.company = sheet.company.name;
      sheet.preDiagnosis = sheet.preDiagnosis ? sheet.preDiagnosis : 'Pendiente';
      sheet.treatment = sheet.treatment ? sheet.treatment : 'Pendiente';
      sheet.quarantinePeriod = sheet.quarantinePeriod ? parseInt(sheet.quarantinePeriod) - Math.floor((new Date() - new Date(sheet.dateQuarantine)) / (1000 * 3600 * 24)) : 'Pendiente';
      // sheet.quarantinePeriod = sheet.quarantinePeriod ? sheet.quarantinePeriod : 'Pendiente';
      this.sheetData = sheet;

      const dataFollowUp = JSON.parse(document.getElementById("sheet").getAttribute("data-medical-follow-up"));
      for (const followUp of dataFollowUp) {
        followUp.dateNextFollowUp = this.formatDate(followUp.dateNextFollowUp);
      }

      this.dataOrigin = dataFollowUp
      this.data = this.dataOrigin

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

    goToFollowUp(id) {
      return window.location.href = '/user/modulo-salud/medico/crear-seguimiento/'+ id;
    },

    dropdownButton(index) {
      document.getElementById(`myDropdown-${index}`).classList.toggle("show");
    }

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

sheetData.mount("#sheet");

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}