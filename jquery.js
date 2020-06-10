// Previous page button
$("#btn-go-back").on('click', function () {
    window.history.back();
})

// START HERE
// Selecting the breadcrumb container
// This is suing a bootstrap class, you can use your custom styles
var crumbContainer = $(".breadcrumb").first();
var indexPageName = 'Home';
var maxCrumbLen = 3; // How many history to show
initBreadCrumb();


function initBreadCrumb() {
    // Just ignoring home page for the example, You can use add to the homepage if you want
    // Remove container from homepage if you don't want breadcrumbs in homepage
    if (crumbContainer) {
        // Currently using a data from page 
        var pageName = crumbContainer.data('breadcrumbLabel');
        // You are Free to use link
        // var pageName = location.href;
        // If container is in home page
        if (!pageName || pageName === indexPageName) {
            initHomeCrumb();
            return;
        }

        var crumbList = localStorage.getItem('crumbList');
        if (!crumbList) {
            initHomeCrumb();
            crumbList = localStorage.getItem('crumbList');
        }
        crumbList = JSON.parse(crumbList)
        // Check for the length of history
        if (crumbList.length === maxCrumbLen) {
            if (crumbList[crumbList.length - 1].label !== pageName) {
                crumbList.shift();
            }
        }
        // New page 
        if (crumbList[crumbList.length - 1].label !== pageName) {
            crumbList.push(createCrumb(pageName));
        }
        // Rendering 
        crumbList.forEach((crumb, index) => {
            var newCrumb = createCrumbMarkup(crumb, index, crumbList.length);
            crumbContainer.append(newCrumb);
        });
        // Update the crumbList
        localStorage.setItem('crumbList', JSON.stringify(crumbList));
    } else {
        console.error('Crumb container not found');
        initHomeCrumb();
    }
}
// The markup for the crumb
function createCrumbMarkup(crumb, index = 0, length = 1) {
    // You can define your own markup
    // Using Bootrap 3 class - Check vanilla JS for BS 4
    var li = $(document.createElement('li'));
    var a = $(document.createElement('a'));
    a.attr('href', crumb.url);
    a.text(crumb.label);
    li.append(a);

    // Sets the current crumb active
    if (index === (length - 1)) {
        li.addClass('active');
        a.removeAttr('href');
    }
    return li;
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
    var list = [createCrumb(indexPageName)];
    // Convert to string in order to save the localstorage
    list = JSON.stringify(list);
    localStorage.setItem('crumbList', list);
    localStorage.setItem('prevCrumb', list);
}