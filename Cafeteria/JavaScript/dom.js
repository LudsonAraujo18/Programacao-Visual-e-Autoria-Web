import { adicionarAoCarrinho, getQuantidadeCarrinho } from "./carrinho.js";
import { navegar } from "./main.js";

export function renderHeader(root) {
  const header = document.createElement("header");
  header.className = "navbar navbar-dark bg-dark px-3";

  header.innerHTML = `
    <a class="navbar-brand text-light fw-bold" href="#" id="btn-home">☕ Cafeteria Araújo ☕</a>

    <button class="btn btn-outline-light position-relative" id="cart-btn">
      🛒
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-count">
        ${getQuantidadeCarrinho()}
      </span>
    </button>
  `;

  document.body.style.background = "linear-gradient(180deg, #f3e5ab, #f3e5ab)";

  header.querySelector("#btn-home").addEventListener("click", () => {
    navegar("home");
  });


  header.querySelector("#cart-btn").addEventListener("click", () => {
    navegar("carrinho");
  });

  root.appendChild(header);
}

export function renderCafes(root, cafes) {
  const container = document.createElement("div");
  container.className = "container my-4";

  const row = document.createElement("div");
  row.className = "row g-4";

  cafes.forEach(cafe => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${cafe.imagem}" class="card-img-top" alt="${cafe.titulo}">
        <div class="card-body">
          <h5 class="card-title">${cafe.titulo}</h5>
          <p class="card-text">${cafe.descricao}</p>
          <p class="text-muted"><em>${cafe.ingredientes.join(", ")}</em></p>
          <p class="fw-bold">R$ ${cafe.preco.toFixed(2)}</p>
          <button class="btn btn-dark w-100">Adicionar ao carrinho</button>
        </div>
      </div>
    `;

    col.querySelector("button").addEventListener("click", () => {
      adicionarAoCarrinho(cafe);
    });

    row.appendChild(col);
  });

  container.appendChild(row);
  root.appendChild(container);
}
