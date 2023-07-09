document.getElementById('btn-buscar').addEventListener('click', function() {
    document.getElementById('loadingImage').style.display = 'block';
    fetch('server_logic.php').then(response => response.json()).then(data => {
        document.getElementById('loadingImage').style.display = 'none';
        document.getElementById('output').innerHTML = '';
        data.forEach(function(result) {
            var card = '<div class="card">';
            card += '<p>Palavras: ' + result.Palavras + '</p>';
            card += '<p>Chave Privada: ' + result.Privada + '</p>';
            card += '<p>Chave Pública: ' + result.Publica + '</p>';
            for (var key in result.Balances) {
                var balanceClass = result.Balances[key] > 0 ? 'positive' : 'zero';
                card += '<p>' + key + ': <span class="' + balanceClass + '">' + result.Balances[key] + '</span></p>';
            }
            card += '</div><hr>';
            document.getElementById('output').innerHTML += card;
        });
        
    })
    .catch((error) => {
        document.getElementById('loadingImage').style.display = 'none';
        console.error('Error:', error);
    });
});

var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }