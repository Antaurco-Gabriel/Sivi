const example = Vue.createApp({
  data() {
    return {
      clients: [],
      filter: '',
      loading: true,
    }
  },
  async created() {
    try {
      let response = await fetch(`/api/v1/admin/clients`)
      data = await response.json()
      if (!response.ok) throw data.error
      this.clients = data
      setTimeout(() => {
        this.loading = false
      }, 3000)
    } catch (error) {
      console.error(error)
    }
  },
  mounted() {},
  computed: {},
  methods: {
    showemail: (autor) => {
      console.log('con vue: ', autor)
    },
  },
  watch: {},
})

const app = example.mount('#app')
