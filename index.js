let network = require('network');
let shell = require('shelljs');

let getActiveInterface = () => {
  return new Promise(resolve => {
    network.get_active_interface((err, interface) => {
      if (err) throw err;

      resolve(interface);
    });
  });
}
(async() => {
  try {
    let { ip_address } = await getActiveInterface();

    let packageExec = shell.exec('adb shell pm list packages -f | grep tk.elevenk.proxysetter', { silent: false });

    if (packageExec.code !== 0) {
      console.log('Proxy apk not installed, installing...');

      shell.exec(`adb install ${__dirname}/proxy-setter-debug-0.2.1.apk`);
    }

    console.log(`Setting proxy ${ip_address}:8080`);

    let result = shell.exec(`adb shell am start -n tk.elevenk.proxysetter/.MainActivity -e host ${ip_address} -e port 8080`, { silent: true });

    if (result.code !== 0) {
      throw stdout.err;
    }

    console.log('Setting proxy successfully!');
  } catch (err) {
    console.log(err);
  }
})();
