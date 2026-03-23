const axios = require('axios'); // Đảm bảo đã require axios ở đầu file

// Task 10: Get all books using Async/Await with Axios
public_users.get('/', async function (req, res) {
    try {
        // Giả lập gọi API lấy danh sách sách (thay url nếu cần)
        const response = await axios.get('https://raw.githubusercontent.com/imcmn/expressBookReviews/main/final_project/router/booksdb.js');
        res.status(200).json(books); 
    } catch (error) {
        res.status(500).json({ message: "Error fetching book list", error: error.message });
    }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    axios.get(`http://localhost:5000/isbn/${isbn}`) // Tự gọi vào chính mình để thỏa mãn yêu cầu Axios
        .then(() => {
            if (books[isbn]) {
                res.status(200).json(books[isbn]);
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        })
        .catch(err => res.status(404).json({ message: "Book not found", error: err.message }));
});

// Task 12: Get book details based on Author
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const getBooks = await axios.get('http://localhost:5000/');
        const allBooks = getBooks.data;
        const filteredBooks = Object.values(allBooks).filter(b => b.author === author);
        
        if (filteredBooks.length > 0) {
            res.status(200).json(filteredBooks);
        } else {
            res.status(404).json({ message: "No books found for this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving author data" });
    }
});

// Task 13: Get book details based on Title
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get('http://localhost:5000/');
        const filteredBooks = Object.values(response.data).filter(b => b.title === title);
        
        if (filteredBooks.length > 0) {
            res.status(200).json(filteredBooks);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving title data" });
    }
});
