const symptomatologyData = Vue.createApp({
  data(){
    return{
      sheetData: {},
      medicalFollowUpData: {},
      display: 'flex'
    }
  },
  async created(){
    await this.getData();
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
      sheet.quarantinePeriod = sheet.quarantinePeriod ? parseInt(sheet.quarantinePeriod) - Math.floor((new Date() - new Date(sheet.dateQuarantine)) / (1000 * 3600 * 24)) : 'Pendiente';
      // sheet.quarantinePeriod = sheet.quarantinePeriod ? sheet.quarantinePeriod : 'Pendiente';
      this.sheetData = sheet;

      const mfu = JSON.parse(document.getElementById("followUp").getAttribute("data-medical-follow-up"));
      mfu.dateSymptoms = this.formatDateInput(mfu.dateSymptoms);
      mfu.dateQuarantine = this.formatDateInput(mfu.dateQuarantine);
      mfu.dateNextFollowUp = this.formatDateInput(mfu.dateNextFollowUp);

      this.medicalFollowUpData = mfu;

      console.log(sheet, mfu);
    },

    formatDate(date){
      const d = new Date(date);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      
      const newDate = day.toString().padStart(2, "0") + '-' + month.toString().padStart(2, "0") + '-' + year
      return newDate;
    },

    formatDateInput(date){
      const d = new Date(date);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      
      const newDate = year + '-' + month.toString().padStart(2, "0") + '-' + day.toString().padStart(2, "0")
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
    },

    goToSheet(id) {
      return window.location.href = '/medico/lista-seguimientos/'+ id;
    },
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