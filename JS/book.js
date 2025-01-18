// c'est la bibliothèque de livres
const getBooks = () => {
    const storedBooks = localStorage.getItem("library");
    return storedBooks ? JSON.parse(storedBooks) : [
        {
            nom_livre: "Le petit prince",
            Nom_auteur: "Antoine de Saint-Exupéry",
            date_publication: "1945",
        },
        {
            nom_livre: "Nineteen Eighty-Four (1984)",
            Nom_auteur: "George Orwell",
            date_publication: "1949",
        },
        {
            nom_livre: "To Kill a Mockingbird",
            Nom_auteur: "Harper Lee",
            date_publication: "1960",
        },
        {
            nom_livre: "Pride and Prejudice",
            Nom_auteur: "Jane Austen",
            date_publication: "1813",
        },
        {
            nom_livre: "The Great Gatsby",
            Nom_auteur: "F. Scott Fitzgerald",
            date_publication: "1925",
        },
        {
            nom_livre: "Harry Potter and the Sorcerer's Stone",
            Nom_auteur: "J.K. Rowling",
            date_publication: "1997",
        },
        {
            nom_livre: "The Catcher in the Rye",
            Nom_auteur: "J.D. Salinger",
            date_publication: "1951",
        },
        {
            nom_livre: "The Hobbit",
            Nom_auteur: "J.R.R. Tolkien",
            date_publication: "1937",
        }
    ];
};

let books = getBooks();

// Enregistrer les livres dans le stockage local
const saveBooks = () => {
    localStorage.setItem("library", JSON.stringify(books));
};

// Ajouter un nouveau livre et l'enregistrer dans la bibliothèque
export const addBook = (title, author, year) => {
    books.push({ nom_livre: title, Nom_auteur: author, date_publication: year });
    saveBooks();
    console.log(`Book "${title}" has been added.`);
};

// Chercher la bibliothèque
export const fetchLibrary = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(books);
        }, 1000);
    });
};

// Gestionnaire DOMContentLoaded
document.addEventListener("DOMContentLoaded", async () => {
    const library = await fetchLibrary();
    console.log("Library fetched on page load:", library);
});
