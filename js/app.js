function showContent(type) {
  const cards = document.querySelectorAll(".card-spek");
  cards.forEach((card) => card.classList.remove("active"));

  const selectedCard = document.querySelector(`.${type}-specifications`);
  selectedCard.classList.add("active");

  const links = document.querySelectorAll(".dropdown-content a");
  links.forEach((link) => link.classList.remove("active"));

  const activeLink = document.getElementById(`${type}-specifications`);
  activeLink.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  showContent("exterior");

  //==== SEARCH FUNCTION=====//
  // Show search input on click
  const searchIcon = document.getElementById("search-icon");
  const searchInput = document.getElementById("search-input");

  searchIcon.addEventListener("click", function (e) {
    e.preventDefault();
    if (searchInput.style.display === "none" || searchInput.style.display === "") {
      searchInput.style.display = "inline-block";
      searchInput.focus();
    } else {
      searchInput.style.display = "none";
    }
    const query = searchInput.value.toLowerCase();
    searchContent(query);
    searchInput.value = "";
  });

  // Search functionality
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const query = searchInput.value.toLowerCase();
      searchContent(query);
    }
  });

  function searchContent(query) {
    const sections = document.querySelectorAll("main section, main article");
    sections.forEach((section) => {
      section.style.display = "none";
      if (section.innerText.toLowerCase().includes(query)) {
        section.style.display = "block";
      }
    });
  }

  //=====FORM FUNCTION=======//
  // event change type cars select
  const carTypeSelect = document.getElementById("cars-type");
  const priceInput = document.getElementById("price");

  const carPrices = {
    "S HV Type with GR Parts Aero Package": 440600000,
    "S Type with GR Parts Aero Package": 410900000,
    "G type": 353900000,
  };

  carTypeSelect.addEventListener("change", function () {
    const selectedCarType = carTypeSelect.value;
    const price = carPrices[selectedCarType] || 0;
    priceInput.value = price === 0 ? "" : formatRupiah(price);
  });

  function formatRupiah(number) {
    return "Rp" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // validasi submit
  const form = document.getElementById("order");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const actionUrl = form.getAttribute("action");

    try {
      const response = await fetch(actionUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Submission successful!");
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("Submission failed. Please check your network connection and try again.");
    }

    setTimeout(function () {
      window.location.href = "index.html";
    }, 500);
  });
});
