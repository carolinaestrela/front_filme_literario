const btn = document.querySelector (".btn btn-dark");
const texto = document.querySelector(".texto");

fetch (`http://localhost:3000/filmes/busca-por-livro/${texto}`)
    .then ((response) => {
        return response.json();
    })  
    .then ((data) => {
        console.log
        const box = document.createElement('div');
        box.setAttribute('class');
        box.setAttribute('data-id', data._id)
        
        const imagem = document.createElement('img');
        imagem.setAttribute('alt', data.nome);
        imagem.setAttribute('src', data.imagem)

        const body = document.createElement('div');
        body.setAttribute('class');

        const nome = document.createElement('p');
        nome.innerHTML = `${data.nome}`
        nome.setAttribute('class');
        
        const ano = document.createElement('p');
        ano.innerHTML = `${data.ano}`
        ano.setAttribute('class');
        
        const genero = document.createElement('p');
        genero.innerHTML = `${data.genero}`
        genero.setAttribute('class');

        const sinopse = document.createElement('p');
        sinopse.innerHTML = `${data.sinopse}`
        sinopse.setAttribute('class');
        
        box.appendChild(imagem);
        body.appendChild(nome);
        body.appendChild(ano);
        body.appendChild(genero);
        body.appendChild(genero);
        container.appendChild(box);
        container.appendChild(body);

    })
    .catch  ((erro) => {
        console.log (erro)
    })
