/* Sample project using Rajah.
 *
 *  Usage:
 *  1. File menu > Make a copy..            // to create your personal project.
 *  2. File menu > Manage versions..        // put version '1'
 *
 *  3. Publish menu > Deploy as web app...
 *     // Use URL showed in deploy menu "Test web app for your latest code"
 *
 *  4. Before access web page, execute doGet() in debugger for 'Authentication'
 *  5. and access web page!!!
 */

rajah.init(this);

function doGet(e) {
  return rajah.doGet(e);
}

function executeByScript() {
  rajah.executeJasmine();
}

var setTimeout = function(func, t) {
  return rajah.setTimeout(func, t);
};

var clearTimeout = function(id) {
  rajah.clearTimeout(id);
};

var setInterval = function(func, t) {
  return rajah.setInterval(func, t);
};

var clearInterval = function(id) {
  rajah.clearInterval(id);
};
