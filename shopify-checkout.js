<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-1234567890"></script>
<!-- End Google tag (gtag.js) -->


{% if first_time_accessed %}
<!-- Ecommerce Data Layer Push for GTM -->
<script>
        window.dataLayer = window.dataLayer || [];

        var ecommerce = {
        'transaction_id': '{{checkout.order_number  | json}}',
        'affiliation': {{shop.name | json}},
        'value': {{checkout.total_price | money_without_currency | replace: ',', '.' | json}},
        'tax': {{checkout.tax_price | money_without_currency | replace: ',','.' | json}},
        'shipping': {{checkout.shipping_price | money_without_currency | replace: ',','.' | json}},
        'subtotal': {{checkout.subtotal_price | money_without_currency| replace: ',','.' | json}},
        'currency': {{checkout.currency | json}},
        {% for discount in checkout.discounts %}
        'coupon': {{discount.code | json}},
        'discount'  : {{discount.amount | money_without_currency | json}},
        {% endfor %}
        'email': {{checkout.email | json}},
        'items':[{% for line_item in checkout.line_items %}{
                            'item_id'         : {{line_item.product.id | json}},                  
                            'item_variant'    : {{line_item.variant.title | json}},             
                            'item_name'       : {{line_item.product.title | json}},
                            'price'           : {{line_item.product.price | money_without_currency | replace: ',', '.' | json}},
                            'item_brand'      : {{line_item.product.vendor | json}},
                            'item_category'   : {{line_item.product.type | json}},
                            'item_list_name'  : {{line_item.collection.title | json}},
                            'quantity'        : {{line_item.quantity | json}},
                            'discount'		    : {{discount.code | json}}
                        },{% endfor %}],
    };

    window.dataLayer.push({
        'event': 'purchase',
        ecommerce
        });
</script>
<!-- End Ecommerce Data Layer Push for GTM -->

<!-- Google tag (gtag.js) Conversion Tracking -->
<script>
    var enhanced_conversion_data = {
        "first_name": "{{ checkout.billing_address.first_name }}",
        "last_name": "{{ checkout.billing_address.last_name }}",
        "home_address": {
          "street": "{{ checkout.billing_address.street }}",
          "city": "{{ checkout.billing_address.city }}",
          "region": "{{ checkout.billing_address.province }}",
          "postal_code": "{{ checkout.billing_address.zip }}",
          "country": "{{ checkout.billing_address.country_code }}"
        }
      }
      if("{{ checkout.email }}"){
        enhanced_conversion_data.email = "{{ checkout.email }}";
      }
      if("{{ checkout.billing_address.phone }}"){
        enhanced_conversion_data.phone_number = "{{ checkout.billing_address.phone }}";
      }
    </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1234567890"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-1234567890', {'allow_enhanced_conversions': true});
  </script>
  
  <script>
    gtag('event', 'conversion', {
      // add your account ID and Conversion label here
      'send_to': 'AW-1234567890/XXXXXXXXXXXXXXXXXXXXX',
      'value': {{checkout.total_price | money_without_currency | replace: ',', '.' | json}},
      'currency': '{{checkout.currency | json}}',
      'transaction_id': '{{checkout.order_number  | json}}'
    });
  </script>
<!-- End Google tag (gtag.js) Conversion Tracking -->

{% endif %}
