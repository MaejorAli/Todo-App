const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Define custom tasks
      on('task', {
        clearDatabase() {
          // Path to the JSON database file
          const todosPath = path.resolve('./todos.json'); 

          // Overwrite the file with an empty array
          fs.writeFileSync(todosPath, JSON.stringify([]));

          console.log('Database cleared successfully');
          return null; // Tasks must return something (even `null`) to indicate completion
        },
      });
    },
    baseUrl: 'http://localhost:3000', // Update with base URL
  },
});
