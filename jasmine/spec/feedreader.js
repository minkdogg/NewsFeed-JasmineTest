/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page? The spec generates an error because the allFeeds
         * length is equal to zero.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL defined and are not empty', function(){
            for(var feed = 0; feed<allFeeds.length; feed++){
                expect(allFeeds[feed].url).toBeTruthy();
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined and are not empty', function(){
            for(var feed = 0; feed<allFeeds.length; feed++){
                expect(allFeeds[feed].name).toBeTruthy();
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        
        it('is hidden by default', function() {
            var menuHiddenClass = $('body').hasClass("menu-hidden")
            expect(menuHiddenClass).toBeTruthy();
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu item is clicked', function(){
            $('.menu-icon-link').trigger( "click" );
            var menuHiddenClass2 = $('body').hasClass("menu-hidden")
            expect(menuHiddenClass2).not.toBeTruthy();
            $('.menu-icon-link').trigger( "click" );
            var menuHiddenClass3 = $('body').hasClass("menu-hidden")
            expect(menuHiddenClass3).toBeTruthy();
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        // intiailly loads a news feed(in this case the first one) before running test.
        beforeEach(function(done) {
            loadFeed(0,function(){
                done();
            });
        })

        it('has at least a single .entry element within the .feed container when loadFeed is called', function(done) {
            var entryNumber = $(".feed").find(".entry").length
            expect(entryNumber).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        //intial variables used for test to combare content from news feed before and after.
        var containerBefore;
        var containerAfter;
        var contentBefore;
        var contentAfter;

        //loads the first news feed and populates the container content from the initial feed loaded.
        beforeEach(function(done) {
            loadFeed(0,function(){
                containerBefore = $('.header-title').html();
                contentBefore = $('.feed')[0].innerText;
                done();
            });
        })

        //after each newsfeed is loaded (1,2,3,and 0) compares the content to verify it has changed from before.
        it('is loaded by loadFeed and content changes for CSS Tricks', function(done) {
            loadFeed(1,function(){
                containerAfter = $('.header-title').html();
                contentAfter = $('.feed')[0].innerText;
                expect(containerBefore).not.toEqual(containerAfter);
                expect(contentBefore).not.toEqual(contentAfter);
                done();
            });
        });

        it('is loaded by loadFeed and content changes for HTML5 Rocks', function(done) {
            loadFeed(2,function(){
                containerAfter = $('.header-title').html();
                contentAfter = $('.feed')[0].innerText;
                expect(containerBefore).not.toEqual(containerAfter);
                expect(contentBefore).not.toEqual(contentAfter);
                done();
            });
        });

        it('is loaded by loadFeed and content changes for Linear Digression', function(done) {
            loadFeed(3,function(){
                containerAfter = $('.header-title').html();
                contentAfter = $('.feed')[0].innerText;
                expect(containerBefore).not.toEqual(containerAfter);
                expect(contentBefore).not.toEqual(contentAfter);
                done();
            });
        });
        //this tests to make sure the content is the same upon reloading of the same news feed.
        it('is loaded by loadFeed and content does not change for Udacity Blog', function(done) {
            loadFeed(0,function(){
                containerAfter = $('.header-title').html();
                contentAfter = $('.feed')[0].innerText;
                expect(containerBefore).toEqual(containerAfter);
                expect(contentBefore).toEqual(contentAfter);
                done();
            });
        });
    });

   /* Entry Links: This suite makes sure each news feed has href's defined for all the entries
    * inside of each news feed. (particularly they are not empty)
    */
    describe('Entry Links', function() {

        beforeEach(function(done) {
            loadFeed(0,function(){
                done();
            });
        });

        it('all have an href for Udacity BLog', function(done) {
                var entryLinks = $('.feed').find('.entry-link');
                for(var entry = 0; entry<entryLinks.length; entry ++){
                    expect(entryLinks[entry].href).toBeDefined();
                    expect(entryLinks[entry].href).not.toBeNull();
                }
                done();
        });

        it('all have an href for CSS Tricks', function(done) {
            loadFeed(1,function(){
                var entryLinks = $('.feed').find('.entry-link');
                for(var entry = 0; entry<entryLinks.length; entry ++){
                    expect(entryLinks[entry].href).toBeDefined();
                    expect(entryLinks[entry].href).not.toBeNull();
                }
                done();
            })
        });

        it('all have an href for HTML5 Rocks', function(done) {
            loadFeed(2,function(){
                var entryLinks = $('.feed').find('.entry-link');
                for(var entry = 0; entry<entryLinks.length; entry ++){
                    expect(entryLinks[entry].href).toBeDefined();
                    expect(entryLinks[entry].href).not.toBeNull();
                }
                done();
            })
        });

        it('all have an href for Linear Digression', function(done) {
            loadFeed(3,function(){
                var entryLinks = $('.feed').find('.entry-link');
                for(var entry = 0; entry<entryLinks.length; entry ++){
                    expect(entryLinks[entry].href).toBeDefined();
                    expect(entryLinks[entry].href).not.toBeNull();
                }
                done();
            })
        });
    });


   /* Menu Item Links: This suite checks to make sure the event listener for the menu
    * has been created (click event). I wanted to try and use a "spy" in Jasmine and 
    * couldn't come up with a more creative way to use one other than check if the 
    * click event listener was created.
    */
    describe('Menu Item Links', function() {

        it('event listener has been created', function() {
            spyOn($.fn,'on')
            var feedList = $('.feed-list');
                feedList.on('click','a',function() {
                    var item = $(this);
                    $('body').addClass('menu-hidden');
                    loadFeed(item.data('id'));
                    return false;
                });
            expect($.fn.on).toHaveBeenCalled();
        });
    })


}());
