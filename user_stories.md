# Assignment Overview: Lab 11

## BusMall

### Backstory

You've been hired by a startup called BusMall, whose product is similar to the SkyMall catalog found in the seat back pockets on airplanes: a catalog of assorted high-markup products provided to a captive audience seeking a mental escape from the drudgery of travel.

But in this case, BusMall catalogs are placed on regional transit system buses... whose overall travel times are now comparable to cross-country flights, after all.

Since catalogs are expensive to print and distribute, and the products cost money to make and warehouse, and BusMall is a lean startup that needs to carefully watch its expenditures, BusMall wants to feature only the items in its catalog that are the most likely to sell.

This means that BusMall wants to do market analysis on proposed products to test their potential customer interest... before actually putting them into the catalog and getting the manufacturing wheels in motion.

### Problem Domain

To make this market analysis maximally effective, BusMall wants you to build an app that displays potential products to individuals in focus groups (three products at a time, side-by-side-by-side) so you'll need to manage the size and the aspect ratio of the images and perhaps edit them a bit; Mac users can do this in Preview (very cool!), plus, there are lots of online tools.

The app's purpose is to have the group members choose which product, of the three displayed images, that they would be most likely to purchase, and then store, calculate, and visually display the resulting data.

To keep the product selection process as untainted as possible, you have been instructed to not allow any results to be shown to users until there have been a total of 25 selections made.

The marketing team is not only interested in the total number of clicks, but also the percentage of times that an item was clicked when it was shown. So, you'll also need to keep track of how many times each image is displayed and do the calculations.

You are also responsible for the look and feel of the app, so don't forget a custom font, color palette, layout with semantic HTML, and so on.

## User Stories and UI Design

Part of your assignment today is to write user stories then do UI
mockup and component decomposition.

### User Stories

> As a _x_, I want _y_, so that _z_.

Part of your assignment today is to write user stories. Be sure to consider the multiple roles involved: the marketing research team and the focus group participant who will be using the application. Try to write as many user stories as you can for each role. DO THIS STEP FIRST in a file called `user_stories.md`. 

### UI Mockup and Component Diagrams

Do a UI Mockup and Component Diagram like we have been doing in class.

1. Wireframe of UI
1. Actual boxes around each component
1. Tree diagram of components derived from above step
1. Identify what each component needs to do its job:
    * Data
    * Callbacks
    * Methods (future actions from parents)
1. Create tasks for each user story based on above


Take about 30-45 minutes to work on the user stories and draft a technical plan for the project (component diagram, data tree, a detailed to-do list of things to make, step by step and tested at each stage) before getting into the code. That time spent in thought and planning will make the code flow a lot faster. Give yourself a series of little problems to solve (rather an a ginormous thing that you just wade through and poke at).

Set 'em up, and knock 'em down.

Plan your work, and work your plan.

## Requirements For This Lab

**Note: There's a lot of moving pieces in this assignment, and more details to attend to than it might seem at first. Build methodically, in small pieces, that you test and check regularly. ACP regularly on at least one non-master branch. Sketching out a plan and breaking down the problem conceptually before getting into the code.**

* Scaffold your repo with the usual README, CSS, JS, and HTML files.
* Hard code your products data which should include:
    ```js
    {
        name: 'product name',
        image: 'product.png'
    }
    ```
* You will need a `products-api.js` (only has a `getAll` of static data) and a `survey-api.js` (only needs an `add()`). 
* STRETCH goal, save the active survey after each add, then reload on page load. Don't forget to clear on survey end!)
* Start a survey by creating a survey array by mapping the products array:
    ```js
    const survey = products.map(product => {
        return {
            name: product.name,
            image: product.image,
            views: 0,
            clicks: 0
        };
    });
    ```
* The thing you want to build today will select three random products from the survey (copy of products array) and display them side-by-side-by-side in the browser window.
* In addition, you'll want to be able to receive clicks on those displayed images, and track those clicks for each image. You'll also want to track how many times each image is displayed, for statistical purposes.
* Upon receiving a click, as long as total is less than 25, three new non-duplicating random images need to be automatically displayed. In other words, the three images that are displayed should contain no duplicates, nor should they duplicate with any images that we displayed immediately before. (HINT: store the last image set on the `App`)
* After 25 selections have been made, redirect to `user-summary.html`
* User summary can have very rudimentary list with something like "3 votes for the Banana Slicer showed 6 times".

## Stretch Goals For This Lab

* Handle the display and voting for an arbitrary number of images
* Using a variable, declare in your JS how many images to show
* Based on that value, dynamically create that many `<img>` tags
* Also based on that value, ensure that your randomizer is properly handling the specified number of images for display and repeat tracking.

**This is an individual assignment today, but you are free (heck, even encouraged) to collaborate with classmates if you want. Just be sure that if you do, be sure to make note of that collaboration in your README file.**