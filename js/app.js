//Searh button click

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', ()=>{
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value
    searchField.value = "";
    if(searchText === ''){
        alert("Please insert search text");

    }
    else{
        loadBook(searchText);
    }
});


//load Book data
const loadBook = (searchText) => {
    fetch('https://openlibrary.org/search.json?q=' + searchText)
        .then(res => res.json())
        .then(books => displayBook(books.docs));
}

const displayBook = books => {
    const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
    
 //Result count and show total
    if (books.length > 0) {
        const h1 = document.createElement('h1');
        h1.classList.add('col-12');
        h1.classList.add('text-center');
        h1.classList.add('text-success');
        h1.innerHTML = `Total Search Result Found : ${books.length}`;
        searchResult.appendChild(h1);
    }
    else{
        const h1 = document.createElement('h1');
        h1.classList.add('col-12');
        h1.classList.add('text-center');
        h1.classList.add('text-danger');
        h1.innerHTML = `No result found`;
        searchResult.appendChild(h1);
    }
//Display Search Result
    books.forEach(book => {
        let authoreName = "";
        if(book.author_name){
            authoreName = "Author : " + book.author_name[0]
        }
        else{
            authoreName = "Author : Unknown"
        }

        let publisher = "";
        if(book.publisher){
            publisher = "Publisher : " + book.publisher[0]
        }
        else{
            publisher = "Publisher : Unknown"
        }
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.classList.add('mb-4');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="${book.title}" height="200" width="180">
            <div id="card-body" class="card-body">
                <h3 class="card-title">${book.title}</h3>
                <h6>${authoreName}<h6>
                <p>1st Published : ${book.first_publish_year}</p>
                <p>${publisher}</p>
            </div>
        </div>
        `;
        
        searchResult.appendChild(div);
    })
    
}

