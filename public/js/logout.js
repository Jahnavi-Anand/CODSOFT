// Add event listener to the logout button
document.getElementById('logoutButton').addEventListener('click', async function(event) {
    event.preventDefault();

    try {
        const response = await fetch('/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Logged out successfully!');
            window.location.href = '/login'; // Redirect to login page after successful logout
        } else {
            throw new Error('Logout failed');
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Error logging out.');
    }
});
