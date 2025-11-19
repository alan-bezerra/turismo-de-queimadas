window.addEventListener('DOMContentLoaded', onInit)

function onInit() {
  toggleHeaderVisibilityOnScroll()
}

function toggleHeaderVisibilityOnScroll() {
  const header = document.querySelector('.header')
  let lastScrollTop = window.scrollY

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY
    if (currentScrollTop < lastScrollTop) {
      header.classList.remove('hidden')
    } else {
      header.classList.add('hidden')
    }
    lastScrollTop = currentScrollTop
  })
}

// Modal // 
let dadosDosLocais = {};
let imagensAtuais = [];
let indiceAtual = 0;
 
async function carregarDados(jsonUrl) {
 try {
    
  const response = await fetch(jsonUrl); 
  if (!response.ok) {
   throw new Error(`Erro HTTP: ${response.status} - ${jsonUrl}`);
  }
  dadosDosLocais = await response.json(); 
  console.log(`Dados de "${jsonUrl}" carregados!`);
} catch (error) {
  console.error("Não foi possível carregar os dados:", error);
}
}

document.addEventListener('DOMContentLoaded', async () => {
  
  const jsonUrl = document.body.dataset.jsonSource;
  
  if (!jsonUrl) {
    console.error("Atributo 'data-json-source' não encontrado no <body>!");
    return;
  }
  
 await carregarDados(jsonUrl);

 const modalOverlay = document.getElementById('modal-overlay');
 const modalClose = document.getElementById('modal-close');
 const modalImage = document.getElementById('modal-image');
 const modalTitle = document.getElementById('modal-title');
 const modalText = document.getElementById('modal-text');
 const modalPrev = document.getElementById('modal-prev');
 const modalNext = document.getElementById('modal-next');

 if (!modalOverlay || !modalClose || !modalImage || !modalTitle || !modalText || !modalPrev || !modalNext) {
  console.warn("Elementos do modal não encontrados.");
  return;
 }

 const linksDoModal = document.querySelectorAll('a[data-key]');

 linksDoModal.forEach(link => {
  link.addEventListener('click', (event) => {
   event.preventDefault();
   const localKey = link.dataset.key;
   const dadosDoLocal = dadosDosLocais[localKey];

   if (!dadosDoLocal) {
    console.error(`Dados não encontrados para a chave: ${localKey}`);
    return;
   }

   modalTitle.textContent = dadosDoLocal.titulo;
   imagensAtuais = dadosDoLocal.imagens;
   indiceAtual = 0;
   modalImage.src = imagensAtuais[indiceAtual];
   modalImage.alt = `Imagem de ${dadosDoLocal.titulo} (1 de ${imagensAtuais.length})`;

   if (imagensAtuais.length > 1) {
    modalPrev.style.display = 'block';
    modalNext.style.display = 'block';
   } else {
    modalPrev.style.display = 'none';
    modalNext.style.display = 'none';
   }

   modalText.innerHTML = '';
      
      if (dadosDoLocal.descricao) {
        dadosDoLocal.descricao.forEach(paragrafo => {
       const p = document.createElement('p');
       p.textContent = paragrafo;
       modalText.appendChild(p);
      });

      } else if (dadosDoLocal.endereco) {
        const pEndereco = document.createElement('p');
        pEndereco.innerHTML = `<strong>Endereço:</strong> ${dadosDoLocal.endereco}`;
        modalText.appendChild(pEndereco);
        
        const pContato = document.createElement('p');
        pContato.innerHTML = `<strong>Contato:</strong> ${dadosDoLocal.contato}`;
        modalText.appendChild(pContato);
      }
      

   modalOverlay.classList.add('active');
   document.body.classList.add('modal-aberto');
  });
 });
 
 function mostrarProximaImagem() {
  indiceAtual++;
  if (indiceAtual >= imagensAtuais.length) {
   indiceAtual = 0;
  }
  modalImage.src = imagensAtuais[indiceAtual];
  modalImage.alt = `Imagem de ${modalTitle.textContent} (${indiceAtual + 1} de ${imagensAtuais.length})`;
  modalImage.classList.remove('zoomed');
 }
 
 function mostrarImagemAnterior() {
  indiceAtual--;
  if (indiceAtual < 0) {
   indiceAtual = imagensAtuais.length - 1;
  }
  modalImage.src = imagensAtuais[indiceAtual];
  modalImage.alt = `Imagem de ${modalTitle.textContent} (${indiceAtual + 1} de ${imagensAtuais.length})`;
  modalImage.classList.remove('zoomed'); // Reseta zoom
 }

 modalNext.addEventListener('click', mostrarProximaImagem);
 modalPrev.addEventListener('click', mostrarImagemAnterior);

  modalImage.addEventListener('click', () => {
    modalImage.classList.toggle('zoomed');
  });

 const closeModal = () => {
  modalOverlay.classList.remove('active');
    modalImage.classList.remove('zoomed');
    document.body.classList.remove('modal-aberto');
 }

 modalClose.addEventListener('click', closeModal);
 modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
   closeModal();
  }
 });
});

/*logica do quiz*/

const questoes = [
  {
    questao: "Qual cidade do agreste paraibano é conhecida como “Cidade das Pedras”?",
    respostas: [
      { id: 1, texto: "João Pessoa", correta: false },
      { id: 2, texto: "Queimadas", correta: true },
      { id: 3, texto: "Campina Grande", correta: false },
      { id: 4, texto: "Patos", correta: false }
    ],
    gabarito: "Queimadas é chamada de “Cidade das Pedras” por suas diversas formações rochosas naturais, como a Pedra do Touro, Pedra da Caveira e outros afloramentos que são marcantes na paisagem local.",
  },
  {
    questao: "Qual pedra é conhecida pelas pinturas rupestres no alto da serra?",
    respostas: [
      { id: 1, texto: "Pedra do Sol", correta: false },
      { id: 2, texto: "Pedra da Onça", correta: false },
      { id: 3, texto: "Pedra do Touro", correta: true },
      { id: 4, texto: "Pedra das Sombras", correta: false }
    ],
    gabarito: "A Pedra do Touro é um sítio arqueológico com pinturas rupestres e uma grande rocha que lembra um touro, sendo um dos pontos mais altos da Serra da Bodopitá.",
  },
  {
    questao: "Qual serra de Queimadas é famosa pelas trilhas, altitude e vista panorâmica?",
    respostas: [
      { id: 1, texto: "Serra do Bodopitá", correta: true },
      { id: 2, texto: "Serra do Mulungu", correta: false },
      { id: 3, texto: "Serra do Araçá", correta: false },
      { id: 4, texto: "Serra da Gameleira", correta: false }
    ],
    gabarito: "A Serra do Bodopitá é um dos principais patrimônios naturais de Queimadas, conhecida pelas trilhas, altitude e vista panorâmica do agreste.",
  },
  {
    questao: "Qual formação rochosa lembra um crânio humano quando vista de longe?",
    respostas: [
      { id: 1, texto: "Pedra da Lua", correta: false },
      { id: 2, texto: "Pedra do Olho dÁgua", correta: false },
      { id: 3, texto: "Pedra do Riacho Seco", correta: false },
      { id: 4, texto: "Pedra da Caveira", correta: true }
    ],
    gabarito: "A Pedra da Caveira é famosa por sua formação que parece um crânio humano e por ser muito procurada para trilhas e rapel.",
  },
  {
    questao: "Qual pedra tem formato semelhante ao de um cão e funciona como mirante?",
    respostas: [
      { id: 1, texto: "Pedra da Gruta", correta: false },
      { id: 2, texto: "Pedra do Cachorro", correta: true },
      { id: 3, texto: "Pedra do Galo", correta: false },
      { id: 4, texto: "Pedra do Velho", correta: false }
    ],
    gabarito: "A Pedra do Cachorro possui formato que lembra um cão e funciona como mirante natural para fotos e contemplação.",
  },
  {
    questao: "Qual local no centro de Queimadas é conhecido por artesanato, feiras e produtos locais?",
    respostas: [
      { id: 1, texto: "Estação Cultural", correta: false },
      { id: 2, texto: "Feira do Sol", correta: false },
      { id: 3, texto: "Mercado Público", correta: true },
      { id: 4, texto: "Centro Comercial Serra Azul", correta: false }
    ],
    gabarito: "O Mercado Público reúne artesanato, produtos regionais e o cotidiano das feiras locais, sendo um ponto importante da cultura de Queimadas.",
  },
  {
    questao: "Qual igreja é considerada a matriz de Queimadas e sede da festa da padroeira?",
    respostas: [
      { id: 1, texto: "Paróquia Nossa Senhora da Guia", correta: true },
      { id: 2, texto: "Igreja São Pedro", correta: false },
      { id: 3, texto: "Paróquia Santa Luzia", correta: false },
      { id: 4, texto: "Igreja Sagrada Família", correta: false }
    ],
    gabarito: "A Paróquia Nossa Senhora da Guia é a igreja-matriz da cidade e sede da tradicional festa religiosa da padroeira.",
  },
  {
    questao: "Qual formação rochosa é composta por três pedras e conferem a Queimadas o apelido de “Cidade das Pedras”?",
    respostas: [
      { id: 1, texto: "Pedra do Triunfo", correta: false },
      { id: 2, texto: "Pedra dos Três Irmãos", correta: false },
      { id: 3, texto: "Pedra dos Profetas", correta: false },
      { id: 4, texto: "Pedra dos Três Reis Magos", correta: true }
    ],
    gabarito: "A Pedra dos Três Reis Magos é formada por três rochas que lembram os Reis Magos e é indicada para caminhadas e contemplação.",
  },
  {
    questao: "Qual pedra de Queimadas é famosa pelo topo pontiagudo e pelas práticas de rapel?",
    respostas: [
      { id: 1, texto: "Pedra do Vale", correta: false },
      { id: 2, texto: "Pedra do Bico", correta: true },
      { id: 3, texto: "Pedra da Serra Alta", correta: false },
      { id: 4, texto: "Pedra do Mirante Seco", correta: false }
    ],
    gabarito: "A Pedra do Bico tem topo pontiagudo e é um dos melhores locais para rapel, além de oferecer trilhas e acampamento.",
  },
  {
    questao: "Qual espaço cultural inaugurado em 2021 preserva a história e a memória rural do município?",
    respostas: [
      { id: 1, texto: "Museu Fazenda Nova", correta: false },
      { id: 2, texto: "Casa Cultural do Agreste", correta: false },
      { id: 3, texto: "Centro Cultural Philus-Haus", correta: true },
      { id: 4, texto: "Instituto Memória Serra Azul", correta: false }
    ],
    gabarito: "O Philus-Haus preserva a história rural de Queimadas com casa memorial, capela e acervo que contam a cultura local.",
  },
]

const questaoElement = document.getElementById("questao");
const respostaButtons = document.getElementById("resposta-buttons");
const proximoButton = document.getElementById("proximo-btn");
const gabaritoElement = document.getElementById("gabarito");
const resultadoQuestao = document.getElementById("resultado-questao");

let questaoAtualIndex = 0;
let pontuacao = 0;

function comecarQuiz() {
  questaoAtualIndex = 0;
  pontuacao = 0;
  mostrarQuestao();
}

function resetState(){
  proximoButton.style.display = "none";
  gabaritoElement.style.display = "none";
  resultadoQuestao.style.display = "none";
  while(respostaButtons.firstChild){
    respostaButtons.removeChild(respostaButtons.firstChild);
  }
}

function mostrarQuestao() {
  resetState();
  let questaoAtual = questoes[questaoAtualIndex];
  let numQuestao = questaoAtualIndex + 1;
  questaoElement.innerHTML = `${numQuestao}. ${questaoAtual.questao}`;

  questaoAtual.respostas.forEach((resposta) =>{
    const button = document.createElement("button");
    button.innerHTML = resposta.texto;
    button.dataset.id =  resposta.id;
    button.classList.add("btn");
    button.addEventListener("click", selecionarResposta);
    respostaButtons.appendChild(button);
  });
}

function mostrarGabrito(){
  gabarito = questoes[questaoAtualIndex].gabarito;
  gabaritoElement.innerHTML = `Gabarito: ${gabarito}`;
  gabaritoElement.style.display = "block";
}

function selecionarResposta(e){
  respostas = questoes[questaoAtualIndex].respostas;
  const respostaCorreta = respostas.filter((resposta) => resposta.correta == true)[0];
  const btnSelecionado = e.target;
  const estaCorreto = btnSelecionado.dataset.id == respostaCorreta.id;
  if(estaCorreto){
    btnSelecionado.classList.add("correto");
    resultadoQuestao.innerHTML = "Você acertou!";
    resultadoQuestao.style.display = "block";
    mostrarGabrito();
    pontuacao += 10;
  }else{
    btnSelecionado.classList.add("incorreto")
    resultadoQuestao.innerHTML = "Você errou!";
    resultadoQuestao.style.display = "block";
    mostrarGabrito();
  };
  Array.from(respostaButtons.children).forEach((button) => {
    button.disabled = true
  });
  proximoButton.style.display = "block";
}

function mostrarPontos(){
  resetState();
  questaoElement.innerHTML = `Você fez ${pontuacao}/${questoes.length * 10} pontos!`
  proximoButton.innerHTML = "Jogar Novamente"
  proximoButton.style.display = "block";
}

function ativarProximaQuestao(){
  questaoAtualIndex++;
  if(questaoAtualIndex < questoes.length){
    mostrarQuestao();
  } else {
    mostrarPontos();
  }
}

proximoButton.addEventListener("click", () => {
  if(questaoAtualIndex < questoes.length){
    ativarProximaQuestao();
  }else{
    comecarQuiz();
  }
});

comecarQuiz();