// when the extension is first installed, set default values
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        toggleSitesList: ['https://example.com']
    }, function() {});
});

// set up initial chrome storage values
var toggleSitesList = ['https://example.com'];

chrome.storage.sync.get([
    'toggleSitesList'
], function(result) {
    toggleSitesList = result.toggleSitesList;
});

// on each site request, block if it's in toggleSitesList
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // determine if the url is in toggleSitesList
        var url = new URL(details.url);
        var cancel = Object.values(toggleSitesList)
             .some(site => {
                 var url = new URL(details.url);
                 return Boolean(url.origin.indexOf(site) !== -1);
             });

        return { cancel: cancel };
    },
    {
        urls: ["<all_urls>"]
    },
    [
        "blocking"
    ]
);

// any time a storage item is updated, update global variables
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync') {
        if (changes.toggleSitesList) {
            toggleSitesList = changes.toggleSitesList.newValue;
        }
    }
});