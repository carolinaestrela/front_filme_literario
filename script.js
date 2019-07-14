const buttonPesquisa = document.getElementById("buttonPesquisa");

buttonPesquisa.addEventListener("click", (event) => {
    const inputTextoPesquisa = document.getElementById("inputTextoPesquisa");
    const textoPesquisa = inputTextoPesquisa.value.trim();

    if (textoPesquisa.length === 0) {
        return;
    }

    fetch(`http://localhost:3000/filmes/busca-por-livro/${encodeURI(textoPesquisa)}`)
        .then((response) => {
            return response.json();
        })
        .then((resultados) => {
            const resultadoPesquisa = document.getElementById("resultadoPesquisa");

            while (resultadoPesquisa.firstChild) {
                resultadoPesquisa.removeChild(resultadoPesquisa.firstChild);
            }

            if (resultados.length === 0) {
                const nadaEncontrado = document.createElement("p");
                nadaEncontrado.innerText = "Nada encontrado";
                resultadoPesquisa.appendChild(nadaEncontrado);
                return;
            }

            for (const resultado of resultados) {
                const boxResultado = document.createElement("div");
                boxResultado.classList.add("row", "box");

                const movieImage = document.createElement("img");
                movieImage.classList.add("col", "movie-image");
                movieImage.src = resultado.imagem;

                boxResultado.appendChild(movieImage);

                const textContainer = document.createElement("div");
                textContainer.classList.add("col");

                const title = document.createElement("p");
                title.innerText = resultado.nome;

                textContainer.appendChild(title);

                const ano = document.createElement("p");
                ano.classList.add("ano");
                ano.innerText = resultado.ano;
                
                textContainer.appendChild(ano);
                
                const genero = document.createElement("p");
                genero.classList.add("genero");
                genero.innerHTML = resultado.genero;
                
                textContainer.appendChild(genero);
                
                const sinopse = document.createElement("p");
                sinopse.classList.add("sinopse");
                sinopse.innerText = resultado.sinopse;
                
                textContainer.appendChild(sinopse);

                if (resultado.trailer) {
                    const trailer = document.createElement("div");
                    trailer.classList.add("trailer");

                    const buttonExpandTrailer = document.createElement('button');
                    buttonExpandTrailer.classList.add("btn", "btn-outline-dark", "btn-sm");
                    buttonExpandTrailer.setAttribute("data-toggle", "collapse");
                    buttonExpandTrailer.setAttribute("data-target", `#trailer_${resultado._id}`);
                    buttonExpandTrailer.innerText = "Exibir o trailer";
                    
                    trailer.appendChild(buttonExpandTrailer);

                    const temp = document.createElement("template");
                    temp.innerHTML = resultado.trailer.trim();
                    const iframeTrailer = temp.content.firstChild;
                    iframeTrailer.classList.add("iframe-trailer");

                    const collapseTrailer = document.createElement("div");
                    collapseTrailer.classList.add("collapse");
                    collapseTrailer.id = `trailer_${resultado._id}`;
                    collapseTrailer.appendChild(iframeTrailer);

                    trailer.appendChild(collapseTrailer);

                    textContainer.appendChild(trailer);
                }

                boxResultado.appendChild(textContainer);
                resultadoPesquisa.appendChild(boxResultado);
            }
        })
        .catch((erro) => {
            console.error(erro);
        });
});
