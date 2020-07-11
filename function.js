function loadnews(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
        {
            var result = this.responseText;

            var results = JSON.parse(result);

            results.forEach((news)=>
            {
                var section = document.createElement("section");
                var outer_div = document.createElement("div");
                var img_tag = document.createElement("img");
                var inner_div_one = document.createElement("div");
                var inner_div_two = document.createElement("div");
                var header = document.createElement("H5");
                var para_fir = document.createElement("P");
                var para_sec = document.createElement("P");
                var small = document.createElement("small");
                var anchor_tag = document.createElement("A");
                var hr = document.createElement("HR");

                section.className = 'secem';
                outer_div.className = 'row';
                img_tag.className = 'phuto';
                inner_div_one.className = 'col-lg-6';
                inner_div_two.className = 'col-lg-6';
                header.className = 'heade';
                para_fir.className = 'card-text';
                para_sec.className = 'card-text';
                small.className = 'text-muted';
                anchor_tag.className = 'btn btn-primary';
                hr.className = 'horiz';


                //img_tag
                var img_tag_src = document.createAttribute("src");
                var img_tag_alt = document.createAttribute("alt");
                img_tag_src.value = news.imgurl;
                img_tag_alt.value = "img"; 
                img_tag.setAttributeNode(img_tag_src);
                img_tag.setAttributeNode(img_tag_alt);
                
                //anchor_tag
                var a_tag_href = document.createAttribute("href");
                a_tag_href.value = news.posturl;
                anchor_tag.setAttributeNode(a_tag_href);

                var h_text = document.createTextNode(news.headline);
                var p_fir_text = document.createTextNode(news.body);
                var small_text = document.createTextNode("Published on "+news.posted);
                var a_text = document.createTextNode("Read the Full Article");

                header.appendChild(h_text);
                para_fir.appendChild(p_fir_text);
                small.appendChild(small_text);
                anchor_tag.appendChild(a_text);

                para_sec.appendChild(small);
                inner_div_two.appendChild(header);
                inner_div_two.appendChild(para_fir);
                inner_div_two.appendChild(para_sec);
                inner_div_two.appendChild(anchor_tag);
                inner_div_one.appendChild(img_tag);

                outer_div.appendChild(inner_div_one);
                outer_div.appendChild(inner_div_two);
                section.appendChild(outer_div);
                section.appendChild(hr);

                document.body.appendChild(section);
                
            });
        }
    }

    xhttp.open('GET', '/home', true);
    xhttp.send()
}