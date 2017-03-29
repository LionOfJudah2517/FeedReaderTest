//feedreader.js
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    var self = this;


    //***********RSS FEEDS TESTING ***********
    describe('RSS Feeds', function() {

        //****FEEDS ARE DEFINED
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //*****ALL URLS ARE DEFINED AND NOT EMPTY
        it('has a URL', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });

        //*****NAMES ARE DEFINED AND NOT EMPTY
        it('name is defined', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    //******** MENU TESTING **********
    describe('Menu Testing', function() {

        //****** MENU IS HIDDEN BY DEFAULT
        it('Menu element is by default, hidden.', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        //********* MENU FUNCTIONALITY TESTING************
        it('Menu is working when clicked', function() {

            //***OPEN***
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //****CLOSED****
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    //****** INITIAL ENTRIES TESTING *********
    describe('Initial Entries', function() {

        //***** ASYNC CALL
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        //**** CHECK TO MAKE SURE THE FEED HAS AT LEAST ONE ENTRY
        it('Feed container has at least a single entry', function() {
            expect($('.entry').length).not.toBe(0);
        });
    });

    //******** NEW FEED SELECTION TESTING *************
    describe('New Feed Selection', function() {

        //******** BEFORE ENTRIES TO COMPARE TO SECOND ENTRIES ***************
        var firstFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                done();
            });
        });

        it("Content changes after load", function() {
            loadFeed(1, function() {
                var entriesAfter = $('.feed').html();
                expect(firstFeed).not.toBe(entriesAfter);
                done();
            });
        });
    });
}());
