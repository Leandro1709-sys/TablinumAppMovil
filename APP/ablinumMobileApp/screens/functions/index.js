export function subespecimen(id) {
  var nro = id.slice(0, id.length - 3);
  var sub = id.slice(id.length - 3);

  var result = "";

  if (sub == "000") {
    result = nro;
  } else {
    result = nro + "-" + sub;
  }

  return result;
}

export function decimalAGrado(lat, lng) {
  var latn =
    Math.abs(
      lat
    ); /* Devuelve el valor absoluto de un número, sea positivo o negativo */
  var latgr = Math.floor(
    latn * 1
  ); /* Redondea un número hacia abajo a su entero más cercano */
  var latmin = Math.floor(
    (latn - latgr) * 60
  ); /* Vamos restando el número entero para transformarlo en minutos */
  var latseg =
    ((latn - latgr) * 60 - latmin) *
    60; /* Restamos el entero  anterior ahora para segundos */
  var latc =
    latgr +
    "º " +
    latmin +
    "' " +
    latseg.toFixed(2) +
    '"'; /* Prolongamos a centésimas de segundo */
  var corlat;
  var x;
  var y;

  if (lat > 0) {
    x = "N " + latc; /* Si el número original era positivo, es Norte */
    corlat = "N";
  } else {
    x = "S " + latc; /* Si el número original era negativo, es Sur */
    corlat = "S";
  } /* Repetimos el proceso para la longitud (Este, -W-Oeste) */

  var lngn = Math.abs(lng);
  var lnggr = Math.floor(lngn * 1);
  var lngmin = Math.floor((lngn - lnggr) * 60);
  var lngseg = ((lngn - lnggr) * 60 - lngmin) * 60;
  var lngc = lnggr + "º " + lngmin + "' " + lngseg.toFixed(2) + '"';
  var corlong;

  if (lng > 0) {
    y = "E " + lngc;
    corlong = "E";
  } else {
    y = "W " + lngc;
    corlong = "W";
  }

  var result = {
    latitud: {
      completa: x,
      gra: latgr,
      min: latmin,
      seg: latseg,
      coord: corlat,
    },
    longitud: {
      completa: y,
      gra: lnggr,
      min: lngmin,
      seg: lngseg,
      coord: corlong,
    },
  };

  return result;
}
