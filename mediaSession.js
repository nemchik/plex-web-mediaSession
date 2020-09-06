if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: document.querySelector(
      "div[data-qa-id=playerControlsContainer] a[data-qa-id=metadataTitleLink]"
    ).textContent,
    artist: document.querySelector(
      "div[data-qa-id=playerControlsContainer] span a[data-qa-id=metadataTitleLink]:nth-child(1)"
    ).textContent,
    album: document.querySelector(
      "div[data-qa-id=playerControlsContainer] span a[data-qa-id=metadataTitleLink]:nth-child(1)"
    ).textContent,
  });

  navigator.mediaSession.setActionHandler("previoustrack", function () {
    simulateClick(
      document.querySelector(
        "div[data-qa-id=playerControlsContainer] button[data-qa-id=previousButton]"
      )
    );
  });
  navigator.mediaSession.setActionHandler("nexttrack", function () {
    simulateClick(
      document.querySelector(
        "div[data-qa-id=playerControlsContainer] button[data-qa-id=nextButton]"
      )
    );
  });
  navigator.mediaSession.setActionHandler("play", function () {
    simulateClick(
      document.querySelector(
        "div[data-qa-id=playerControlsContainer] button[data-qa-id=resumeButton]"
      )
    );
  });
  navigator.mediaSession.setActionHandler("pause", function () {
    simulateClick(
      document.querySelector(
        "div[data-qa-id=playerControlsContainer] button[data-qa-id=pauseButton]"
      )
    );
  });

  function simulateClick(targetNode) {
    if (targetNode) {
      //--- Simulate a natural mouse-click sequence.
      triggerMouseEvent(targetNode, "mouseover");
      triggerMouseEvent(targetNode, "mousedown");
      triggerMouseEvent(targetNode, "mouseup");
      triggerMouseEvent(targetNode, "click");
    } else console.log("*** Target node not found!");
  }
  function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
  }
}
