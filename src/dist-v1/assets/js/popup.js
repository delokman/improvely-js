var backdrop = document.getElementById('icf_backdrop');
if (backdrop) {
      backdrop.style.display = 'block';
} else {
      var backdrop = document.createElement('div');
      backdrop.id = 'icf_backdrop';
      backdrop.style.position = 'fixed';
      backdrop.style.top = 0;
      backdrop.style.left = 0;
      backdrop.style.right = 0;
      backdrop.style.bottom = 0;
      backdrop.style.overflow = 'auto';
      backdrop.style.overflowY = 'scroll';
      backdrop.style.outline = 0;
      backdrop.style.zIndex = 50001;
      backdrop.style.height = '100%';

      document.body.style.overflow = 'hidden';

      var html = '<div id="icf_modal" style="background: #f5f5f5; border: 1px solid #ccc; position: relative; width: 560px; margin: 30px auto; z-index: 50002; overflow: auto; box-shadow: 0 5px 15px rgba(0,0,0,.3); padding: 16px; text-align: left; color: #000"></div>';
      document.body.appendChild(backdrop);
      backdrop.innerHTML = html;

      var icf_modal = document.getElementById('icf_modal');

      var html = '<a href="#" id="icf_close" style="color: #fff; background: #494949; border-radius: 4px; padding: 8px; font-family: arial; font-size: 11px; font-weight: bold; margin: 0; float: right">Close</a>';
      html += '<h1 style="font-size: 24px; font-weight: normal; margin: 8px 0 20px 0; padding: 0; color: #000"></h1>';
      html += '<p id="icf_top_msg" style="clear: both; background: transparent; color: #000"></p>';

      html += '<form style="margin: 0; padding: 0; border: 0; background: transparent" id="icf_form">';

      html += '<div style="font-size: 15px; font-weight: bold; margin: 15px 0 5px 0; color: #000"></div>';
      html += '<input type="text" name="name" value="" style="width: 250px; padding: 8px; color: #000; border: 1px solid #ccc; border-radius: 4px; margin: 0; background: #fff; font-size: 13px" />';

      html += '<div style="font-size: 15px; font-weight: bold; margin: 15px 0 5px 0; color: #000"></div>';
      html += '<input type="text" name="eaml" id="icf_eaml" value="" style="width: 250px; padding: 8px; color: #000; border: 1px solid #ccc; border-radius: 4px; margin: 0; background: #fff; font-size: 13px" />';

      
      
      html += '<div style="font-size: 15px; font-weight: bold; margin: 15px 0 5px 0; color: #000"></div>';
      html += '<textarea rows="5" cols="80" name="message" id="icf_message" style="color: #000; width: 96%; height: 100px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #fff; font-size: 13px"></textarea>';
      html += '<div id="icf_length" style="font-family: arial; font-size: 12px; color: #000"></div>';

      html += '<input type="text" name="email" value="" style="display: none">';
      html += '<a href="#" id="icf_submit" style="background: #47a447; padding: 8px; font-size: 13px; text-decoration: none; font-weight: normal; border-radius: 4px; color: #fff; margin: 15px 0 0 0; display: block; float: left"></a>';
      
      html += '</form>';
      
      icf_modal.innerHTML = html;

      var icf_close = document.getElementById('icf_close');
      icf_close.onclick = function() { 
            document.getElementById('icf_backdrop').style.display = 'none';
            document.body.style.overflow = 'inherit';
      };

      var icf_message = document.getElementById('icf_message');
      icf_message.onkeyup = function() {
            var icf_message = document.getElementById('icf_message');
            var message = icf_message.value;
            var icf_length = document.getElementById('icf_length');

            if (message.length > 1000)
                  icf_length.innerHTML = '<span style="color: #c00">' + message.length + '/1000 characters</span>';
            else
                  icf_length.innerHTML = message.length + '/1000 characters';
      };

      var icf_submit = document.getElementById('icf_submit');
      icf_submit.onclick = function() {
        var icf_message = document.getElementById('icf_message');
        var message = icf_message.value;
        if (message.length > 1000) {
              alert("Your message is too long. Please remove some text.");
              return false;
        }

        var icf_eaml = document.getElementById('icf_eaml');
        var eaml = icf_eaml.value;
        if (eaml.length == 0 || eaml.indexOf('@') == -1) {
              alert("Please enter a valid e-mail address.");
              return false;
        }

        var url = 'https://icf.improvely.com/submit?shop=' + Shopify.shop;
        var form = document.getElementById('icf_form');
        for (var i = 0; i < form.elements.length; i++) {
              var el = form.elements[i];
              url += '&' + el.name + '=' + encodeURIComponent(el.value);
        }

        url += '&url=' + encodeURIComponent(icf.get_urls());

        var n = document.getElementsByTagName("script")[0];
        var r = document.createElement("script");
        r.type = "text/javascript";
        r.src = url;
        n.parentNode.insertBefore(r, n);

        form.style.display = 'none';

        document.getElementById('icf_top_msg').innerHTML = '';

        if (typeof icf.clear_cookie !== 'undefined')
              icf.clear_cookie();

        return false;
    }
}
