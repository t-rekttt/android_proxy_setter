let network = require('network');
let shell = require('shelljs');

network.get_active_interface(function(err, interface) {
  if (err) return console.log(err);

  let { ip_address } = interface;

  shell.exec(`adb shell am start -n tk.elevenk.proxysetter/.MainActivity -e host ${ip_address} -e port 8080`);
});