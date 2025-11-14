import { renderCafes, renderHeader } from "./dom.js";
import { renderCarrinho } from "./paginaCarrinho.js";
import { atualizarContadorCarrinho } from "./carrinho.js";
import { renderFinalizacao } from "./PaginaFinalizacao.js";

let paginaAtual = "home";

async function carregarCafes() {
  const resposta = await fetch("http://localhost:3000/cafes");
  return await resposta.json();
}

export function navegar(para) {
  paginaAtual = para;
  iniciar();
}

async function iniciar() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  renderHeader(root);

  if (paginaAtual === "home") {
    const cafes = await carregarCafes();
    renderCafes(root, cafes);
  }

  if (paginaAtual === "carrinho") {
    renderCarrinho(root);
  }

  if (paginaAtual === "finalizar") {
    renderFinalizacao(root);
  }

  atualizarContadorCarrinho();
}

document.addEventListener("DOMContentLoaded", iniciar);
