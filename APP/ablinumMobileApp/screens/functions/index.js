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
