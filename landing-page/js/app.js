/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
//get ul element id and store in variable
const navBarList = document.getElementById('navbar__list');
//for performance improvments we use fragment
const fragment = document.createDocumentFragment();
//define allSection variable as a varible for sections elements
const allSections = document.querySelectorAll('section');
// Height of the window
const windowHeight = window.innerHeight;
//define Header as a variable
const header = document.querySelector('.page__header');
// To top button
const scrollToTopBtn = document.getElementById("my_btn");
let scrollTimer = null;
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
//creating navbar function
function createNavbar(id, name) {
    //return anchor elem with its attribute in a variable called newItem 
    const newItem = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return newItem;
}
//check the sec in the viewport
function isInViewport(elem) {
    // Get the element top coordinate
    const topBounding = elem.getBoundingClientRect().top;
    // 0.4 works good without overlapping sections
    return topBounding < windowHeight * 0.4 && topBounding > windowHeight * -0.6;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildNav() {
    //looping in the allSection array of sections 
    for (let i = 0; i < allSections.length; i++) {
        //create li 
        const newListItem = document.createElement('li');
        //return fata-nav attribute in variable name
        const name = allSections[i].getAttribute('data-nav')
            //get the id of section 
        const sectionId = allSections[i].getAttribute('id')
            //create navbar using innerHTML method 
        newListItem.innerHTML = createNavbar(sectionId, name)
            //using fragment improve performance
        fragment.appendChild(newListItem);
    }
    //create navbar items
    const navBarList = document.querySelector('#navbar__list')
    navBarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    for (let i = 0; i < allSections.length; i++) {
        if (isInViewport(allSections[i])) {
            allSections[i].classList.add("your-active-class");
        } else {
            allSections[i].classList.remove("your-active-class");
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToElement(event) {
    // Using (nodeName) property to verify target is the desired element
    if (event.target.nodeName === 'A') {
        // Prevent the default action from occurring
        event.preventDefault();
        //define the targeted section id
        const sectionId = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: "smooth" });
    }
}
// Build navbar items 
buildNav();
//scroll to top function
function scrollToTop() {
    // Scroll to top logic
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// Hide fixed navigation bar while not scrolling
/*
 * Set a timer in scroll event
 * When the timer fire, then it is supposed that scrolling has stopped
 */
function hideNavbar() {
    if (scrollTimer !== null) {
        // Reset the timer
        clearTimeout(scrollTimer);
        header.classList.remove('hide__header');
    }
    scrollTimer = setTimeout(() => {
        // Hide navbar when not scrolling
        header.classList.add('hide__header');
        // Show navbar when on the top of page and before reach sections
        if (window.pageYOffset < windowHeight * 0.4) {
            header.classList.remove('hide__header');
        }
    }, 1000);
};

/**
 * End Main Functions
 * Begin Events
 * 
 */
document.onscroll = setActiveSection();
// Scroll to section on link click
navBarList.addEventListener('click', function(event) { scrollToElement(event) });
//event to scroll to up button 
scrollToTopBtn.addEventListener("click", scrollToTop)
    /* scroll using a delay
     * to reduce the frequency of scrolling events fired
     */
setTimeout(() => {
    document.addEventListener('scroll', () => {
        // Set sections as active
        setActiveSection();
        // Hide nav while not scrolling
        hideNavbar();
    });
}, 10);