const CARRINHO_KEY = "carrinho";

export function getCarrinho() {
  return JSON.parse(localStorage.getItem(CARRINHO_KEY)) || [];
}

export function salvarCarrinho(carrinho) {
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
}

export function adicionarAoCarrinho(cafe) {
  const carrinho = getCarrinho();
  const existente = carrinho.find(item => item.id === cafe.id);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({ ...cafe, quantidade: 1 });
  }

  salvarCarrinho(carrinho);
  atualizarContadorCarrinho();
}

export function getQuantidadeCarrinho() {
  return getCarrinho().reduce((soma, item) => soma + item.quantidade, 0);
}

export function atualizarContadorCarrinho() {
  const contador = document.getElementById("cart-count");
  if (contador) contador.textContent = getQuantidadeCarrinho();
}
