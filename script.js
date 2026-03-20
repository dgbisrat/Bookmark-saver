  const addBookmarkBtn = document.querySelector('.add-btn');
  const bookmarkList = document.querySelector('.list-container');
  const bookmarkNameInput = document.querySelector('.bookmark-name');
  const bookmarkUrlInput = document.querySelector('.bookmark-url');

  document.addEventListener('DOMContentLoaded', loadBookmarks);

  addBookmarkBtn.addEventListener('click', function(){
    const name = bookmarkNameInput.value.trim();
    const url  = bookmarkUrlInput.value.trim();

    if(!name || !url){
      alert('You have to write BOTH name and URL!');
      return;
    }

    if(!url.startsWith('http://') && !url.startsWith('https://')){
      alert('Write a correct URL that begins http:// or https://!');
      return
    }

    addBookmark(name, url);
    saveBookmark(name,url);

    bookmarkNameInput.value = '';
    bookmarkUrlInput.value = '';
  });

  function addBookmark(name, url){
    const li = document.createElement('li');
    const link = document.createElement('a');

    link.href = url;
    link.textContent = name;
    link.target = '_blank';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    removeBtn.addEventListener('click', function(){
      bookmarkList.removeChild(li);
      removeBookmarkFromStorage(name, url);
    });

    li.appendChild(link);
    li.appendChild(removeBtn);

    bookmarkList.appendChild(li);
}

function getBookmarksFromStorage(name, url){
   const bookmarks= localStorage.getItem('bookmarks');
   return bookmarks ? JSON.parse(bookmarks) : [];
   /* if(bookmarks){
   Json.parse(bookmarks)
   } else{
    return []  ;
    }*/
}

function saveBookmark(name, url){
  const bookmarks = getBookmarksFromStorage();

  bookmarks.push(name, url);

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function loadBookmarks(){
  const bookmarks = getBookmarksFromStorage();
  bookmarks.forEach(bookmark => {
    addBookmark(bookmark.name, bookmark.url)
  });
}

function removeBookmarkFromStorage(name,url){
  let bookmarks = getBookmarksFromStorage();

  bookmarks = bookmarks.filter(bookmark =>  bookmark.name !== name || bookmark.url !== url);
  /* when this happen */

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
