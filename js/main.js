document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
    siteName = document.getElementById('siteName').value;
    siteURL = document.getElementById('siteURL').value;
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteURL || !siteURL){
        alert('Please Enter The Field Values!..');
        return false;
    }

    if(!siteURL.match(regex)){
        alert('Please Enter Right Site URL');
        document.getElementById('siteUrl').focus();
        return flase;
    }
    var bookmark = {
        name : siteName,
        value : siteURL
    }

    if(localStorage.getItem('bookmarks') === null){
        // init array
        var bookmarks = [];
        // add the item to Array
        bookmarks.push(bookmark);
        // add the Array to LocalStorage as String 
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else{
        // get The value from Localstorage as Json
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add the item to the Json
        bookmarks.push(bookmark);
        // re-set the Locatstorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    e.preventDefault();
    fetchBookmarks();
}



function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);
    var bookmarksResult = document.getElementById('bookmarksResult');
    bookmarksResult.innerHTML = '';

    for(var i=0; i< bookmarks.length ; i++){
        var name = bookmarks[i].name;
        var value = bookmarks[i].value;

        bookmarksResult.innerHTML += '<div class="well">' +
                                     '<h3>'+ name + '</h3>' +
                                     '<a class="btn btn-primary" target="_blank" href="'+ value +'">' +
                                     'Visit' + 
                                     '</a>' +
                                     ' <a class="btn btn-danger" onclick="deleteBookark(\''+value+'\')" href="#">' +
                                     'Delete' + 
                                     '</a>'
                                     '</div>';
    }
    
}

function deleteBookark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0; i<bookmarks.length ; i++){
        if(bookmarks[i].value == url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}