const searchInput = document.querySelector("input[type='text']");
const checkboxes = document.querySelectorAll(".filter-checkbox");


function renderCards(query='', selectedFilters=[]) {
    const container = document.getElementById('results-container');
    container.innerHTML = "";

    const data = window.fundraiserData || [];

    const filtered = data.filter(item => {
        const content = `${item.title} ${item.location} ${item.categories.join(" ")} ${item.deadline}`.toLowerCase();
        const matchesSearch = content.includes(query.toLowerCase());

        const itemCategories = item.categories.map(cat => cat.toLowerCase());
        const matchesFilter = selectedFilters.length == 0 || selectedFilters.some(filter => itemCategories.includes(filter.toLowerCase()));

        return matchesSearch && matchesFilter;
    });

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-category", item.categories.join(", "));

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>Location: ${item.location}</p>
            <p>Category: ${item.categories.join(", ")}</p>
            <p>Deadline: ${item.deadline}</p>
            <a href="${item.link}" target="_blank"><button>Apply Now</button></a>
            `;

        container.appendChild(card);
    });

}

function getSelectedFilters() {
    return Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value)
}


checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
        const query = searchInput.value;
        const filters = getSelectedFilters();
        renderCards(query, filters);
    });
})

searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    const filters = getSelectedFilters();
    renderCards(query, filters);
});


// renderCards();