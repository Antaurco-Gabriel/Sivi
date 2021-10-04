const userPermits = Vue.createApp({
  data(){
    return{
      health_module_options: [
        {
          value: 0,
          text: 'Recursos Humanos',
        },
        {
          value: 1,
          text: 'Médico',
        },
      ],
      surveys_module_options: [
        {
          value: 0,
          text: 'Trabajador',
        },
      ],
      dataUser: {},
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
      this.dataUser = JSON.parse(document.getElementById('permits').getAttribute('data-user'));

      //IS ADMIN
      if (this.dataUser.permits.isAdmin !== undefined) {
        this.dataUser.permits.isAdmin = this.dataUser.permits.isAdmin === 0 ? '0': '1'
      } else {
        this.dataUser.permits.isAdmin = '1'
      }
      
      // HEALTH MODULE OPTIONS
      if (this.dataUser.permits.health_module !== undefined) {
        this.dataUser.permits.health_module.access = this.dataUser.permits.health_module.access !== undefined && this.dataUser.permits.health_module.access ? '1': '0'
      } else {
        this.dataUser.permits.health_module = {
          access: '0',
          type: '',
        }
      }

      // SURVEYS MODULE OPTIONS
      if (this.dataUser.permits.surveys_module !== undefined) {
        this.dataUser.permits.surveys_module.access = this.dataUser.permits.surveys_module.access !== undefined && this.dataUser.permits.surveys_module.access ? '1': '0'
      } else {
        this.dataUser.permits.surveys_module = {
          access: '0',
          type: '',
        }
      }

      console.log(this.dataUser);
    },
  },
  computed:{ }
})

userPermits.mount("#permits");