exports = loginPayload => {
  const crypto = require("crypto");
  const base64 = require("js-base64");
  loginPayload = JSON.parse(base64.decode(loginPayload));
  keys = Object.keys(loginPayload);
  var i,
    len = keys.length;
  keys.sort();
  //var data_check_string = ""
  var data_check_string =
    "auth_date=1690125207\nfirst_name=Pietro\nid=5536432222\nusername=contrasd";
  // for (i = 0; i < len; i++) {
  //     k = keys[i];
  //     data_check_string = data_check_string.concat(k, "=", loginPayload[k], "\n")
  //   }
  //   data_check_string = data_check_string.slice(0, -2);
  console.log(JSON.stringify(data_check_string));
  var hash = loginPayload["hash"];
  //var secret_key = "2c1507932b3b5f5aa6e009579ba9842ebcda389fa726db5fe7965b49369d9890";
  var secret_key = crypto
    .createHash("sha256")
    .update("6023420916:AAE9d6RRHCkAhXmz0evKc4fRjZb7oniU2vc")
    .digest("hex");
  var calculated_hmac = crypto
    .createHmac("sha256", secret_key)
    .update(data_check_string)
    .digest("hex");

  return hash == calculated_hmac;
};
