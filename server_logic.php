<?php
if(!empty($_GET['wordCount'])){
    $wordlist = file('english.txt', FILE_IGNORE_NEW_LINES);
    $words = [];
    $wordCount = $_GET['wordCount'];
    if (!is_numeric($wordCount) || $wordCount < 1 || $wordCount > 24) {
        $wordCount = 12; 
    }
    
    $words = [];
    for($i = 0; $i < $wordCount; $i++) {
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
    
}else{
    echo 'Nenhum parametro....';
}

?>


