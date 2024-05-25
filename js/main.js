document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav ul li a");
  const content = document.getElementById("content");

  function loadPage(page) {
    const url = `${page}.html`;
    const cssUrl = `css/${page}.css`;

    fetch(url)
      .then(response => response.text())
      .then(data => {
        content.innerHTML = data;

        // Удалить все динамически добавленные CSS файлы
        document.querySelectorAll("link[rel=stylesheet][data-dynamic]").forEach(link => link.remove());

        // Добавить новый CSS файл
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssUrl;
        link.setAttribute("data-dynamic", "true");
        document.head.appendChild(link);
      })
      .catch(error => console.error("Error loading page:", error));
  }

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const page = this.getAttribute("data-page");
      loadPage(page);
    });
  });

  // Load initial page
  loadPage("home");
});
