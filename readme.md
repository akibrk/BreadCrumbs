# Dynamic BreadCrumb Generator (JS)
### Implemented with Bootstrap 3/4 vanilla Javascript and JQuery

## Things you should know
 - This is not compiled
 - You can change everything about the code, just read throgh once
 - Two versions available Pure JS and JQuery
 - Run the project in test server to test how it works, I have included few test pages

## Getting Started
 - Copy all from either `main.js` or `jquery.js` to your file
 - Add a breadcrumb container `<nav class="breadcrumb"></nav>` will do
 - Set the name for your homepage/landing page
 - Set the history length
 - Use back button if you want

 ## The Back Navigation
 - Use this as container if you want back button
    ```html
    <nav class="breadcrumb">
        <a href="#." class="breadcrumb-item btn-go-back">Back</a>
    <nav>
    ```
 - Its added by default in JS, you can remove it if you want
 - Uses `window.history`
## Other
 - If you don't want cumbs in home page remove the container
 - Also modify this part in line 29 in `main.js` or 24 in `jquery.js`
    ```javascript
    if (!pageName || pageName === indexPageName) {
        initHomeCrumb();
        return;
    }
    ``` 
**Let me know if you have any suggestions. Have a good one! :)**

Source - https://github.com/akibrezakhan