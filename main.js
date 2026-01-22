document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const headerActions = document.querySelector('.header-actions');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            // For now, this is a placeholder for the mobile menu logic.
            // We would toggle a class on the navList and headerActions to show them.
            // Since the CSS for the mobile view of the menu isn't fully built yet (display: none on mobile),
            // we will implement the full drawer behavior in the next steps.
            console.log('Mobile menu clicked');
            alert('Mobile menu toggle clicked');
        });
    }
});
