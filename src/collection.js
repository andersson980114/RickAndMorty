// Description: This file is used to create a collection js file
// Author: Sebastián Gámez

// Importing vue
const { createApp } = Vue;

// Creating the app
const app = createApp({
    // Data
    data() {
        return {
            // cards
            cards: [],
            coinsUser: 0, //
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
    // Mounted
    mounted() {
        if (localStorage.getItem("cards")) {
            // Getting the cards
            this.cards = JSON.parse(localStorage.getItem("cards"));
        } else {
            // Getting the cards
            this.getCards();
        }
    },
    methods: {
        // Update local storage
        updateLocalStorage() {
            // Getting the cards
            const cards = this.cards;
            // Updating the local storage
            localStorage.setItem("cards", JSON.stringify(cards));
        },
        // Function to get a random number between min and max
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },
        // Function to get the cards
        async getCards() {
            // Getting the ids
            const ids = [];
            for (let i = 0; i < 10; i++) {
                ids.push(this.getRandomInt(0, 825));
            }
            // Fetching the cards
            const res = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(',')}`)
            const data = await res.json();
            // Defining if the card will be a seller or not and their price
            for(let i = 0; i < data.length; i++) {
                // Defining if the card will be a seller or not
                data[i].isSeller = this.getRandomInt(0,2) === 1 ? true : false;
                // Defining the price
                data[i].price = this.getRandomInt(10, 100);
            }
            // Pushing the cards
            this.cards = data;
            // Updating the local storage
            this.updateLocalStorage();
            // log the cards
            console.log(this.cards);
        },
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
        pasaFinish(){ 
            
            if(this.numTarjet === undefined || this.fechaCad === undefined || this.ccv === undefined || this.valor === undefined || this.metodo === undefined ){
                this.error= true
                this.mensaje = 'Asegurese de llenar todos los campos'
            }else{
                
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
                this.showModal = false
                this.showPasarela= false 
                this.showCoins= false 
            }
           
        },
        logout(){
            this.actualizar()
            this.user = null
            localStorage.setItem('user', JSON.stringify(this.user))
            window.location = "index.html"
        },
        actualizar(){
            let users = JSON.parse(localStorage.getItem('users'))
            localStorage.setItem('user', JSON.stringify(this.user))

            users.map((item, index) => {
                if(item.username === this.user.username && item.email === this.user.email){
                    users[index] = this.user
                }
            })
            localStorage.setItem('users', JSON.stringify(users))

        }
      
    },
    created(){
        if(this.user ===null){
            window.location = "index.html"
        }
    }
});

// Mounting the app
app.mount("#app");