const example = Vue.createApp({
  data() {
    return {
      data: [],
      filter: '',
    }
  },
  async mounted() {
    try {
      let response = await fetch(`/api/v1/admin/clients`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      data = await response.json()
      if (!response.ok) throw data.error
      this.data = data
    } catch (error) {
      console.error(error)
    }
  },
  created() {},
  computed: {},
  methods: {},
  watch: {},
})

example.mount('#app')
