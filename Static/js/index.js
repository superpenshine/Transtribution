
// function getCookie(c_name) {
//     if (document.cookie.length > 0)
//     {
//         c_start = document.cookie.indexOf(c_name + "=");
//         if (c_start != -1)
//         {
//             c_start = c_start + c_name.length + 1;
//             c_end = document.cookie.indexOf(";", c_start);
//             if (c_end == -1) c_end = document.cookie.length;
//             return unescape(document.cookie.substring(c_start,c_end));
//         }
//     }
//     return "";
//  }

// function addCSRFToken(url) {
//     return url + '?token=' + getCookie('csrftoken');
// }

// Login
// $(function(){
//     $("#login-form").submit(function(e){
//     	console.log('111')
//         e.preventDefault();
//         var form = $(this);
//         var type = form.attr('method');	
//         var url = form.attr('action');
//         data = form.serialize();
//         ajax({ 
//             type:type, 
//             url:url, 
//             data:data, 
//             success:function(msg){ 
//                 if ($.parseJSON(msg).success) {
//                 	// Login success
//                 	window.location.href = "/grades/"
//                 } else {
//                 	$("#msg").text('登录失败');
//                 }
//             }, 
//             error:function(msg){ 
//                 $("#msg").text('登录失败');;
//             } 
//         });
//     });
// })

