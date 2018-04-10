var XHR = new XMLHttpRequest();
var origin = window.location.origin;
var isLoggedin = false;
var nav = "login";

function uploadJson() {

  var formData = new FormData();
  var file = document.getElementById('file').files;
  formData.append('requestJson', file[0]);
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
  XHR.setRequestHeader("x-auth", localStorage.xAuth);
  XHR.send(formData);
}

function postRequrest(url, body = {}, headers = {}) {
      var mainUrl = origin+url;

      XHR.open('POST', mainUrl);
      XHR.setRequestHeader("Content-Type", "application/json");
      XHR.send(JSON.stringify(body));

      return new Promise(function (resolve, reject) {
          XHR.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                       if(XHR.responseText) {
                            var res = {
                              data: XHR.responseText,
                              xAuth: this.getResponseHeader("x-auth")
                            }
                           resolve(res);
                       } else {
                         reject();
                       }
                  }
          };
      });
}

function getRequrest(url, body = {}, headers = {}) {
      var mainUrl = origin+url;

      XHR.open('GET', mainUrl);
      XHR.setRequestHeader("x-auth", localStorage.xAuth);
      XHR.send();
      return new Promise(function (resolve, reject) {
          XHR.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                       if(XHR.responseText) {
                            var res = {
                              data: XHR.responseText
                            }
                           resolve(res);
                       } else {
                         reject();
                       }
                  }
          };
      });
}

function deleteRequrest(url, body = {}, headers = {}) {
      var mainUrl = origin+url;

      XHR.open('DELETE', mainUrl);
      XHR.setRequestHeader("x-auth", localStorage.xAuth);
      XHR.send();
      return new Promise(function (resolve, reject) {
          XHR.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                       if(XHR.responseText) {
                            var res = {
                              data: XHR.responseText
                            }
                           resolve(res);
                       } else {
                         reject();
                       }
                  }
          };
      });
}

function setViews(url, cb) {
    XHR.open('GET', url);
    XHR.send();
    XHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('root').innerHTML = XHR.responseText;
                cb("done");
            }
    };
}

var Model = {
  init: function () {
    if (localStorage.xAuth) {
        return getRequrest('/user');
    } else {
      return Promise.reject();
    }
  },
  login: function (email, password) {
      var body = {
        email: email,
        password: password
      }
      return postRequrest('/login', body);
  },
  register: function (name, email, password) {
    var body = {
      name: name,
      email: email,
      password: password
    }
    return postRequrest('/create', body);
  },
  upload: function () {

  },
  logout: function () {
    return deleteRequrest('/logout');
  }
}

var Controller = {
  init: function () {
    Model.init().then(function (user) {
      if(user) {
        isLoggedin = true;
      }
      Views.init();
    }).catch(function (e) {
      console.log(e);
      isLoggedin = false;
      localStorage.clear();
      Views.init();
    });

  },
  loginCtrl: function (e, p) {
      Model.login(e, p).then(function (res) {
        if(res){
          localStorage.xAuth = res.xAuth;
          isLoggedin = true;
          Views.init();
        }
      }).catch(function (err) {
        isLoggedin = false;
        localStorage.clear();
        console.log(err);
      });;
  },
  signupCtrl: function (n, e, p) {
    Model.register(n, e, p).then(function (res) {
      if(res){
        localStorage.xAuth = res.xAuth;
        isLoggedin = true;
        Views.init();
      }
    }).catch(function (err) {
      isLoggedin = false;
      localStorage.clear();
      console.log(err);
    });;
  },
  logoutCtrl: function () {
    Model.logout().then(function (res) {
      if(res) {
        isLoggedin = false;
        localStorage.clear();
        nav = "login"
        Views.init();
      }
    }).catch(function (e) {
      console.log(e);
    });;
  },
  navCtrl: function (navTo) {
      nav = navTo;
      Views.init();
  }
}

var Views = {
    init: function () {
      this.loginView.init();
      this.signupView.init();
      this.appView.init();
    },
    loginView: {
        init: function () {
             this.render();
        },
        render: function () {
           if(!localStorage.xAuth && !isLoggedin  && nav === 'login') {
             setViews('./views/login.html', function(done) {

               var email = document.getElementById('lg-email');
               var password = document.getElementById('lg-password');

               this.login = document.getElementById('login-form');
               this.openSignup = document.getElementById('openSignup');

               this.openSignup.addEventListener('click', function () {
                 console.log('boom');
                  Controller.navCtrl('signup');
               });

               this.login.addEventListener('submit', function (event) {
                   event.preventDefault();
                   Controller.loginCtrl(email.value, password.value);
               });
             });
           }
        }
    },
    signupView: {
      init: function () {
        this.render();
      },
      render: function () {
        if(!localStorage.xAuth && !isLoggedin && nav === 'signup'){
          setViews('./views/signup.html', function(done) {

            var name = document.getElementById('sp-name');
            var email = document.getElementById('sp-email');
            var password = document.getElementById('sp-password');

            this.openLogin = document.getElementById('openLogin');
            this.openLogin.addEventListener('click', function () {
               Controller.navCtrl('login');
            });

            this.signup = document.getElementById('signup-form');
            this.signup.addEventListener('submit', function (event) {
                event.preventDefault();
                Controller.signupCtrl(name.value, email.value, password.value);
            });
          });
        }
      }
    },
    appView: {
      init: function () {
        this.render();
      },
      render: function () {
        if(localStorage.xAuth && isLoggedin){
           setViews('./views/app.html', function() {
             document.getElementById('username').innerHTML = "Hi Vineet";
             document.getElementById('logout').addEventListener('click', function () {
                 Controller.logoutCtrl();
             });
           })
        }

      }
    }
}

Controller.init();
