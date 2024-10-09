document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveBookBtn');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            const titleElement = document.getElementById('bookTitle');
            const genreElement = document.getElementById('bookGenre');
            const descriptionElement = document.getElementById('bookDescription');
            const authorElement = document.getElementById('bookAuthor');
            const releaseYearElement = document.getElementById('bookReleaseYear');

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
                    $('#yourModalId').modal('hide');
                })
                .catch(error => {
                    console.error('Houve um problema com a requisição:', error);
                });
            } else {
                console.error('Um ou mais elementos de entrada não foram encontrados.');
            }
        });
    } else {
        console.error('Botão de salvar não encontrado.');
    }
});
