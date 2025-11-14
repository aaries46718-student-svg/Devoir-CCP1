document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".card").forEach((card) => {
    if (!card.querySelector(".toggle-btn") && !card.classList.contains("reserved")) {
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = "Masquer";
      toggleBtn.classList.add("toggle-btn");
      card.appendChild(toggleBtn);

      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isHidden = card.classList.toggle("hidden");
        toggleBtn.textContent = isHidden ? "Afficher" : "Masquer";
      });
    }
  });

  const navLinks = document.querySelectorAll(".nav a");
  const articles = document.querySelectorAll(".card");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const selected = link.textContent.trim().toLowerCase();

      if (selected === "à la une") {
        articles.forEach((a) => (a.style.display = "block"));
        return;
      }

      articles.forEach((article) => {
        const category = article.querySelector(".category")?.textContent.trim().toLowerCase();
        article.style.display = category === selected ? "block" : "none";
      });
    });
  });

  const cards = document.querySelectorAll(".card:not(.reserved)");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const category = card.querySelector(".category")?.textContent || "";
      const title = card.querySelector("h3")?.textContent || "";
      const imgSrc = card.querySelector("img")?.getAttribute("src") || "";

      localStorage.setItem("articleData", JSON.stringify({ category, title, imgSrc }));
      window.location.href = "detail.html";
    });
  });

  const welcomeMessage = document.getElementById("welcomeMessage");
  const userButton = document.getElementById("userButton");

  if (welcomeMessage && userButton) {
    const urlParams = new URLSearchParams(window.location.search); //test
    const userName = urlParams.get('user');

    if (userName) {
      welcomeMessage.textContent = "Bonjour " + userName;
      userButton.textContent = "Bonjour " + userName;
      userButton.style.backgroundColor = "#ffd900";
      userButton.style.cursor = "default";
      
      userButton.onclick = (e) => {
        e.preventDefault();
        alert("Déjà connecté en tant que " + userName);
      };
    } else {
      welcomeMessage.textContent = "Bonjour";
      userButton.textContent = "Se connecter";
      
      userButton.onclick = (e) => {
        e.preventDefault();
        window.location.href = "connexion.html";
      };
    }
  }

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const errorMessage = document.getElementById("error");

  if (loginForm && usernameInput && errorMessage) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const username = usernameInput.value.trim();

      if (username === "") {
        errorMessage.style.display = "block";
        usernameInput.focus();
        return;
      }

      window.location.href = "index.html?user=" + encodeURIComponent(username);
    });

    usernameInput.addEventListener("input", () => {
      errorMessage.style.display = "none";
    });
  }
});