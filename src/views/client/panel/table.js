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
    await this.getFilters()
    this.display = 'none'
    this.setNumberPages(this.data)
    // console.log(this.dataOrigin);
  },
  methods:{
    async getData() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=386&offset=0')
      const data = await response.json()
  
      data.results.map(async (d) => {
        d.data = await this.fetchPoGOData(d.url)
      });
  
      for(let i=0; i<data.results.length; i++) {
        data.results[i].data = await this.fetchPoGOData(data.results[i].url)
      }
  
      this.dataOrigin = data.results
      this.data = this.dataOrigin
    },

    async getFilters() {
      const response = await fetch('https://pokeapi.co/api/v2/type')
      const data = await response.json()

      data.results.forEach(d => this.filters.push({
        name: d.name,
        active: true,
      }))
      this.filters.push({
        name:'all',
        active: true,
      })
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

    async fetchPoGOData(url){
      const response = await fetch(url)
      const data = await response.json()

      const pokemon = {
        imgGame: data.sprites.front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
        id: data.id,
        types:[],
      };

      if (data.types.length > 0) {
        data.types.forEach(type => pokemon.types.push(type.type.name))
      }
    
      return pokemon
    },

    filter(name, index) {
      if (name === "all") {    
        this.allFilters = !this.allFilters

        for (let i = 0; i < this.filters.length; i += 1 ) {
          this.filters[i].active = this.allFilters
        }

      } else {
        this.filters[index].active = !this.filters[index].active
        
        if (!this.isAll){
          this.filters[this.filters.length-1].active = false
        } else {
          this.filters[this.filters.length-1].active = true
        }
      }
    },
  },
  computed:{
    isAll() {
      let aux = this.filters
      
      for (let i = 0; i < this.filters.length; i += 1 ) {
        if (this.filters[i].name !== 'all' && this.filters[i].active !== true) {
          return false
        }
      }
      /* aux.forEach( pokemon => {
        if (pokemon.name !== 'all' && pokemon.active !== true) {
          return false
        }
      }) */
      return true
    },
    displayedData() {
      let dataPokemon = this
      let list = dataPokemon.data

      const result = list.filter( pokemon => {
        // Recorres la lista de filtros
        for (let i = 0; i < this.filters.length; i += 1 ){
          // Verifica si dicho filtro esta activo
          if (this.filters[i].active === true) {
            // Verifica si estan todos los filtros activos
            if (this.filters[i].name === 'all') {
              return true
            } else {
              // Verifica el tipo 1
              if(pokemon.data.types[0] === this.filters[i].name) {
                return true
              } else {
                // Verifica el tipo 2
                if(pokemon.data.types.length > 0){
                  if(pokemon.data.types[1] === this.filters[i].name) {
                    return true
                  }
                }
              }
            }
          }
        }
      })

      // Calcula la cantidad de paginas
      this.setNumberPages(result)

      // returna el arreglo filtrado por paginas
      return this.setDataPerPage(result)
    }
  }
})

tableData.mount("#table");