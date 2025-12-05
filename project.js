// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
});
// Add stagger animation to project cards on page load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Initialize expand/collapse functionality
    initializeExpandableCards();
    
    // Initialize scroll to top button
    initScrollToTop();
});

// Expandable card functionality
function initializeExpandableCards() {
    const expandButtons = document.querySelectorAll('.expand-btn');

    // Expand/collapse card when button is clicked
    expandButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.project-card');
            const isExpanded = card.classList.contains('expanded');

            if (isExpanded) {
                // If already expanded, collapse it
                collapseCard(card);
            } else {
                // If collapsed, expand it (and close others)
                expandCard(card);
            }
        });
    });

    // Close expanded card when clicking outside
    document.addEventListener('click', (e) => {
        const expandedCard = document.querySelector('.project-card.expanded');
        if (expandedCard && !expandedCard.contains(e.target)) {
            collapseCard(expandedCard);
        }
    });
}

function expandCard(card) {
    // Close all other cards first
    const allCards = document.querySelectorAll('.project-card');
    allCards.forEach(c => {
        if (c !== card) {
            collapseCard(c);
        }
    });
    
    // Small delay to ensure other cards close first
    setTimeout(() => {
        card.classList.add('expanded');
        
        // Update button text
        const expandBtn = card.querySelector('.expand-btn');
        expandBtn.textContent = 'Close Details ↑';
        expandBtn.style.background = '#BA487F';
        
        // Smooth scroll to card with delay for animation
        setTimeout(() => {
            const cardTop = card.getBoundingClientRect().top + window.pageYOffset;
            const offset = 100;
            
            window.scrollTo({ 
                top: cardTop - offset,
                behavior: 'smooth'
            });
        }, 300);
    }, 100);
}

function collapseCard(card) {
    card.classList.remove('expanded');
    
    // Reset button text
    const expandBtn = card.querySelector('.expand-btn');
    expandBtn.textContent = 'View Details ↓';
    expandBtn.style.background = '#540863';
}

function closeAllCards() {
    const expandedCards = document.querySelectorAll('.project-card.expanded');
    expandedCards.forEach(card => {
        collapseCard(card);
    });
}

// Escape key to close expanded cards
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const expandedCard = document.querySelector('.project-card.expanded');
        if (expandedCard) {
            collapseCard(expandedCard);
        }
    }
});

// Scroll to Top Button Functionality
function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    
    if (!scrollButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
