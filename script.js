const buttonPesquisa = document.getElementById("buttonPesquisa");

buttonPesquisa.addEventListener("click", (event) => {
    const inputTextoPesquisa = document.getElementById("inputTextoPesquisa");
    const textoPesquisa = inputTextoPesquisa.value;

    fetch(`http://localhost:3000/filmes/busca-por-livro/${encodeURI(textoPesquisa)}`)
        .then((response) => {
            return response.json();
        })
        .then((resultados) => {
            const resultadoPesquisa = document.getElementById("resultadoPesquisa");
            
            while (resultadoPesquisa.firstChild) {
                resultadoPesquisa.removeChild(resultadoPesquisa.firstChild);
            }
            for (const resultado of resultados) {
                const boxResultado = document.createElement("div");
                boxResultado.classList.add("row");

                const movieImage = document.createElement("img");
                movieImage.classList.add("col", "movie-image");
                movieImage.src = resultado.imagem;

                boxResultado.appendChild(movieImage);

                const textContainer = document.createElement("div");
                textContainer.classList.add("col");

                const title = document.createElement("p");
                title.innerText = resultado.nome;

                const ano = document.createElement("p");
                ano.classList.add("ano");
                ano.innerText = resultado.ano;
                
                const genero = document.createElement ("p");
                genero.classList.add("genero");
                genero.innerHTML = resultado.genero;

                const sinopse = document.createElement("p");
                sinopse.classList.add("sinopse");
                sinopse.innerText = resultado.sinopse;

                const trailer = document.createElement ("p");
                trailer.classList.add("trailer");
                trailer.innerHTML = resultado.trailer;

                textContainer.appendChild(title);
                textContainer.appendChild(ano); 
                textContainer.appendChild(genero);
                textContainer.appendChild(sinopse);
                textContainer.appendChild(trailer);
                boxResultado.appendChild(textContainer);
                resultadoPesquisa.appendChild(boxResultado);
            }
        })
        .catch((erro) => {
            console.log(erro);
        });
});
