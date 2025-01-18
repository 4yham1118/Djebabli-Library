import { fetchLibrary } from "./book.js";

document.addEventListener("DOMContentLoaded", async () => {
    const bookList = document.getElementById("book-list");

    // Ensure the book list element exists
    if (!bookList) {
        console.error("Error: #book-list element not found in the DOM.");
        return;
    }

    try {
        // Fetch library data
        const library = await fetchLibrary();

        // Populate books in the list
        library.forEach((book) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card"); // Style class
            bookCard.innerHTML = `
                <img src="Media/Book Covers/${book.nom_livre.toLowerCase().replace(/\s+/g, "_")}.jpg" alt="${book.nom_livre}">
                <p><strong>Nom du livre:</strong> ${book.nom_livre}</p>
                <p><strong>Nom de l'auteur:</strong> ${book.Nom_auteur}</p>
                <p><strong>Date de publication:</strong> ${book.date_publication}</p>
                <p class="reservation-info" data-book="${book.nom_livre}"></p>
                <p class="countdown" data-book="${book.nom_livre}"></p>
                <button class="reserve-btn" data-book="${book.nom_livre}">Réserver</button>
            `;
            bookList.appendChild(bookCard);
        });
    } catch (error) {
        console.error("Error fetching the library data:", error);
    }

    const reserveButtons = document.querySelectorAll(".reserve-btn");
    const modal = document.getElementById("reservationModal");
    const closeModal = modal.querySelector(".close");
    const form = document.getElementById("reservationForm");

    // Load reservations from localStorage
    const reservations = JSON.parse(localStorage.getItem("reservations")) || {};

    // Update the UI to reflect reservation status
    const updateUI = () => {
        reserveButtons.forEach((btn) => {
            const bookName = btn.getAttribute("data-book");
            const reservationInfo = document.querySelector(`.reservation-info[data-book="${bookName}"]`);
            const countdown = document.querySelector(`.countdown[data-book="${bookName}"]`);

            if (reservations[bookName]) {
                const { name, email, duration, reservedAt } = reservations[bookName];
                const remainingDays = calculateRemainingDays(reservedAt, duration);

                if (remainingDays > 0) {
                    reservationInfo.innerHTML = `<strong> Réservé par: </strong> <br> ${name} <br><br> <strong> Email: </strong> ${email}`;
                    countdown.textContent = `Durée restante: ${remainingDays} jours`;
                    btn.style.display = "none";
                } else {
                    delete reservations[bookName];
                    localStorage.setItem("reservations", JSON.stringify(reservations));
                    reservationInfo.textContent = "";
                    countdown.textContent = "Disponible pour réservation";
                    btn.style.display = "inline-block";
                }
            } else {
                reservationInfo.textContent = "";
                countdown.textContent = "Disponible pour réservation";
                btn.style.display = "inline-block";
            }
        });
    };

    // Calculate remaining days for reservation
    const calculateRemainingDays = (reservedAt, duration) => {
        const now = new Date();
        const reservedDate = new Date(reservedAt);
        const expirationDate = new Date(reservedDate);
        expirationDate.setDate(reservedDate.getDate() + parseInt(duration, 10));
        const diffTime = expirationDate - now;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Open the modal when a reserve button is clicked
    reserveButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const bookName = btn.getAttribute("data-book");
            form.dataset.book = bookName; // Store book name in form dataset
            modal.style.display = "flex";
        });
    });

    // Close the modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = form.name.value;
        const email = form.email.value;
        const duration = form.duration.value;
        const bookName = form.dataset.book;

        if (!reservations[bookName]) {
            reservations[bookName] = {
                name,
                email,
                duration,
                reservedAt: new Date().toISOString(),
            };
            localStorage.setItem("reservations", JSON.stringify(reservations));
            alert(`Livre réservé: ${bookName}\nNom: ${name}\nEmail: ${email}\nDurée: ${duration} jours`);
        } else {
            alert(`Le livre "${bookName}" est déjà réservé.`);
        }

        // Close the modal, reset form, and update UI
        modal.style.display = "none";
        form.reset();
        updateUI();
    });

    // Update UI every second for countdown
    setInterval(updateUI, 1000);

    updateUI();
});
