let saldo = 0;
let receitas = 0;
let despesas = 0;
let transacoes = [];

let pieChart;
let lineChart;

window.onload = function () {
  showLogin();
};

/* LOGIN / CADASTRO */

function login() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("appPage").classList.remove("hidden");
  showPage("dashboard");
}

function cadastrar() {
  const senha = document.getElementById("cadSenha").value;

  if (senha.length < 8) {
    alert("Senha mínima 8 caracteres");
    return;
  }

  alert("Conta criada!");
  showLogin();
}

function showCadastro() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("cadastroPage").style.display = "flex";
}

function showLogin() {
  document.getElementById("cadastroPage").style.display = "none";
  document.getElementById("loginPage").style.display = "flex";
}

/* NAVEGAÇÃO */

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

/* ================================================
   MODAL
   ================================================
 */

function openModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
}
/* TRANSAÇÃO */

function addTransacao() {

  const tipo = document.getElementById("tipo").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const categoria = document.getElementById("categoria").value;

  if (!valor || valor <= 0) {
    alert("Valor inválido");
    return;
  }

  transacoes.push({ tipo, valor, categoria });

  if (tipo === "receita") {
    receitas += valor;
    saldo += valor;
  } else {
    despesas += valor;
    saldo -= valor;
  }

  atualizar();
  atualizarLista();
  atualizarGraficos();

  closeModal();

  document.getElementById("valor").value = "";
  document.getElementById("categoria").value = "";
}

/* DASHBOARD */

function atualizar() {
  document.getElementById("saldo").innerText = `R$ ${saldo.toFixed(2)}`;
  document.getElementById("receitas").innerText = `R$ ${receitas.toFixed(2)}`;
  document.getElementById("despesas").innerText = `R$ ${despesas.toFixed(2)}`;
}

/* LISTA */

function atualizarLista() {
  const container = document.getElementById("listaTransacoes");
  container.innerHTML = "";

  transacoes.forEach((t, i) => {
    const item = document.createElement("div");
    item.classList.add("item", t.tipo);

    item.innerHTML = `
      <span>${i + 1}. ${t.categoria}</span>
      <strong>R$ ${t.valor.toFixed(2)}</strong>
    `;

    container.appendChild(item);
  });
}

/* GRÁFICOS */

function atualizarGraficos() {
  const charts = document.querySelector(".charts");

  if (receitas === 0 && despesas === 0) {
    charts.classList.add("hidden");
    return;
  }

  charts.classList.remove("hidden");

  if (pieChart) pieChart.destroy();
  if (lineChart) lineChart.destroy();

  pieChart = new Chart(document.getElementById("chartPie"), {
    type: "doughnut",
    data: {
      labels: ["Receitas", "Despesas"],
      datasets: [{
        data: [receitas, despesas],
        backgroundColor: ["#2563eb", "#ef4444"]
      }]
    }
  });

  lineChart = new Chart(document.getElementById("chartLine"), {
    type: "line",
    data: {
      labels: transacoes.map((_, i) => i + 1),
      datasets: [{
        data: transacoes.map(t => t.tipo === "receita" ? t.valor : -t.valor),
        borderColor: "#2563eb"
      }]
    }
  });
}

/* FOOTER */

function openFAQ() {
  alert("Use 'Nova Transação' para adicionar dados e construir graficos avançados.");
}

function avaliar() {
  const nota = prompt("Como vc avalia o PLANEJA+ ?");
  if (nota) alert("Obrigado!");
}

/* LOGOUT */

function logout() {
  location.reload();
}
/* PIX */

function openPix() {
  document.getElementById("modalPix").classList.remove("hidden");
}

function closePix() {
  document.getElementById("modalPix").classList.add("hidden");
}

/*  CARTÃO */

function openCartao() {
  document.getElementById("modalCartao").classList.remove("hidden");
}

function closeCartao() {
  document.getElementById("modalCartao").classList.add("hidden");
}

function pagarCartao() {
  alert("Pagamento realizado com sucesso!");
  closeCartao();
}