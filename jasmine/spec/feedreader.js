/* All tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite tests RSS feed definitiions, particularly the 
     * allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This test verifies the allFeeds variable has been 
         * defined and not empty. If the allFeeds in app.js is
         * empty, the spec will generate an exception because the.
         * allFeeds length is equal to zero.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in allFeeds and ensures
         * a URL is defined and not empty.
         */
        it('have a URL defined and are not empty', function(){
            for(var feed = 0; feed<allFeeds.length; feed++){
                expect(allFeeds[feed].url).toBeTruthy();
            }
        });

        /* This test loops through each feed in allFeeds and ensures
         * a name is defined and not empty.
         */
        it('have a name defined and are not empty', function(){
            for(var feed = 0; feed<allFeeds.length; feed++){
                expect(allFeeds[feed].name).toBeTruthy();
            }
        });
    });

    /* This suite tests the menu. */
    describe('The menu', function() {
        /* Test checkes to make sure menu is hidden by default. */
        it('is hidden by default', function() {
            var menuHiddenClass = $('body').hasClass("menu-hidden");
            expect(menuHiddenClass).toBeTruthy();
        });

        /* Test checks that the menu is visible when cliked and then 
         * it is hidden again when clicked again.
         */
        it('changes visibility when the menu item is clicked', function(){
            $('.menu-icon-link').trigger( "click" );
            var menuHiddenClass2 = $('body').hasClass("menu-hidden");
            expect(menuHiddenClass2).not.toBeTruthy();
            $('.menu-icon-link').trigger( "click" );
            var menuHiddenClass3 = $('body').hasClass("menu-hidden");
            expect(menuHiddenClass3).toBeTruthy();
        });
    });

    /* This suite tests the initial entries loaded when the intial news feed is loaded */
    describe('Initial Entries', function() {
        
        /* intiailly loads a news feed(in this case the first one) before running test. */
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        /* This test ensures when the loadFeed function is called and
         * completes its work, there is at least a single .entry element
         * within the .feed container.
         */
        it('has at least a single .entry element within the .feed container when loadFeed is called', function() {
            var entryNumber = $(".feed").find(".entry").length;
            expect(entryNumber).toBeGreaterThan(0);
        });
    });

    /* This suite tests the content when a new feed selection is selected to ensure content changes */
    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes. This is an asynchronous test.
         */

        /*intial variables used for test to combare content from news feed before and after.*/
        var feedTitleBefore,
        	feedTitleAfter,
        	contentBefore,
        	contentAfter;

        /*loads the first news feed and populates the container content from the initial feed loaded. */
        beforeEach(function(done) {
            loadFeed(0,function(){
                feedTitleBefore = $('.header-title').html();
                contentBefore = $('.feed')[0].innerText;
                done();
            });
        });

        /*after each newsfeed is loaded (1,2,3,and 0) compares the content to verify it has changed from before. */
        it('is loaded by loadFeed and content changes for CSS Tricks', function(done) {
            loadFeed(1,function(){
                feedTitleAfter = $('.header-title').html();
                contentAfter = $('.feed')[0].innerText;
                expect(feedTitleBefore).not.toEqual(feedTitleAfter);
                expect(contentBefore).not.toEqual(contentAfter);
                done();
            });
        });
    });

   /* Entry Links: This suite makes sure each news feed has href's defined for all the entries
    * inside of each news feed. (particularly they are not empty). 
    * To examine the href's, this suite will first make sure feeds are actually loaded.
    * When .feed is emptied and loadFeed is not called, the first expect which checks
    * how many ffeds are loaded will fail with the error "Expected 0 to be greater than 0."
    * which is expected.
    */
    describe('Entry Links', function() {

        beforeEach(function(done) {
        	$('.feed').empty();
            loadFeed(0,done);
        });

        /* This test will ensure that if a feed is loaded, each entry link will have a href
         * defined. As explained above, if a feed isn't loaded this test should fail.
        */
        it('all have an href for Udacity BLog if feeds are loaded', function() {
            var entryLinks = $('.feed').find('.entry-link');
            expect(entryLinks.length).toBeGreaterThan(0);
            /* I explored passing key,value in with the funcion, but they were not needed
             * here because $(this) was succifient. Key gave me the index number of the
             * article and value gave me the $(this) element for each entry link. Appreciated
             * the help and guidance here to learn more about .each!
             */
            $.each(entryLinks,function(){
            	var entryLinksHref = $(this).attr('href');
            	expect(entryLinksHref).toBeDefined;
            })
        });
    });

    /* This test suite was designed to use a spyEvent as shown from my earlier submissions
     * Even though I had great help from my previous reviews, I still was unable to succesfully
     * test that the "on" event was triggered for a click event. The below test will work but I'm
     * not convinced that it actually is checking anything other than I ran the jQuery function
     * .click in this test suite. 
     * My original test was suppossed to check that the $.on function was called when the menu item
     * was clicked and through the help of my review I thought it would be as simple as just triggering
     * a click function and spying on the jQuery function .on and just checking that it was called, but
     * there must be something I'm missing. I've tried reading every StackOverflow article possible and the
     * best I can come up with is I need to stub out the function. Here's probably the best article I found
     * explaining what could be my problem. http://stackoverflow.com/questions/5337481/spying-on-jquery-selectors-in-jasmine
     * I'll keep exploring Jasmine as I am finding I enjoy testing my application, and I think I'll have
     * better luck trying this in future application. I welcome any suggestions and appreciate the help
     * you guys give. It's really amazing and truly appreciated!

    describe('Menu Item Links', function(){

        it('event listener has been created', function(){
            spyOn($.fn,'click')
            $('.feed-list a').eq(0).click();
            expect($.fn.click).toHaveBeenCalled();
        })
    })
    
    // This is what I really wanted to check and it just wasn't working for me even
       even with significant help from my reviewer.
        describe('Menu Item Links', function(){
        it('event listener has been created', function(){
            spyOn($.fn,'on')
            $('.feed-list a').eq(0).click();
            expect($.fn.on).toHaveBeenCalled();
        })
    })

    */

}());
