var page = require('webpage').create();
var testindex = 0;
var loadInProgress = false;
var pageloc;

page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36";
page.settings.localToRemoteUrlAccessEnabled = true;

page.onConsoleMessage = function(msg) {
  console.log(msg);
  console.log(msg.substring(0,53));
  if (msg.substring(0,53) == "Not allowed to load local resource: file://tabvote.js") {
    console.log(msg.substring(53));
    pageloc = "https://polldaddy.com" + msg.substring(53);
  }
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

var steps = [
  function() {
    //load page
    page.open('https://polldaddy.com/poll/9934052');
  },
  function() {
    page.render('tab_before.png');
    page.evaluate(function() {
      $( "#PDI_answer45534691" ).click();
    });
  },
  function() {
    page.render('tab_click.png');
    page.evaluate(function() {
      $(".vote-button").first().click();
    });
  },
  function() {
    page.render('tab_submit.png');
  },
  function() {
    page.open(pageloc);
  },
  function() {
    page.render('tab_done.png');
  }
];

interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    console.log("step " + (testindex + 1));
    steps[testindex]();
    testindex++;
  } else if (typeof steps[testindex] != "function") {
    console.log("Complete!");
    phantom.exit();
  }
}, 500);

