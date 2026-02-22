// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || mobileMenuToggle.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }
    
    // Search and Filter functionality
    const searchInput = document.getElementById('resource-search');
    const categoryFilter = document.getElementById('category-filter');
    const platformFilter = document.getElementById('platform-filter');
    const filterChips = document.querySelectorAll('.chip');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterResources);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterResources);
    }

    if (platformFilter) {
        platformFilter.addEventListener('change', filterResources);
    }
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            filterResources();
        });
    });
    
    function filterResources() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategories = Array.from(document.querySelectorAll('.chip.active')).map(chip => chip.dataset.category);
        const selectedPlatform = platformFilter ? platformFilter.value : '';
        
        const resourceCategories = document.querySelectorAll('.resource-category');
        
        resourceCategories.forEach(category => {
            const categoryName = category.dataset.category;
            const categoryVisible = selectedCategories.length === 0 || selectedCategories.includes(categoryName);
            
            if (!categoryVisible) {
                category.style.display = 'none';
                return;
            }

            // Handle card-based resources (e.g. browser extensions)
            const cards = category.querySelectorAll('.resource-card');
            let visibleCards = 0;

            cards.forEach(card => {
                const platforms = card.dataset.platforms || '';
                const cardText = ((card.dataset.name || '') + ' ' + (card.dataset.description || '')).toLowerCase();
                const matchesSearch = !searchTerm || cardText.includes(searchTerm);
                const matchesPlatform = !selectedPlatform || platforms.includes(selectedPlatform);

                if (matchesSearch && matchesPlatform) {
                    card.style.display = '';
                    visibleCards++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Handle table-based resources
            const rows = category.querySelectorAll('.resource-table tbody tr');
            let visibleRows = 0;

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                const matchesSearch = !searchTerm || text.includes(searchTerm);
                
                if (matchesSearch) {
                    row.style.display = '';
                    visibleRows++;
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Hide category if no items are visible
            category.style.display = (visibleCards > 0 || visibleRows > 0 || (cards.length === 0 && rows.length === 0)) ? '' : 'none';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add copy button functionality for code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        button.addEventListener('click', function() {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(button);
    });
    
    // Table of contents generator for documentation pages
    const docContent = document.querySelector('.doc-content');
    if (docContent) {
        const headings = docContent.querySelectorAll('h2, h3');
        if (headings.length > 3) {
            const tocContainer = document.createElement('div');
            tocContainer.className = 'table-of-contents';
            tocContainer.innerHTML = '<h3>Table of Contents</h3><ul></ul>';
            
            const tocList = tocContainer.querySelector('ul');
            headings.forEach((heading, index) => {
                const id = heading.id || `heading-${index}`;
                heading.id = id;
                
                const li = document.createElement('li');
                li.className = heading.tagName.toLowerCase();
                const link = document.createElement('a');
                link.href = `#${id}`;
                link.textContent = heading.textContent;
                li.appendChild(link);
                tocList.appendChild(li);
            });
            
            docContent.insertBefore(tocContainer, docContent.firstChild.nextSibling);
        }
    }
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
