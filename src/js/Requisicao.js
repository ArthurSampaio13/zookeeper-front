document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveBookBtn').addEventListener('click', function() {
        const book = {
            title: document.getElementById('bookTitle').value,
            genre: document.getElementById('bookGenre').value,
            description: document.getElementById('bookDescription').value,
            author: document.getElementById('bookAuthor').value,
            releaseYear: parseInt(document.getElementById('bookReleaseYear').value)
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
            // Opcionalmente, você pode fechar o modal aqui
            $('#yourModalId').modal('hide'); // Substitua 'yourModalId' pelo ID real do seu modal
        })
        .catch(error => {
            console.error('Houve um problema com a requisição:', error);
        });
    });
});
