const carros = JSON.parse(localStorage.getItem('carros')) || [];

function adicionarCarro() {
    const Modelo = document.getElementById('Modelo').value;
    const Marca = document.getElementById('Marca').value;
    const ano = document.getElementById('ano').value;
    const quilometragem = document.getElementById('quilometragem').value;
    const cor = document.getElementById('cor').value;
    const preco = document.getElementById('preco').value;
    const contato = document.getElementById('contato').value;
    const comentario = document.getElementById('comentario').value;
    const foto = document.getElementById('foto').files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
        const carro = {
            Modelo,
            Marca,
            ano,
            quilometragem,
            cor,
            preco,
            contato,
            comentario,
            foto: e.target.result
        };

        carros.push(carro);
        localStorage.setItem('carros', JSON.stringify(carros));
        atualizarCatalogo();
        alert("Carro adicionado com sucesso!");
    };
    reader.readAsDataURL(foto);
}

function atualizarCatalogo() {
    const carrosLista = document.getElementById('carros-lista');
    carrosLista.innerHTML = '';

    carros.forEach((carro, index) => {
        const carroCard = document.createElement('div');
        carroCard.classList.add('carro-card');
        carroCard.innerHTML = `
            
            <img src="${carro.foto}" alt="${carro.marcaModelo}">
            <h3>${carro.Modelo}</h3>
            <h3>${carro.Marca}</h3>
            <p style="padding:3%">Ano: ${carro.ano}</p>
            <p style="padding:3%">Quilometragem: ${carro.quilometragem} km</p>
            <p>Cor: ${carro.cor}</p>
            <p>Preço: ${carro.preco}</p>
            <p>Contato: ${carro.contato}</p>
            <p>Comentario: ${carro.comentario}</p>
            <button onclick="verDetalhes(${index})">Ver Detalhes</button>
            <button class="excluir-btn" onclick="excluirCarro(${index})">Excluir</button>
        `;
        carrosLista.appendChild(carroCard);
    });
}

function excluirCarro(index) {
    carros.splice(index, 1);
    localStorage.setItem('carros', JSON.stringify(carros));
    atualizarCatalogo();
    alert("Carro excluído com sucesso!");
}

function verDetalhes(index) {
    const carro = carros[index];
    localStorage.setItem('detalhesCarro', JSON.stringify(carro));
    window.location.href = 'detalhes.html';
}

window.onload = function() {
    const detalhesCarro = document.getElementById('carro-detalhes');
    if (detalhesCarro) {
        const carro = JSON.parse(localStorage.getItem('detalhesCarro'));
        detalhesCarro.innerHTML = `
            <div class="detalhes-foto detalhes-dados">
            <img src="${carro.foto}" alt="${carro.marcaModelo}" class="image" max >
            <h2>${carro.Marca} ${carro.Modelo} </h2>
            <p>Ano: ${carro.ano}</p></br>
            <p>Quilometragem: ${carro.quilometragem} Km </p>
            <p>Cor: ${carro.cor}</p>
            <p>Preço:$${carro.preco}</p>
            <p>Contato: ${carro.contato}</p>
            <br><p> Comentario:${carro.comentario}</p></br> 
           </div>
        `;
    } else {
        atualizarCatalogo();
    }
};