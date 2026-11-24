const userEmail = sessionStorage.getItem("narniaUserEmail");

if (!userEmail) {
    window.location.replace("Login.html");
} else {
    const userName = userEmail.split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (letter) => letter.toLocaleUpperCase("pt-BR"));
    const userInitials = userName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("");

    document.getElementById("userName").textContent = userName;
    document.getElementById("userEmail").textContent = userEmail;
    document.getElementById("userInitials").textContent = userInitials || "U";
}

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function () {
    sessionStorage.removeItem("narniaUserEmail");
    window.location.href = "Login.html";
});

const searchInput = document.getElementById("bookSearch");
const bookRows = Array.from(document.querySelectorAll("#booksTable tr"));
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

function filterBooks() {
    const query = normalizeText(searchInput.value.trim());
    let visibleBooks = 0;

    bookRows.forEach((row) => {
        const matches = normalizeText(row.textContent).includes(query);
        row.hidden = !matches;
        if (matches) {
            visibleBooks += 1;
        }
    });

    resultsCount.textContent = `${visibleBooks} ${visibleBooks === 1 ? "livro encontrado" : "livros encontrados"}`;
    emptyState.hidden = visibleBooks > 0;
}

searchInput.addEventListener("input", filterBooks);
filterBooks();
