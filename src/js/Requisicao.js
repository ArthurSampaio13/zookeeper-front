document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveBookBtn');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            const titleElement = document.getElementById('bookTitle');
            const genreElement = document.getElementById('bookGenre');
            const descriptionElement = document.getElementById('bookDescription');
            const authorElement = document.getElementById('bookAuthor');
            const releaseYearElement = document.getElementById('bookYear');

            if (titleElement && genreElement && descriptionElement && authorElement && releaseYearElement) {
                const book = {
                    title: titleElement.value,
                    genre: genreElement.value,
                    description: descriptionElement.value,
                    author: authorElement.value,
                    releaseYear: parseInt(releaseYearElement.value)
                };

                fetch('http://localhost:8081/v1/books/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    alert('Livro adicionado com sucesso!');
                    titleElement.value = '';
                    genreElement.value = '';
                    descriptionElement.value = '';
                    authorElement.value = '';
                    releaseYearElement.value = '';
                    loadBooks(); // Atualiza a lista de livros após adicionar
                })
                .catch(error => {
                    console.error('Houve um problema com a requisição:', error);
                });
            } else {
                console.error('Um ou mais elementos de entrada não foram encontrados');
            }
        });
    } else {
        console.error('Botão de salvar não encontrado.');
    }

    // Função para visualizar livros
    const viewBooksModal = document.getElementById('viewBooksModal');
    viewBooksModal.addEventListener('show.bs.modal', function() {
        loadBooks(); // Carrega os livros ao abrir a modal
    });

    // Função para excluir livro
    window.deleteBook = function(bookId) {
        if (confirm('Você tem certeza que deseja excluir este livro?')) {
            fetch(`http://localhost:8081/v1/books/${bookId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                alert('Livro excluído com sucesso!');
                loadBooks(); // Atualiza a lista de livros após exclusão
            })
            .catch(error => {
                console.error('Houve um problema com a requisição:', error);
            });
        }
    };

    function loadBooks() {
        fetch('http://localhost:8081/v1/books') // Supondo que você tenha essa rota para obter os livros
            .then(response => response.json())
            .then(books => {
                const tbody = document.querySelector('#viewBooksModal tbody');
                tbody.innerHTML = ''; // Limpa o conteúdo atual da tabela
                books.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.id}</td>
                        <td>${book.znode}</td>
                        <td>${book.title}</td>
                        <td>${book.genre}</td>
                        <td>${book.description}</td>
                        <td>${book.author}</td>
                        <td>${book.releaseYear}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">Excluir</button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Houve um problema com a requisição:', error);
            });
    }

    loadBooks();
});
