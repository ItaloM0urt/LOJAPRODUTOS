
const url = "https://makeup-api.herokuapp.com/api/v1/products.json"

const listaProdutos = $('#listaProdutos')
const cardsPorPagina = 12

let paginaAtual = 1

fetch(url)
    
    .then(response => response.json())
    
    .then(data => {
        let totalPaginas = Math.ceil(data.length / cardsPorPagina )

        function mostrarPagina(pagina){
            let inicio = (pagina - 1) * cardsPorPagina
            let fim = inicio + cardsPorPagina
            listaProdutos.empty()
        

        for(let i = inicio; i < fim && i < data.length; i++){
            const produto = data[i]

            const div = document.createElement('div')
            div.classList = 'flex'
            div.innerHTML = `
            <div class="card" style="width: 18rem; height: 40rem;">
                <img src="${produto.image_link}" class="card-img-top h-50">
                <div class="card-body">
                    <h5 class="card-title produto">${produto.name}</h5>
                    <h6 class="card-title link">${produto.product_link}</p>
                    <h6 class="card-title preco">${produto.price}</p>

                    <div class="modal fade" id="modal-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">$produto.name}{</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                    <div class="modal-body">
                                    <img src="${produto.image_link}" width="150">
                                    <p>Capital: ${produto.name}</p>
                                    <p>AlfaCode: ${produto.description}</p>
                                </div>
                                    <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            
            

            listaProdutos.append(div)
        }
    }
    
    function atualizarPagina(){
        $('#contador-pagina').text(`Página ${paginaAtual} de ${totalPaginas}`)
        $('#anterior').prop('disabled', paginaAtual === 1)
        $('#proximo').prop('disabled', paginaAtual === totalPaginas)
        mostrarPagina(paginaAtual)
    }
    atualizarPagina()
    
    $('#anterior').click(() => {
        if(paginaAtual > 1){
            paginaAtual--
            atualizarPagina()
        }
    })
    $('#proximo').click(() =>{
        if(paginaAtual < totalPaginas){
            paginaAtual++ 
            atualizarPagina()
        }
    })
})
    
    
    .catch(error => console.error(error))   