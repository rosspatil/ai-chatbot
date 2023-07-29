var p = ["o"];
function start_the_service () {
  if (p[0] === "o") {
    reset()
    var t = document.createElement("div");
    var t2 = document.createElement("script");
    t.id = "chat";
    if (window.innerWidth > window.innerHeight) {
      t.style.width = "29.6%";
      t.style.left = "68%";
      t.style.top = "30vh";
    } else {
      t.style.width = "92.8%";
    }
    t2.src = "script/chat.js";
    document.body.appendChild(t);
    p[0] = "c";
    document.body.appendChild(t2);
    document.getElementById("mn-btn").style.borderRadius = "0px 0px 20px 20px";
  } else {
    document.getElementById('chat').remove();
    p[0] = "o";
    document.getElementById("mn-btn").style.borderRadius = "20px 20px 0px 0px";
    start_the_service()
  }
}
document.body.onload = function () {
  if (window.innerWidth < window.innerHeight) {
    var t = document.getElementById("mn-btn");
    t.style.width = "94%";
    t.style.left = "2vh";
    t.style.top = "75vh";
  }
  console.log("loaded");
}
start_the_service()
function reset () {
  const session_id = sessionStorage.getItem("session_id");
  var xhr = new XMLHttpRequest();
  var url = '/reset/?session_id=' + session_id;
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.setRequestHeader('Access-Control-Allow-Methods', '*');
  xhr.setRequestHeader('Access-Control-Max-Age', ' 86400');
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      sessionStorage.setItem("session_id", uuidv4());
    } else {
      console.error('Request failed with status:', xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error('Network error occurred');
  };
  xhr.send();
}

function uuidv4 () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
