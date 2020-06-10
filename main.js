// Previous page button
if (document.querySelector(".btn-go-back")) {
    document.querySelector(".btn-go-back").addEventListener('click', () => {
        window.history.back();
    })
}

// START HERE
// Selecting the breadcrumb container
// This is using a bootstrap class, you can use your custom styles
var crumbContainer = document.querySelector(".breadcrumb");
const indexPageName = 'Home'; // Change this to whatever you want your homapge to be called
const maxCrumbLen = 3; // Change this to your need, shows 3 previous path by default
// Initiates the breadcrumb rendering
initBreadCrumb();
// Change the markup if you want in the createCrumbMarkup function

function initBreadCrumb() {
    // Just ignoring home page for the example, You can use add to the homepage if you want
    // Remove container from homepage if you don't want breadcrumbs in homepage
    if (crumbContainer) {
        // Currently using a data from page 
        let pageName = crumbContainer.dataset.breadcrumbLabel;
        // You are Free to use link
        // let pageName = location.href;

        // Add a return keyword in the next statement to stop rendring crumb in home page
        // Remove container from Home page also
        if (!pageName || pageName === indexPageName) {
            initHomeCrumb();
            //return;
        }

        let crumbList = localStorage.getItem('crumbList');
        if (!crumbList) {
            initHomeCrumb();
            crumbList = localStorage.getItem('crumbList');
        }
        crumbList = JSON.parse(crumbList)

        // Removes the first entry when limit is reached
        if (crumbList.length === maxCrumbLen) {
            if (crumbList[crumbList.length - 1].label !== pageName) {
                crumbList.shift();
            }
        }
        // New Page
        if (crumbList[crumbList.length - 1].label !== pageName) {
            crumbList.push(createCrumb(pageName));
        }
        // Rendering
        crumbList.forEach((crumb, index) => {
            let newCrumb = createCrumbMarkup(crumb, index, crumbList.length);
            crumbContainer.append(newCrumb);
        });

        localStorage.setItem('crumbList', JSON.stringify(crumbList));
    } else {
        console.error('Crumb container not found');
        initHomeCrumb();
    }
}
// The markup for the crumb
function createCrumbMarkup(crumb, index = 0, length = 1) {
    // You can define your own markup
    // Using Bootrap 4 class - Check JQUERY for bootstrap 3
    let markup = document.createElement('a');

    markup.classList.add('breadcrumb-item');
    markup.href = crumb.url;
    markup.innerText = crumb.label;

    // Sets the current crumb active
    if (index === (length - 1)) {
        markup.classList.add('active');
        markup.removeAttribute('href');
    }
    return markup;
}
// Crumb Object
function createCrumb(crumbName = "") {
    return {
        label: crumbName,
        url: location.href
    }
}

// Start the breadcrumb
function initHomeCrumb() {
    // Array to initialize
    let list = [createCrumb(indexPageName)];
    // Convert to string in order to save the localstorage
    list = JSON.stringify(list);
    localStorage.setItem('crumbList', list);
    localStorage.setItem("prevCrumb", list);
}