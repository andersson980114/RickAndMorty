// Description: This file contains the profile logic
// Author: Sebastián Gámez

// Imports
const { createApp } = Vue;

// Create the app
const app = createApp({
    data() {
        return {
            // Render variables
            render: {
                history: false,
                historyButton: false
            },
            // User
            user: JSON.parse(localStorage.getItem('user')),
        }
    },
    methods: {
        // Toggle the history
        toggleHistory() {
            // Check if the user has cards
            // If the user has cards, toggle the history
            if (this.user.cards.length > 0) {
                this.render.history = !this.render.history;
            }
            // If the user doesn't have cards, show a message to the user
            else{
                swal("No hay historial", "No hay historial de compras", "info");
            }
        }
    },
});

// Mount the app
app.mount('#app');