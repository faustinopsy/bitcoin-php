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
        var spanx = document.getElementById("close-btn");
        span.onclick = function() {
            modal.style.display = "none";
        }
        spanx.onclick = function() {
            modal.style.display = "none";
        }
        // window.onclick = function(event) {
        //     if (event.target == modal) {
        //         modal.style.display = "none";
        //     }
        //}
       
        window.addEventListener('DOMContentLoaded', function(){
        var codeContent = document.getElementById('code-content');
        codeContent.textContent = `<?php
        $wordlist = file('english.txt', FILE_IGNORE_NEW_LINES);
        $words = [];
        
        for($i = 0; $i < 12; $i++) {
            $index = random_int(0, count($wordlist) - 1);
            $words[] = $wordlist[$index];
        }
        
        $mnemonic = implode(' ', $words);
        
        $curl = curl_init();
        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://privatekeyfinder.io/api/searchv3',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => 'network=bitcoin&query='.str_replace('+', '%20', urlencode($mnemonic)) ,
          CURLOPT_HTTPHEADER => array(
            'Headers: private-key',
            'Content-Type: application/x-www-form-urlencoded'
          ),
        ));
        
        $response = curl_exec($curl);
        curl_close($curl);
        $dados= json_decode($response, true);
        
        //Enviando as chaves para blockchain explore
        $url2 = "https://blockchain.info/balance?active=".
        $dados["result"]["brainwallet"]["address"]["p2pkh_u"].'|'.
        $dados["result"]["brainwallet_upper"]["address"]["p2pkh_u"].'|'.
        $dados["result"]["brainwallet_reversed"]["address"]["p2pkh_u"].'|'.
        $dados["result"]["brainwallet_x2_binary"]["address"]["p2pkh_u"].'|'.
        $dados["result"]["brainwallet_x2_upper"]["address"]["p2pkh_u"].'|'.
        "&cors=true";
        $response = file_get_contents($url2);
        $data = json_decode($response, true);
        
        $wallet=["brainwallet","brainwallet_upper","brainwallet_reversed","brainwallet_x2_binary","brainwallet_x2_upper"];
        $results = [];
        
        for($i=0;$i<4;$i++){
            if(!empty($dados["result"][$wallet[$i]]["passphrase"])){
                $result = [];
                $result['Palavras'] = $dados["result"][$wallet[$i]]["passphrase"];
                $result['Privada'] = $dados["result"][$wallet[$i]]["privateKey"];
                $result['Publica'] = $dados["result"][$wallet[$i]]["address"]["p2pkh_u"];
               
                $public_key = $dados["result"][$wallet[$i]]["address"]["p2pkh_u"];
            
                if (isset($data[$public_key])) {
                    $balances = [];
                    foreach ($data[$public_key] as $key => $nvalor) {
                        $balances[$key] = $nvalor;
                    }
                    $result['Balances'] = $balances;
                }
                $results[] = $result;
            }
        }
        
        echo json_encode($results);
        
        ?>`;
        document.querySelectorAll('pre').forEach(function (block) {
            hljs.highlightElement(block);
          });
    });
        document.getElementById('show-code').addEventListener('click', function() {
            var codeDetail = document.getElementById('code-detail');

            if (codeDetail.style.display === "none") {
                // Aqui você deve inserir o código que deseja mostrar
                
                codeDetail.style.display = "block";
            } else {
                codeDetail.style.display = "none";
            }
        });
       