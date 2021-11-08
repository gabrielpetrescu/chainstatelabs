<?php

if(isset($_POST['get-posts'])){

    $rss_url = 'https://medium.com/feed/@lucianmincu';

    $api_endpoint = 'https://api.rss2json.com/v1/api.json?rss_url=';
    $data = json_decode( file_get_contents($api_endpoint . urlencode($rss_url)) , true );

    $posts = '';

    if($data['status'] == 'ok'){
        $data['items'] = array_slice($data['items'],0,4);
        foreach ($data['items'] as $item) {

//            $item['link']
//            $item['thumbnail']

            $posts .= '
              <div class="col-md-3 col-sm-6">
                        <div class="blog-box">
                            <p class="article-section">'.implode(", ",$item['categories']).'</p>
                            <p class="article-title">'.$item['title'].'</p>
                            <p class="article-description">'.substr( strip_tags(preg_replace('#<a.*?>.*?</a>#i', '', $item['description']) ), 0, 80)."...".'</p>
                            <div class="separator-line"></div>

                            <div class="row">
                                <div class="col-md-12">
                                    <p class="article-date">'.$item['pubDate'].'</p>
                                </div>
                            
                            </div>
                        </div>
                    </div>
            ';




        }
    }

    echo $posts;

}