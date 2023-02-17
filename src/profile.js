// Description: This file contains the profile logic
// Author: Sebastián Gámez

// Imports
const { createApp } = Vue;

// Create the app
const app = createApp({
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            // cards
            cards: [],
            mensaje: "",
            error: false,
            
        }
    },
    methods: {

  
        //actualiza los datos del usuario en el local storage y cierra sesión
        logout(){
            this.actualizar()
            Swal.fire({
                title: 'Cerrar sesión',
                text: "¿Está usted seguro que quiere cerrar sesión?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si estoy seguro'
              }).then((result) => {
                if (result.isConfirmed) { 
                    this.user = null
                    localStorage.setItem('user', JSON.stringify(this.user))
                    window.location = "index.html"
                }
              }) 
        },
        //metodo usado para actualizar los datos del usuario en el local storage
        actualizar(){
            let users = JSON.parse(localStorage.getItem('users'))
            localStorage.setItem('user', JSON.stringify(this.user))

            users.map((item, index) => {
                if(item.username === this.user.username && item.email === this.user.email){
                    users[index] = this.user
                }
            })
            localStorage.setItem('users', JSON.stringify(users))

        },
        //función encargada de filtrar las cartas repetidas e inicar cuantas veces se repite
        filtro(){
            this.user.cards.map(index => {
                const results = this.user.cards.filter( carta => carta.id === index.id).length
                 
                
                if(results){
                    index.cantidad = results -1//la cantidad de cartas
                    const resulte = this.cards.filter(copia => copia.id === index.id ).length //asegurarno que no esté repetida en el nuevo filtro
                    if(resulte <1){
                        this.cards.push(index)
                    } 
                }else{
                    index.cantidad=0
                    this.cards.push(index)
                }
            }) 
        }
    },
     //asegurarse que esté un usuario logueado
    created(){
        if(this.user ===null){
            window.location = "index.html"
        } 
        this.filtro()
    }
});

// Mount the app
app.mount('#app');