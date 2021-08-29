const symptomatologyData = Vue.createApp({
  data(){
    return{
      sheetData: {},
      today: '',
      hoursToday: '',
      tomorrow: '',
      display: 'flex'
    }
  },
  async created(){
    await this.getData();
    this.today = this.todayDate();
    this.hoursToday = this.todayHours();
    this.tomorrow = this.tomorrowDate();
    this.display = 'none';

  },
  watch: { },
  methods: {
    async getData() {
      const sheet = JSON.parse(document.getElementById("followUp").getAttribute("data-sheet"));
      sheet.formatDate = this.formatDate(sheet.date);
      sheet.formatHours = this.formatHours(sheet.date);
      sheet.company = sheet.company.name;
      sheet.preDiagnosis = sheet.preDiagnosis ? sheet.preDiagnosis : 'Pendiente';
      sheet.treatment = sheet.treatment ? sheet.treatment : 'Pendiente';
      sheet.quarantinePeriod = sheet.quarantinePeriod ? sheet.quarantinePeriod : 'Pendiente';
      this.sheetData = sheet;
      console.log(sheet);
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

    todayDate() {
      let today = new Date()
      let todayYear = today.getFullYear()
      let todayMonth = today.getMonth() + 1
      let todayDay = today.getDate()
      if (todayDay.toString().length == 1) todayDay = "0" + todayDay
      if (todayMonth.toString().length == 1) todayMonth = "0" + todayMonth
      return `${todayYear}-${todayMonth}-${todayDay}`;
    },

    todayHours() {
      let today = new Date()
      todayHours = today.getHours()
      todayMinutes = today.getMinutes()
      if (todayHours.toString().length == 1) todayHours = "0" + todayHours
      if (todayMinutes.toString().length == 1) todayMinutes = "0" + todayMinutes
      return `${todayHours}:${todayMinutes}`;
    },

    tomorrowDate() {
      let today = new Date()
      let todayYear = today.getFullYear()
      let todayMonth = today.getMonth() + 1
      let todayDay = today.getDate() + 1
      if (todayDay.toString().length == 1) todayDay = "0" + todayDay
      if (todayMonth.toString().length == 1) todayMonth = "0" + todayMonth
      return `${todayYear}-${todayMonth}-${todayDay}`;
    }
  },
  computed:{ }
})

symptomatologyData.mount("#followUp");



let enviando = false;

function checkSubmit() {
    if (!enviando) {
        enviando = true;
        return true;
    } else {
        return false;
    }
}