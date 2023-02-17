// Description: This file contains the profile logic
// Author: Sebastián Gámez

// Imports
const { createApp } = Vue;

// Create the app
const app = createApp({
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
        }
    },
    methods: {},
});

// Mount the app
app.mount('#app');