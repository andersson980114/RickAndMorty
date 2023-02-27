 
const app = new Vue({
    el: '#app',
    data:{
      users: [],
      user: undefined,
      username: undefined,
      password: undefined,
      email: undefined,
      telefono: undefined,
      nombre: undefined,
      logueo: false,
      registrado: false,
      mensaje: '',
      showRegister: false,
      error: false, 
    },
    methods:{
        ingresar(){
            this.registrado = false
            this.error = false
            this.mensaje = ""
            if(this.users != null){
                this.users.map((user, index) => {   
                        
                        if(user.username === this.username && user.password === this.password){
                            localStorage.setItem('user', JSON.stringify(user))
                            this.logueo = true
                            this.error=false 
                            if(user.cards){
                                if(user.cards.length > 0){
                                    window.location = user.cards.length > 0 ? "./public/collection.html" : "./public/profile.html"
                                }
                            }
                        
                        }  
                    }
                ) 
            }  

            if(this.logueo===false ){
                this.error = true
                this.mensaje = "Username o password incorrectos"
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Login',
                    text: 'Asegurese de que el Username y Password sean correctos', 
                  })
            }else{
                this.mensaje="logueado"
            }
        },
        registrar(){
            this.registrado = false
            this.error = false
            this.mensaje = ""
            console.log(this.error, this.mensaje)
            //verificar que no esté registrado
            if(this.username === undefined || this.password === undefined || this.nombre === undefined ||this.email ===undefined || this.telefono === undefined){
                this.error = true
                this.mensaje = "Necesitas llenar todos los campos"
            }else{
                if(this.users != null){
                    this.users.map( user => {
                        if(this.username === user.username && this.nombre === user.nombre && this.email === user.email ){
                            this.registrado = true
                        }
                    })
                }
     
                if(this.registrado){
                    this.error = true
                    this.mensaje = " usuario ya registrado "
                }else{
                    this.showRegister= false
                    this.user = {
                        'username': this.username,
                        'password': this.password,
                        'email': this.email,
                        'telefono': this.telefono,
                        'nombre': this.nombre,
                        'coins': 0,
                        'cards': []
                    }
                    console.log(this.user)
                    this.users.push(this.user)
                    //localStorage.setItem("user", JSON.stringify(this.user));
                    localStorage.setItem('users', JSON.stringify(this.users))
                    this.username = undefined
                    this.password = undefined
                    this.email = undefined
                    this.telefono = undefined
                    this.nombre = undefined
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: '"Usuario registrado exitosamente"',
                      }) 
                    //window.location = "collection.html"
                }
                
            }

        },
        abrir(){
            this.registrado = false
            this.error = false
            this.mensaje = ""
            this.showRegister= true
        },
        cerrar(){
            this.error = false
            this.mensaje = "   " 
            this.showRegister= false
        }
      
    },
    created(){ 
        let usuarios = JSON.parse(localStorage.getItem('users'))
        
        if(usuarios != null){
            this.users = usuarios
        }
         
    },
    
})