const companiesData = Vue.createApp({
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
  },
  methods:{
    async getData() {
      const companies = JSON.parse(document.getElementById("table").getAttribute("data-companies"));

      this.dataOrigin = companies
      this.data = this.dataOrigin

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


    dropdownButton(index) {
      document.getElementById(`myDropdown-${index}`).classList.toggle("show");
    },

    confirmDelete(id) {
      Swal.fire({
          title: '¿Desea eliminar esta empresa?',
          text: 'Esta opción no podra revertirse',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
      }).then((result) => {
          if (result.isConfirmed) {
            return window.location.href = '/admin/modulo-usuarios/eliminar-empresa/'+ id;
          }
      })
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

companiesData.mount("#table");

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