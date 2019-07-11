'use strict';

var Obniz = require('obniz');
var crypto = require('crypto');  // crypto が追加で必要 npm i crypto

// Change this to your generated service UUID 
var userServiceUUID = "USER_SERVICE_UUID"; // ここをServiceUUID変更する
// Change this to your Obniz ID
var obniz = new Obniz("YOUR_OBNIZ_ID_HERE");

var psdiServiceUUID = "E625601E-9E55-4597-A598-76018A0D293D";
var psdiCharacteristicUUID = "26E2B12B-85F0-4F3F-9FDD-91D114270E6E";
var notifyCharacteristicUUID = "62FBD229-6EDD-4D1A-B554-5C4E1BB29169";
var writeCharacteristicUUID = "E9062E71-9E62-4BC6-B0D3-35CDCD9B027B";

var customDeviceName = "LINE Things Starter Obniz"

obniz.onconnect = async function () {
  obniz.display.clear();
  obniz.display.print("Obniz Ready");

  obniz.ble.security.setAuth(['bonding']);
  obniz.ble.security.setModeLevel(1, 2);

  obniz.ble.security.onerror = function() {
    console.error('security set params error');
    obniz.reboot();
  };

  const sha256_hash = crypto.createHmac('sha256', obniz.id)
                   .update('I love cupcakes')
                   .digest('hex');

  var psdiCharacteristic = new obniz.ble.characteristic({
    "uuid" : psdiCharacteristicUUID,
    "properties" : ["read"],
    "text" : sha256_hash
  });

  var notifyCharacteristic = new obniz.ble.characteristic({
    "uuid" : notifyCharacteristicUUID,
    "properties" : ["notify"],
    "data" : [0x00],
    "descriptors" : [{
      "uuid" : "2902",
      "data" : [0x00, 0x00]
    }]
  });

  var writeCharacteristic = new obniz.ble.characteristic({
    "uuid" : writeCharacteristicUUID,
    "properties" : ["write"],
    "data" : [0x00]
  });

  var psdiService = new obniz.ble.service({
    "uuid" : psdiServiceUUID,
    "characteristics" : [psdiCharacteristic]
  });
  obniz.ble.peripheral.addService(psdiService);

  var userService = new obniz.ble.service({
    "uuid" : userServiceUUID,
    "characteristics" : [notifyCharacteristic, writeCharacteristic]
  });
  obniz.ble.peripheral.addService(userService); 

  obniz.ble.advertisement.setAdvData(userService.advData);
  obniz.ble.advertisement.setScanRespData({
    localName : customDeviceName
  });
  obniz.ble.advertisement.start();

  writeCharacteristic.onwritefromremote = function(address, newvalue) {

    console.log("remote address :", address);
    console.log("remote data :", newvalue);

    obniz.display.clear();
    obniz.display.print("LIFF -> obniz\n");
    obniz.display.print("value : " + newvalue);
  }

  // https://obniz.io/ja/sdk/parts/LM35DZ/README.md
  var tempsens = obniz.wired("LM35DZ",   { gnd:0 , output:1, vcc:2});
  
  obniz.switch.onchange = async function(state) {
    if (state === "push") {
      await notifyCharacteristic.writeWait([0]);
      notifyCharacteristic.notify();
    } else if (state === "none") {
      var temp = await tempsens.getWait();  // LM35DZ
      temp = Math.floor(temp);
      console.log(temp);
      await notifyCharacteristic.writeWait([Math.floor(temp)]);
      notifyCharacteristic.notify();
    }
  }
}	

