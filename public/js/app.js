function uploadJson() {

  var formData = new FormData();
  var file = document.getElementById('file').files;

  formData.append('requestJson', file[0]);

  var XHR = new XMLHttpRequest();
  var origin = window.location.origin;

  XHR.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById('message').innerHTML = XHR.responseText;
       if(XHR.responseText == "module generated"){
         document.getElementById('upload').style.display='none';
         document.getElementById('download').style.display='block';
       }
    }
  };

  XHR.open('POST', origin+'/upload');
  //XHR.setRequestHeader('Content-Type', 'multipart/form-data');
  XHR.send(formData);
}
