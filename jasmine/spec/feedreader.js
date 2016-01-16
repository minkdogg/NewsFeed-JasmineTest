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
         * within the .feed container. This is an asynchronous test.
         */
        it('has at least a single .entry element within the .feed container when loadFeed is called', function(done) {
            var entryNumber = $(".feed").find(".entry").length;
            expect(entryNumber).toBeGreaterThan(0);
            done();
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
    * inside of each news feed. (particularly they are not empty)
    */
    describe('Entry Links', function() {

        beforeEach(function(done) {
        	$('.feed').empty();
            loadFeed(0,function(){
                done();
            });
        });

        it('all have an href for Udacity BLog if feeds are loaded', function(done) {
            var entryLinks = $('.feed').find('.entry-link');
            if (entryLinks.length === 0){
            	expect(entryLinks[0].not.toBeDefined());
            }
            
            for(var entry = 0; entry<entryLinks.length; entry ++){
                expect(entryLinks[entry].href).toBeDefined();
            }
            done();
        });
    });

}());
