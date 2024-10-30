/*  
<script src="https://telegram.org/js/telegram-web-app.js"></script>
<script src="Echox.js"></script>
*/

var chatId;
var referenceId;

var data;

function initializeTelegram() {
  if (window.Telegram && window.Telegram.WebApp) {
    chatId = window.Telegram.WebApp.initDataUnsafe.user.id;
    referenceId = window.Telegram.WebApp.initDataUnsafe.start_param;
    if (referenceId != null) {
      console.log("ReferenceId", referenceId);
    }
    console.log("chatId:", chatId);

    data = JSON.stringify({
      chatId: chatId.toString(),
      referenceId: referenceId,
    });
  } else {
    console.error("Telegram not available");
  }
}

window.sendDataToUnity = function () {
  if (
    typeof window.unityInstance !== "undefined" &&
    window.unityInstance !== null
  ) {
    window.unityInstance.SendMessage("LoadingBar", "ReceiveChatId", data);
  } else {
    console.error("Unity instance is not ready yet.");
  }
};

document.addEventListener("DOMContentLoaded", initializeTelegram);

window.unityInstanceReady = function (instance) {
  console.log("Unity instance is ready");
  window.unityInstance = instance;
};

//copy webgl fonksiyonu
async function copyReferenceLink(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

// linkler
function openTelegram() {
  window.open("https://t.me/echoxinc", "_blank");
}

function openTwitter() {
  window.open("https://x.com/EchoXInc?t=1b34412313qrxqNJitiCwg&s=08", "_blank");
}

//mobilde klavye

var activeInputElement = null;

function openMobileKeyboard() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    setTimeout(function () {
      //bos bir input html
      var dummyInput = document.createElement("input");
      dummyInput.style.position = "absolute";
      dummyInput.style.opacity = 0;
      dummyInput.style.height = "0px";
      document.body.appendChild(dummyInput);
      dummyInput.focus();

      setTimeout(function () {
        document.body.removeChild(dummyInput);
      }, 100);
    }, 100);
  }
}

function closeMobileKeyboard() {
  if (document.activeElement && document.activeElement.blur) {
    document.activeElement.blur();
  }
}

function onInputFieldSelect() {
  openMobileKeyboard();
}

function onInputFieldDeselect() {
  closeMobileKeyboard();
}
