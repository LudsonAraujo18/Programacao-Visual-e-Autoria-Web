import { getCarrinho, salvarCarrinho } from "./carrinho.js";
import { navegar } from "./main.js";

export function renderFinalizacao(root) {
  const carrinho = getCarrinho();
  const total = carrinho.reduce((t, item) => t + item.preco * item.quantidade, 0);

  root.innerHTML = `
    <div class="container mt-4">

      <h2 class="text-center mb-4">Finalização da Compra</h2>

      <!-- Resumo dos itens -->
      <div class="card p-4 shadow-sm mb-4">
        <h4>Resumo do Pedido</h4>
        <ul class="list-group my-3">
          ${carrinho.map(item => `
            <li class="list-group-item d-flex justify-content-between">
              <span>${item.titulo} (x${item.quantidade})</span>
              <strong>R$ ${(item.preco * item.quantidade).toFixed(2)}</strong>
            </li>
          `).join("")}
        </ul>
        <h4 class="text-end">Total: R$ ${total.toFixed(2)}</h4>
      </div>

      <!-- Formulário -->
      <div class="card p-4 shadow-sm">
        <h4>Informações de Entrega</h4>

        <label class="mt-3">Endereço de entrega:</label>
        <input type="text" id="endereco" class="form-control" placeholder="Rua, número, bairro">

        <label class="mt-3">Método de pagamento:</label>
        <select id="pagamento" class="form-control">
          <option value="">Selecione...</option>
          <option value="Cartão de Crédito">Cartão de Crédito</option>
          <option value="Boleto">Boleto</option>
          <option value="PIX">PIX</option>
        </select>

        <button id="btn-finalizar" class="btn btn-success w-100 mt-4">Finalizar Compra</button>
        <button id="btn-voltar" class="btn btn-secondary w-100 mt-3">Voltar</button>
      </div>

    </div>
  `;

  document.getElementById("btn-finalizar").addEventListener("click", () => {
    const endereco = document.getElementById("endereco").value.trim();
    const pagamento = document.getElementById("pagamento").value;

    if (endereco.length < 5) {
      alert("⚠ Informe um endereço válido!");
      return;
    }

    if (pagamento === "") {
      alert("⚠ Selecione um método de pagamento!");
      return;
    }

    alert("🎉 Compra finalizada com sucesso!\nObrigado pela preferência.");

    salvarCarrinho([]);
    navegar("home");
  });

  document.getElementById("btn-voltar").addEventListener("click", () => {
    navegar("carrinho");
  });
}
