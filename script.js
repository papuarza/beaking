window.onload = () => {
  let botonEdad = document.getElementById('edad');
  let botonRegistro = document.getElementById('registro');
  let error = document.getElementById('error')
  Date.prototype.isValid = function () {
    return this.getTime() === this.getTime();
  };

  function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
  var i, x, y, ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      x = x.replace(/^\s+|\s+$/g, "");
      if (x == c_name) {
          return unescape(y);
      }
  }
}

  let today = new Date();
  let eighteenYearsBack = new Date(today.getMonth() + "/" + today.getDate() + "/" + (today.getFullYear() - 18));
  if(botonEdad) {
  botonEdad.addEventListener('click', (e) => {
    e.preventDefault();
    let dia1 = document.getElementById('dia1').value;
    let dia2 = document.getElementById('dia2').value;
    let mes1 = document.getElementById('mes1').value;
    let mes2 = document.getElementById('mes2').value;
    let ano1 = document.getElementById('ano1').value;
    let ano2 = document.getElementById('ano2').value;
    let ano3 = document.getElementById('ano3').value;
    let ano4 = document.getElementById('ano4').value;
    let recordar = document.getElementById('recordar').checked;
    let dia = "" + dia1 + dia2;
    let mes = "" + mes1 + mes2;
    let ano = "" + ano1 + ano2 + ano3 + ano4;
    let fecha = new Date(`${mes}/${dia}/${ano}`);
    if(fecha.isValid()) {
      if(fecha<eighteenYearsBack) {
        if(!recordar) {
          window.location.href = "index.html";
        } else {
          setCookie('edad','true', 7);
          window.location.href = "index.html";
        }
      }
    } else {
      console.log('Fecha incorrecta')
    }
  })
  }

  if(botonRegistro) {
    botonRegistro.addEventListener('click', (e) => {
      e.preventDefault();
      let terminos = document.getElementById('terminos').checked;
      if(!terminos) {
        error.innerHTML = 'Debe aceptar los términos y condiciones';
      } else {
        let ligas = [];
      let nombre = document.getElementById('nombre').value;
      let apellido = document.getElementById('apellido').value;
      let cedula = document.getElementById('cedula').value;
      let email = document.getElementById('email').value;
      let dias = document.getElementById('dias').value;
      let meses = document.getElementById('meses').value;
      let anos = document.getElementById('anos').value;
      let liga = document.getElementById('liga').checked;
      let premier = document.getElementById('premier').checked;
      let comercial = document.getElementById('premier').checked;
      if(liga) ligas.push("La Liga");
      if(premier) ligas.push("La Premier");
      let fecha = new Date(`${meses}/${dias}/${anos}`);
      if(!fecha.isValid()) {
        error.innerHTML = 'Debe ingresar una fecha correcta';
      } else if(nombre == "" || apellido == "" || cedula == "" || email == "" || ligas.length == 0) {
        error.innerHTML = 'Debe completar todos los campos y seleccionar una Liga';
      } else {
          let body = { nombre, apellido, cedula, email, fecha, ligas, comercial };
          console.log(body)
          window.location.href = "gracias.html";
        }
      }
    })
    }

  }