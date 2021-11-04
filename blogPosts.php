<?php

// https://medium.com/feed/@lucianmincu

$rss_url = 'https://medium.com/feed/@lucianmincu';
$api_endpoint = 'https://api.rss2json.com/v1/api.json?rss_url=';
$data = json_decode( file_get_contents($api_endpoint . urlencode($rss_url)) , true );

if($data['status'] == 'ok'){

    foreach ($data['items'] as $item) {
       // print_r($item);


        $description = substr( strip_tags(preg_replace('#<a.*?>.*?</a>#i', '', $item['description']) ), 0, 80)."...";


        exit;
    }
}