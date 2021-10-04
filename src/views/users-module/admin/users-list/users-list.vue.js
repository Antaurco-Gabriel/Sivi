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
      display: 'flex',
      companyData: {},
      companyId: '',
    }
  },
  async created(){
    await this.getData()
    this.display = 'none'
    this.setNumberPages(this.data)
  },
  methods:{
    async getData() {
      const companyData = JSON.parse(document.getElementById("users-list").getAttribute("data-users"));

      this.companyData = {
        name: companyData.name,
        ruc: companyData.ruc,
      }

      for (const user of companyData.users) {
        if (user.permits.isAdmin !== undefined){
          user.role = user.permits.isAdmin === 0 ? 'Admin' : 'Trabajador'
        } else {
          user.role = 'Trabajador'
        }
      }

      console.log(companyData.users)

      this.dataOrigin = companyData.users
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
          title: '¿Desea eliminar esta usuario?',
          text: 'Esta opción no podra revertirse',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
      }).then((result) => {
          if (result.isConfirmed) {
            return window.location.href = '/admin/modulo-usuarios/eliminar-usuario/'+ id;
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

companiesData.mount("#users-list");

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