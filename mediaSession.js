function mediaControls() {
  if ("mediaSession" in navigator) {
    if (
      document.querySelector(
        "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] span span:nth-child(1) span[class^=DashSeparator]"
      )
    ) {
      // tv
      navigator.mediaSession.metadata = new MediaMetadata({
        title: document.querySelector(
          "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] span a[data-qa-id=metadataTitleLink]"
        ).textContent,
        artist: document.querySelector(
          "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] a[data-qa-id=metadataTitleLink]"
        ).textContent,
        album: document.querySelector(
          "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] span span:nth-child(1)"
        ).textContent,
      });
    } else if (
      document.querySelector(
        "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] span span[class^=DashSeparator]"
      )
    ) {
      // music
      navigator.mediaSession.metadata = new MediaMetadata({
        title: document.querySelector(
          "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] a[data-qa-id=metadataTitleLink]"
        ).textContent,
        artist: document.querySelector(
          "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] span a[data-qa-id=metadataTitleLink]:nth-child(1)"
        ).textContent,
        album: document.querySelector(
          "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] span a[data-qa-id=metadataTitleLink]:nth-child(3)"
        ).textContent,
      });
    } else {
      // movies
      navigator.mediaSession.metadata = new MediaMetadata({
        title: document.querySelector(
          "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] a[data-qa-id=metadataTitleLink]"
        ).textContent,
      });
    }

    // controls
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

    // click functions
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
}

mediaControls(); // needs to be called any time the playing media changes
