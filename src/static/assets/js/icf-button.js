var icf = function() {
    var set_cookie = function(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 3);
        var cookie = c_name + "=" + escape(value);
        cookie += "; expires=" + exdate.toUTCString();
        cookie += "; path=/";
        document.cookie = cookie;
    };

    var get_cookie = function(c_name) {
        var name = c_name;
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(name + "=");
            if (c_start != -1) {
                c_start = c_start + name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return null;
    };

    return {
        init: function() {
            var cookie = get_cookie('icf');
            if (cookie == null || cookie.length < 1000) {
                if (cookie != null && cookie.length > 0) {
                    cookie += "\n";
                } else {
                    cookie = encodeURIComponent(document.referrer) + "\n";
                }
                cookie += encodeURIComponent(window.location);
                set_cookie('icf', cookie);
            }

            if (document.getElementById('icf_contact_form')) {
                this.add_urls('icf_contact_form');
            }
        },

        clear_cookie: function() {
            set_cookie('icf', '');
        },

        get_urls: function() {
            var cookie = get_cookie('icf');
            return cookie;
        },

        add_button: function() {
            var button = document.createElement('div');
            button.style.backgroundColor = '#494949';
            button.style.padding = '10px 16px 6px 16px';
            button.style.fontFamily = 'arial';
            button.style.fontSize = '15px';
            button.style.fontWeight = 'bold';
            button.style.color = '#fff';
            button.style.textDecoration = 'none';
            button.style.borderTopRightRadius = '6px';
            button.style.borderTopLeftRadius = '6px';
            button.innerHTML = '<i class=\"fa fa-envelope\"></i>&nbsp; 联系我们';
            
            button.style.position = 'fixed';
            button.style.bottom = 0;
            button.style.display = 'block';
            button.style.cursor = 'pointer';
            button.style.margin = '0';
            button.style.zIndex = 50000;

            button.style.right = '2%';
                        
            document.body.appendChild(button);

            button.onclick = function() {
                icf.click_button();
            };

            button.onmouseover = function() {
                this.style.bottom = '1px';
            };

            button.onmouseout = function() {
                this.style.bottom = '0';
            };

        },

        click_button: function() {
            var n = document.getElementsByTagName("script")[0];
            var r = document.createElement("script");
            r.type = "text/javascript";
            r.src = "./assets/js/popup.js?shop=" + Shopify.shop;
            n.parentNode.insertBefore(r, n);
        },

        add_urls: function(id) {
            var form = document.getElementById(id);
            if (form) {
                var cookie = icf.get_urls();
                var urls = cookie.split("\n");
                for (var i = 0; i < urls.length; i++) {
                    var input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'url[' + i + ']';
                    input.value = urls[i];
                    form.appendChild(input);
                }
            }

        }

    };

}();

icf.init();
icf.add_button();
