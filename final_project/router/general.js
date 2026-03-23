// 1. Get all books (Task 10)
public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve, reject) => {
      resolve(books);
    });
    const bookList = await getBooks;
    res.send(JSON.stringify(bookList, null, 4));
  } catch (error) {
    res.status(500).json({message: "Error fetching books"});
  }
});

// 2. Get book by ISBN (Task 11)
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) resolve(books[isbn]);
    else reject("Book not found");
  })
  .then(book => res.send(JSON.stringify(book, null, 4)))
  .catch(err => res.status(404).json({message: err}));
});

// 3. Get book by Author (Task 12)
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const booksByAuthor = await new Promise((resolve) => {
      let filtered = Object.values(books).filter(b => b.author === author);
      resolve(filtered);
    });
    res.send(JSON.stringify(booksByAuthor, null, 4));
  } catch (error) {
    res.status(404).json({message: "Author not found"});
  }
});

// 4. Get book by Title (Task 13)
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  new Promise((resolve) => {
    let filtered = Object.values(books).filter(b => b.title === title);
    resolve(filtered);
  })
  .then(result => res.send(JSON.stringify(result, null, 4)));
});
