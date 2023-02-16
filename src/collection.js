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
    },
});

// Mounting the app
app.mount("#app");