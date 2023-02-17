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
            coinsUser: 0, 
            //modales
            showModal: false,
            showCoins:false,
            showPasarela: false,
            promoSelect: undefined,
            metodo: undefined,
            numTarjet: undefined,
            fechaCad: undefined,
            ccv: undefined,
            valor: undefined,
            mensaje: "",
            error: false,
            user: JSON.parse(localStorage.getItem('user')),
            promoCoins: [
                {
                    id: 0,
                    image: '../src/assets/images/morty_coin.png',
                    valor: 1.99,
                    cantidad: 100
                },
                {
                    id: 1,
                    image: '../src/assets/images/morty_coins.png',
                    valor: 2.99,
                    cantidad: 200
                },
                {
                    id: 2,
                    image: '../src/assets/images/morty_coinss.png',
                    valor: 3.99,
                    cantidad: 500
                },
                {
                    id: 3,
                    image: '../src/assets/images/morty_money.png',
                    valor: 6.99,
                    cantidad: 1000
                },
                {
                    id: 4,
                    image: '../src/assets/images/morty_baul.png',
                    valor: 9.99,
                    cantidad: 5000
                },
            ]
        }
    },
    methods: {


        //funicones para abrir y cerrar modales
        abrirCoins(){
            this.showModal = true
            this.showCoins= true
        },
        cerrarCoins(){
            
            this.showModal = false
            this.showCoins= false
        },  
        abrirPasar(index){
            
            this.showModal = true
            this.showCoins= false
            console.log(index )
            this.valor = index.valor
            this.promoSelect = index
            this.error =false
            this.promoId = index
            this.showPasarela= true
        },
        cerrarPasar(){
            this.promoSelect = undefined 
            this.showPasarela= false 
            this.showCoins= true
        },
        //pasarela de pagos
        pasaFinish(){ 
            
            if(this.numTarjet === undefined || this.fechaCad === undefined || this.ccv === undefined || this.valor === undefined || this.metodo === undefined ){
                this.error= true
                this.mensaje = 'Asegurese de llenar todos los campos'
            }else{
                this.showModal = false
                        this.showPasarela= false 
                        this.showCoins= false 
                Swal.fire({
                    title: '¿Está usted seguro?',
                    text: "¿Está usted seguro de realizar esta compra?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si estoy seguro'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(this.promoSelect.valor )
                        this.user.coins += this.promoSelect.cantidad
                        this.mensaje = 'Compra realizada exitosamente de ' + this.promoSelect.cantidad + ' coins'
                        
                        localStorage.setItem('user', JSON.stringify(this.user))
                        
                        this.actualizar()
                        this.metodo = undefined
                        this.numTarjet = undefined
                        this.fechaCad = undefined
                        this.ccv = undefined
                        this.valor = undefined
                        
                      Swal.fire(
                        'Compra realizada!',
                        'Ha terminado la compra de Coins exitosamente',
                        'success'
                      )
                    }
                  })
            }
           
        },
  
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