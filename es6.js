// es6.js

document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userTableBody = document.querySelector('#userTable tbody');
    const filterButton = document.getElementById('filterButton');
    const sortButton = document.getElementById('sortButton');

    // Load existing data from localStorage when the page loads
    loadData();

    userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);

        // Create a user object
        const user = { name, age };

        // Get existing users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Add new user to the array
        users.push(user);
        
        // Store updated users array in localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Clear the form
        userForm.reset();

        // Reload the data in the table
        loadData();
    });

    function loadData(users = JSON.parse(localStorage.getItem('users')) || []) {
        // Clear the table body
        userTableBody.innerHTML = '';

        // Populate the table with users
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${user.name}</td><td>${user.age}</td>`;
            userTableBody.appendChild(row);
        });
    }

    filterButton.addEventListener('click', () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(user => user.age > 18);
        loadData(filteredUsers);
    });

    sortButton.addEventListener('click', () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const sortedUsers = users.sort((a, b) => a.age - b.age);
        loadData(sortedUsers);
    });
});