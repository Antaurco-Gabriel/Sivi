const updateProfile = Vue.createApp({
  data(){
    return{
      country: "",
      city: "",
      user: "",
      countries: [],
      cities: [],
      interestText: "",
      interests: ["Viajar"]
    }
  },
  mounted(){
    this.user = JSON.parse(document.getElementById("profile-country").getAttribute("user"));
    this.countries = JSON.parse(document.getElementById("profile-country").getAttribute("countries"));
    if(this.user != ""){
      this.city = this.user.city?this.user.city :'';
      this.country = this.user.country?this.user.country :'';
    }
    if(this.user.interests!=""){
      this.interests= this.user.interests;
    }
  },
  watch: {
    country(){
      if(this.user && this.user.country == "" ){
        this.city = "";
        this.cities = this.countries.filter(e => e.name == this.country)[0].states;
      }else if(this.user && this.user.city == ""){
        this.city = "";
        this.cities = this.countries.filter(e => e.name == this.country)[0].states;
      }else{
        this.cities = this.countries.filter(e => e.name == this.country)[0].states;
        this.user.city == ""
      }
      if(this.user && this.user.country != this.country){
        this.city = "";
        this.cities = this.countries.filter(e => e.name == this.country)[0].states;
      }
    }
  },
  methods: {
    addNewInterest() {
      if(!this.interestText.length) return
      const haveElementEmpty = this.interests.includes("");
      if(!haveElementEmpty){
        this.interests.push(this.interestText)
        this.interestText = ''
      }
    },
    deleteInterest(index){
      if(this.interests.length == 1){
        //let ul = document.getElementById("lista-ul")
        //console.log(ul.firstElementChild)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, agregue un interés antes de eliminar esta opción',
        })
      }
      else{
        this.interests.splice(index,1)
      }
    },
/*     enviar(){
      if(this.interests.length == 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe tener al menos un interés agregado',
        })
      } else{
        this.submit()
      }
    } */
  }
});
if(document.getElementById("update-profile")){const vm = updateProfile.mount("#update-profile")}


const usersTable = Vue.createApp({
  data(){
    return{
      users: {},
      currentYear: 0,
      showModal: false
    }
  },
  mounted(){
    this.users = JSON.parse(document.getElementById("tableUsers").getAttribute("users"));
    let today = new Date()
    this.currentYear = today.getFullYear();
  },
  methods:{
    getAge(date){
      let userBirthday = new Date(date);
      return this.currentYear - userBirthday.getFullYear();
    },
    visitUser(user){
      return window.open(`${window.origin}/viajeros/${user._id}`,"_blank");
    },
    alertIn(userEmail, userId){
        Swal.fire({
          title: "¿Está seguro que desea inhabilitar a este usuario?",
          text: userEmail,
          // input: 'email',
          // inputValue: userEmail,
          // inputAttributes: {
          //   disabled: true
          // },
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post(`/admin/usuarios/${userId}`).then(() => {
              Swal.fire('Inhabilitado!', '', 'success').then(() => {
                location.reload()
              })
            }).catch(err=>{
              Swal.fire('Hubo un error', '', 'error')
              console.log(err)
            })
          }
        })
    },
    alertHa(userEmail, userId){

      Swal.fire({
        title: "¿Está seguro que desea habilitar a este usuario?",
        text: userEmail,
        // input: 'email',
        // inputValue: userEmail,
        // inputAttributes: {
        //   disabled: true
        // },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`/admin/usuarios/${userId}`).then(() => {
            Swal.fire('Habilitado!', '', 'success').then(() => {
              location.reload();
            })
          }).catch(err=>{
            Swal.fire('Hubo un error', '', 'error')
            console.log(err)
          })
        }
      })

    },

  }
})


if(document.getElementById("tableUsers")){const mountTable = usersTable.mount("#tableUsers")}
const travellersview = Vue.createApp({
  data(){
    return{
      isProcessing: true,
      travellers: [],
      travellersPage:[],
      travellersOrigin:[],
      followers: [],
      unfollowers:[],
      name:'',
      followed:'',
      status:'all',
      page:1,
      pages:1
    }
  },
  mounted(){
    this.unfollowers = JSON.parse(document.getElementById("travellers").getAttribute("data-unfollowers"))
    this.unfollowers.map((u) => {
      u.followed = false;
    });;
    this.followers = JSON.parse(document.getElementById("travellers").getAttribute("data-followers"));
    this.followers.map((u) => {
      u.followed = true;
    });;
    this.travellers = this.followers.concat(this.unfollowers)
    const originT = this.travellers
    this.travellersOrigin = originT
    this.isProcessing = false;
    
  },
  methods:{
    searchTravellers(){
      this.isProcessing = true;
      if(this.name!=''){
        let traveller = []
        if(this.status=='all'){
          traveller = this.travellersOrigin
        }else if(this.status=='follow'){
          traveller = this.travellers.filter(t=>t.followed==true);
        }else if(this.status="unfollow"){
          traveller = this.travellers.filter(t=>t.followed==false);
        }
        const reg = new RegExp(this.name,'i')
        const t = traveller.filter((tra)=> reg.test(tra.name) || reg.test(tra.lastName) || reg.test(tra.name+" "+tra.lastName))
        this.travellers = t
        this.isProcessing = false;
      }else{
        if(this.status=='all'){
          this.travellers = this.travellersOrigin
        }else if(this.status=='follow'){
          this.travellers = this.travellersOrigin.filter(t=>t.followed==true);
        }else if(this.status="unfollow"){
          this.travellers = this.travellersOrigin.filter(t=>t.followed==false);
        }
        console.log(this.travellers.length)
        this.isProcessing = false;
      }
    },
    sideScroll(div,direction,speed,distance,step){
      var element = document.getElementById(div);
      scrollAmount = 0;
      var slideTimer = setInterval(function(){
          if(direction == 'left'){
              element.scrollLeft -= step;
          } else {
              element.scrollLeft += step;
          }
          scrollAmount += step;
          if(scrollAmount >= distance){
              window.clearInterval(slideTimer);
          }
      }, speed);
    },
    isFollow(event){
      if (event) {
          switch (event.target.value) {
            case "3":
              this.travellers = this.travellersOrigin;
              this.status="all"
              break;
            case "1":
              this.travellers = this.travellersOrigin;
              this.travellers = this.travellers.filter(t=>t.followed==true);
              this.status="follow"
              break;
            case "2":
              this.travellers = this.travellersOrigin;
              this.travellers = this.travellers.filter(t=>t.followed==!true);
              this.status="unfollow"
              break;
          }
        this.searchTravellers()
        this.pagination()
      }
    },
    pagination(){
      this.travellersPage = this.travellers.slice((this.page - 1) *12 , this.page * 12);
      this.pages = Math.ceil( this.travellers.length / 12)
      if(this.page>this.pages){
        this.page = this.pages
      }
    },
    followTraveller(id,followed){
      let traveller = {}
      this.travellersOrigin.filter((t,i)=>{
        if(t._id==id){
          traveller=t
          this.travellersOrigin.splice(i,1)
          traveller.followed = !followed
          if(traveller.followed){
            this.travellersOrigin.splice(0, 0, traveller);
          }else{
            this.travellersOrigin.splice(this.travellersOrigin.length, 0, traveller);
          }
        }
      })
      if(this.status=='all'){
        this.travellers = this.travellersOrigin
      }else if(this.status=='follow'){
        this.travellers = this.travellers.filter(t=>t.followed==true);
      }else if(this.status="unfollow"){
        this.travellers = this.travellers.filter(t=>t.followed==false);
      }
      axios
          .get(
            `${window.origin}/addFollowers?id=${id}&status=${!followed}`
          )
          .then((res) => {
            let { msg } = res.data;
            console.log(msg)
          })
          .catch((err) => {
            console.log(err);
          });
      this.searchTravellers()
      this.pagination()
    },
    visitTraveller(t){
      if (!t.followed){
        console.log(t)
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'Usted debe seguir primero al usuario para acceder a su perfil y visualizar sus viajes'
        })
      }else{
        return (window.location = `/viajeros/${t._id}`);
      }
    },
    getLink(followed,link){
      console.log(followed, link)
      if (!followed){
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'Usted debe seguir primero al usuario para acceder a sus redes sociales'
        })
      }else{
        if(!link.includes('https://')){
          return window.open(`https://${link}`,"_blank");
        }else{
          return window.open(link,"_blank");
        }
      }
    }
  },
  watch: {
    name: function() {
      this.isFollow();
      this.searchTravellers();
      this.pagination()
    },
    travellersOrigin: function(){
      this.isFollow();
      this.pagination()
    },
    travellers: function(){
      this.isFollow();
      this.pagination();
    },
    page: function(){
      this.isFollow();
      this.pagination();
    },
    pages: function(){
      this.pagination();
      if(this.page>=this.pages){
        this.page = this.pages
      }else if(this.page==0 && this.pages>0){
        this.page = 1
      }else{
        this.page = 1
      }
    },
  }
})


if(document.getElementById("travellers")){const mountTravellers = travellersview.mount("#travellers")}
const memoryCategories = Vue.createApp({
  data(){
    return{
      myCategories: [],
      allCategories: []
    }
  },
  mounted(){
    this.allCategories = JSON.parse(document.getElementById("memory-categories").getAttribute("data"))||[];
    this.myCategories = JSON.parse(document.getElementById("memory-categories").getAttribute("my-data"))|| [{ category: '', categoryCompany: '', categoryPoint: '' }];
  },
  methods: {
    addNewCategory() {
      this.myCategories.push({ category: '', categoryCompany: '', categoryPoint: '' })
    },
    deleteCategory(index){
      if(this.myCategories.length>1) this.myCategories.splice(this.myCategories.length-1,1)
      else this.myCategories = [{ category: '', categoryCompany: '', categoryPoint: '' }]
    }
  }
});
if(document.getElementById("memory-categories")){const selectCategory = memoryCategories.mount("#memory-categories");}

