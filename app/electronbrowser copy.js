//Initializing the components
var ById = function (id) {
    return document.getElementById(id);
}

var path = require('path');
var uuid = require('uuid');
var jsonfile = require('jsonfile');
var bookmarks = path.join(__dirname, 'bookmarks.json');
var bookmarkspage = path.join(__dirname, 'bookmarks.html');
var tirexGame = path.join(__dirname, 'tirex.html');

var back = ById('back'),
    forward = ById('forward'),
    refresh = ById('refresh'),
    omni = ById('omnibox1'),
    dev = ById('console'),
    fave = ById('fave'),
    list = ById('list'),
    homes = ById('homes'),
    view = ById('view');

// create New Tab
document.getElementById('newTab').addEventListener('click', createNewTab);

function createNewTab() {
    const tabId = `tab-${Date.now()}`;
    const webviewId = `webview-${Date.now()}`;

    // Create a new tab button
    const newTab = document.createElement('div');
    newTab.textContent = `Tab ${document.querySelectorAll('.tab').length + 1}`;
    newTab.classList.add('tab');
    newTab.dataset.target = webviewId;

    // Create close button for the tab
    const closeBtn = document.createElement('span');
    closeBtn.textContent = 'x';
    closeBtn.classList.add('close-tab');
    closeBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent tab activation when closing
        closeTab(tabId, newTab, webviewId);
    };

    newTab.appendChild(closeBtn);
    newTab.onclick = () => activateTab(tabId);

    const tabsBar = document.getElementById('tabs-bar');
    tabsBar.insertBefore(newTab, tabsBar.lastChild);

    // // Create a new webview and its URL input
    // const urlInput = document.createElement('input');
    // urlInput.type = 'text';
    // urlInput.placeholder = 'Enter a URL';
    // urlInput.classList.add('url-input');
    // urlInput.onkeypress = (e) => {
    //     if (e.key === 'Enter') {
    //         newWebview.src = urlInput.value;
    //     }
    // };
    
    // const newWebview = document.createElement('webview');
    // newWebview.classList.add('tab-content');
    // newWebview.id = webviewId;

    // const webviewsContainer = document.getElementById('webviews');
    // webviewsContainer.appendChild(newWebview);

    // newWebview.before(urlInput);

    // const tabContent = document.createElement('div');
    // tabContent.id = tabId;
    // tabContent.classList.add('tab-content');
    // tabContent.appendChild(urlInput);
    // tabContent.appendChild(newWebview);
    // document.getElementById('webviews').appendChild(tabContent);

    // Create a new webview and its header
    const mainBox = document.createElement('main');
    mainBox.id = 'main';
    mainBox.classList.add('mdl-layout__content');

    const webviewHeader = document.createElement('div');
    webviewHeader.id = 'webview-header';
    webviewHeader.classList.add('mdl-grid pihatu-grid');
    // left arrow
    const leftArrowBox = document.createElement('div');
    leftArrowBox.classList.add('mdl-cell mdl-cell--1-col button-size');

    const leftArrowButton = document.createElement('button');
    leftArrowButton.id = 'back';
    leftArrowButton.classList.add('mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect');

    const leftArrowIcon = document.createElement('i');
    leftArrowIcon.classList.add('material-icons');
    leftArrowIcon.textContent = 'keyboard_arrow_left';

    leftArrowButton.appendChild(leftArrowIcon);
    leftArrowBox.appendChild(leftArrowButton);

    // right arrow
    const rightArrowBox = document.createElement('div');
    rightArrowBox.id = 'forward';
    rightArrowBox.classList.add('mdl-cell mdl-cell--1-col button-size');

    const rightArrowButton = document.createElement('button');
    rightArrowButton.classList.add('mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect');

    const rightArrowIcon = document.createElement('i');
    rightArrowIcon.classList.add('material-icons');
    rightArrowIcon.textContent = 'keyboard_arrow_right';

    rightArrowButton.appendChild(rightArrowIcon);
    rightArrowBox.appendChild(rightArrowButton);
    
    // refresh button
    const refreshBox = document.createElement('div');
    refreshBox.id = 'refresh';
    refreshBox.classList.add('mdl-cell mdl-cell--1-col button-size');

    const refreshButton = document.createElement('button');
    refreshButton.classList.add('mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect');

    const refreshIcon = document.createElement('i');
    refreshIcon.classList.add('material-icons');
    refreshIcon.textContent = 'refresh';

    refreshButton.appendChild(refreshIcon);
    refreshBox.appendChild(refreshButton);

    // home button
    const homeBox = document.createElement('div');
    homeBox.id = 'homes';
    homeBox.classList.add('mdl-cell mdl-cell--1-col button-size');

    const homeButton = document.createElement('button');
    homeButton.classList.add('mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect');

    const homeIcon = document.createElement('i');
    homeIcon.classList.add('material-icons');
    homeIcon.textContent = 'home';

    homeButton.appendChild(homeIcon);
    homeBox.appendChild(homeButton);

    // input
    const inputBox = document.createElement('div');
    inputBox.classList.add('mdl-cell mdl-cell--6-col omnibox-size');
    
    const inputTag = document.createElement('input');
    inputTag.id = 'omnibox1';
    inputTag.classList.add('mdl-textfield__input');
    inputTag.type = 'text';

    inputBox.appendChild(inputTag);
    
    // bookmark button
    const bookmarkBox = document.createElement('div');
    bookmarkBox.id = 'fave';
    bookmarkBox.classList.add('mdl-cell mdl-cell--1-col button-size');

    const bookmarkButton = document.createElement('button');
    bookmarkButton.classList.add('mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect');

    const bookmarkIcon = document.createElement('i');
    bookmarkIcon.classList.add('material-icons');
    bookmarkIcon.textContent = 'bookmark';

    bookmarkButton.appendChild(bookmarkIcon);
    bookmarkBox.appendChild(bookmarkButton);

    // other box
    const otherBox = document.createElement('div');
    otherBox.classList.add('mdl-cell mdl-cell--1-col button-size');
    
    const morevertButton = document.createElement('button');
    morevertButton.id = 'hdrbtn';
    morevertButton.classList.add('mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon');

    const morevertIcon = document.createElement('i');
    morevertIcon.classList.add('material-icons');
    morevertIcon.textContent = 'more_vert';

    const ulBox = document.createElement('ul');
    ulBox.classList.add('mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right');
    ulBox.for = 'hdrbtn';

    const devtoolButton = document.createElement('li');
    devtoolButton.classList.add('mdl-menu__item');
    devtoolButton.id = 'console'
    devtoolButton.textContent = 'DevTools';

    const bookButton = document.createElement('li');
    bookButton.classList.add('mdl-menu__item');
    bookButton.id = 'list'
    bookButton.textContent = 'Bookmarks';

    ulBox.appendChild(devtoolButton);
    ulBox.appendChild(bookButton);
    morevertButton.appendChild(morevertIcon);
    otherBox.appendChild(morevertButton);
    otherBox.appendChild(ulBox);

    // append to webview
    webviewHeader.appendChild(leftArrowBox);
    webviewHeader.appendChild(rightArrowBox);
    webviewHeader.appendChild(refreshBox);
    webviewHeader.appendChild(homeBox);
    webviewHeader.appendChild(inputBox);
    webviewHeader.appendChild(bookmarkBox);
    webviewHeader.appendChild(otherBox);

    // append to main
    mainBox.appendChild(webviewHeader);

    
    const newWebviewBox = document.createElement('div');
    newWebviewBox.id = 'views';
    newWebviewBox.classList.add('page-content');

    const newWebviewTag = document.createElement('webview');
    newWebviewTag.id = 'view';
    newWebviewTag.classList.add('page');
    newWebviewTag.src = 'https://www.google.com/';
    newWebviewTag.autosize = 'on';

    newWebviewBox.appendChild(newWebviewTag);
    
    const webviewsContainer = document.getElementById('webviews');
    webviewsContainer.appendChild(newWebviewBox);

    newWebviewBox.before(mainBox);
    
    const tabContent = document.createElement('div');
    tabContent.id = tabId;
    tabContent.classList.add('tab-content');
    tabContent.appendChild(mainBox);
    tabContent.appendChild(newWebviewBox);
    document.getElementById('webviews').appendChild(tabContent);

    // newWebviewBox.id = webviewId;



    // append to document


    activateTab(tabId);
}

// close tab
function closeTab(tabId, tabElement, webviewId) {
    const tabContent = document.getElementById(tabId);
    const webviewContent = document.getElementById(webviewId);

    // Remove the webview and its associated tab
    if (webviewContent) {
        webviewContent.remove();
    }
    if (tabElement) {
        tabElement.remove();
    }

    // If the closed tab was active, activate the first tab if it exists
    if (tabContent && tabContent.classList.contains('active')) {
        const firstTab = document.querySelector('.tab');
        if (firstTab) {
            firstTab.click();
        }
    }
}

// activate tab
function activateTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    const activeTab = [...document.querySelectorAll('.tab')].find(t => t.dataset.target === tabId);
    activeTab.classList.add('active');
}

//Navigation Functions
function reloadView () {
    view.reload();
}

function backView () {
    view.goBack();
}

function forwardView () {
    view.goForward();
}

function homeView () {
    view.loadURL('https://www.google.com/');
}


//Load URL from the textbox
function updateURL (event) {
    if (event.keyCode === 13) {
        omni.blur();
        let val = omni.value;
        let https = val.slice(0, 8).toLowerCase();
        let http = val.slice(0, 7).toLowerCase();
        if (https === 'https://') {
            view.loadURL(val);

        } else if (http === 'http://') {
            view.loadURL(val);
        } else {
            view.loadURL('http://'+ val);
        }
    }
}


//Loading Status
function loadstart (event) {
    omni.value = "  Loading...";
    omni.style.backgroundColor = "#fff";
}

//Show URL of the web page
function updateNav (event) {
    omni.value = "  " + view.src;
}

//Load DevTools
function handleDevtools () {

    if (view.isDevToolsOpened()) {
        view.closeDevTools();
    } else {
        view.openDevTools();
    }
}

//Add a bookmark
var Bookmark = function (id, url, faviconUrl, title) {
    this.id = id;
    this.url = url;
    this.icon = faviconUrl;
    this.title = title;
}

function addBookmark () {
    let url = view.src;
    let title = view.getTitle();
    let fav1 = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + url
    let booktag = new Bookmark(uuid.v1(), url, fav1, title);
    jsonfile.readFile(bookmarks, function(err, books) {
        books.push(booktag);
        jsonfile.writeFile(bookmarks, books, function (err) {

        });
    });

}

//Go to Bookmarks page
function gotoBookmarks () {
    view.loadURL(bookmarkspage);
}

//Load Tirex game when failed to load
function gotoGame () {
    view.loadURL(tirexGame);
}

//Event Listeners
refresh.addEventListener('click', reloadView);
back.addEventListener('click', backView);
forward.addEventListener('click', forwardView);
omni.addEventListener('keydown', updateURL);
view.addEventListener('did-start-loading', loadstart)
view.addEventListener('did-finish-load', updateNav);
view.addEventListener('did-fail-load', gotoGame);
homes.addEventListener('click', homeView);
fave.addEventListener('click', addBookmark);
list.addEventListener('click', gotoBookmarks);
dev.addEventListener('click', handleDevtools);

