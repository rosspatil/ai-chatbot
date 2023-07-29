
var chatWindow = new Bubbles(document.getElementById("chat"), "chatWindow", {
  inputCallbackFn: function (o) {
    chat(o.input, o)
  }
})

var convo = {
  "ice": {
    says: ["Hi", "How can I help?"],
    reply: [
    ]
  },

}

chatWindow.talk(convo);
function chat (query, o) {
  const session_id = sessionStorage.getItem("session_id");

  var xhr = new XMLHttpRequest();
  var url = '/chat/';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.setRequestHeader('Access-Control-Allow-Methods', '*');
  xhr.setRequestHeader('Access-Control-Max-Age', ' 86400');
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var response = JSON.parse(xhr.responseText);
      console.log('Response:', response);
      chatWindow.talk(
        {
          "chatBot": {
            says: [
              response.reply
            ],
            reply: o.convo[o.standingAnswer].reply
          }
        },
        "chatBot"
      )
    } else {
      console.error('Request failed with status:', xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error('Network error occurred');
  };
  xhr.send(JSON.stringify({ "query": query, "session_id": session_id }));
}