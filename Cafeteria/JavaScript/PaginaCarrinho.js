import { getCarrinho, salvarCarrinho } from "./carrinho.js";
import { navegar } from "./main.js";

export function renderCarrinho(root) {
  const carrinho = getCarrinho();

  root.innerHTML = `
    <header class="d-flex justify-content-between align-items-center p-3 bg-dark border-bottom">
      <button id="btn-voltar" class="btn btn-link text-white h5 mb-0 text-decoration-none">← Voltar</button>
      <h1 class="h4 mb-0 text-white">Carrinho</h1>
      <div></div>
    </header>
    <div class="container my-4" id="conteudo-carrinho"></div>
  `;

  document.body.style.background = "linear-gradient(180deg, #f3e5ab, #f3e5ab)";

  const conteudo = document.getElementById("conteudo-carrinho");

  document.getElementById("btn-voltar").addEventListener("click", () => {
    navegar("home");
  });

  if (carrinho.length === 0) {
    conteudo.innerHTML = `<p class="text-center mt-4">Seu carrinho está vazio 😢</p>`;
    return;
  }

  const lista = document.createElement("div");
  lista.classList.add("list-group", "mb-4");

  carrinho.forEach((item, index) => {
    const elemento = document.createElement("div");
    elemento.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    elemento.innerHTML = `
      <div>
        <h5 class="mb-1">${item.titulo}</h5>
        <small>R$ ${item.preco.toFixed(2)}</small>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary" data-acao="menos" data-index="${index}">−</button>
        <span>${item.quantidade}</span>
        <button class="btn btn-sm btn-outline-secondary" data-acao="mais" data-index="${index}">+</button>
      </div>
    `;

    lista.appendChild(elemento);
  });

  conteudo.appendChild(lista);

  const total = carrinho.reduce((t, item) => t + item.preco * item.quantidade, 0);

  const resumo = document.createElement("div");
  resumo.classList.add("text-center");
  resumo.innerHTML = `
    <h5>Total: R$ ${total.toFixed(2)}</h5>
    <button id="btn-finalizar" class="btn btn-dark mt-3">Finalizar Compra</button>
  `;
  conteudo.appendChild(resumo);

  document.getElementById("btn-finalizar").addEventListener("click", () => {
    navegar("finalizar");
  });

  conteudo.querySelectorAll("button").forEach(btn => {
    const acao = btn.dataset.acao;
    if (!acao) return;

    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;

      if (acao === "mais") carrinho[index].quantidade++;
      if (acao === "menos") carrinho[index].quantidade--;

      if (carrinho[index].quantidade <= 0) carrinho.splice(index, 1);

      salvarCarrinho(carrinho);
      renderCarrinho(root);
    });
  });
}
