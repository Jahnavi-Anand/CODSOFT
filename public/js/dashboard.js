document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/dashboard-data');
        if (response.status === 401) {
            alert('Username not found, redirecting to login page.');
            window.location.href = '/login.html';
            return;
        }
        const dashboard = await response.json();
        document.getElementById('user-name').textContent = dashboard.username;
        document.getElementById('user-email').textContent = dashboard.email;
        document.getElementById('bio').value = dashboard.bio || '';
        document.getElementById('institution').value = dashboard.institution || '';
        document.getElementById('educationLevel').value = dashboard.educationLevel || '';
        document.getElementById('city').value = dashboard.city || '';
        document.getElementById('state').value = dashboard.state || '';
        document.getElementById('contactInfo').value = dashboard.contactInfo || '';
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }

    // Handle form submission
    document.getElementById('dashboardForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const bio = document.getElementById('bio').value;
        const institution = document.getElementById('institution').value;
        const educationLevel = document.getElementById('educationLevel').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const contactInfo = document.getElementById('contactInfo').value;

        const updatedDashboard = {
            bio,
            institution,
            educationLevel,
            city,
            state,
            contactInfo
        };

        try {
            const response = await fetch('/update-dashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDashboard)
            });

            if (response.ok) {
                alert('Dashboard updated successfully.');
            } else {
                alert('Error updating dashboard. Please try again.');
            }
        } catch (error) {
            console.error('Error updating dashboard data:', error);
        }
    });
});
