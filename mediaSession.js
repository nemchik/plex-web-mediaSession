function mediaControls() {
  if ("mediaSession" in navigator) {
    if (
      // if tv is playing
      // hopefully Plex implements a better method of indicating when this type of media is playing
      // we're just checking for the existence of specific elements on the page
      document.querySelector(
        "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] span span:nth-child(1) span[class^=DashSeparator]"
      )
    ) {
      // add metadata for tv
      // because of the differences in movies, music, and tv, it would be great if Plex were to add specific id attributes
      // or data-* attributes to the elements used below so that selecting them is simpler and more concise
      // ex: data-ms-id=title
      // ex: data-ms-id=artist
      // ex: data-ms-id=album
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
      // if music is playing
      // hopefully Plex implements a better method of indicating when this type of media is playing
      // we're just checking for the existence of specific elements on the page
      document.querySelector(
        "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] span span[class^=DashSeparator]"
      )
    ) {
      // add metadata for music
      // because of the differences in movies, music, and tv, it would be great if Plex were to add specific id attributes
      // or data-* attributes to the elements used below so that selecting them is simpler and more concise
      // ex: data-ms-id=title
      // ex: data-ms-id=artist
      // ex: data-ms-id=album
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
      // add metadata for movies
      // hopefully Plex implements a better method of indicating when this type of media is playing
      // we're just checking for the existence of specific elements on the page
      // because of the differences in movies, music, and tv, it would be great if Plex were to add specific id attributes
      // or data-* attributes to the elements used below so that selecting them is simpler and more concise
      // ex: data-ms-id=title
      // movies only uses title
      navigator.mediaSession.metadata = new MediaMetadata({
        title: document.querySelector(
          "div[data-qa-id=playerControlsContainer] div[class^=PlayerControlsMetadata] a[data-qa-id=metadataTitleLink]"
        ).textContent,
      });
    }

    // controls
    navigator.mediaSession.setActionHandler("previoustrack", function () {
      // ideally plex would call their own javascript functions that actually perform these button actions
      // rather than simulating clicks on the elements that end up calling the functions anyway
      simulateClick(
        document.querySelector(
          "div[data-qa-id=playerControlsContainer] button[data-qa-id=previousButton]"
        )
      );
    });
    navigator.mediaSession.setActionHandler("nexttrack", function () {
      // ideally plex would call their own javascript functions that actually perform these button actions
      // rather than simulating clicks on the elements that end up calling the functions anyway
      simulateClick(
        document.querySelector(
          "div[data-qa-id=playerControlsContainer] button[data-qa-id=nextButton]"
        )
      );
    });
    navigator.mediaSession.setActionHandler("play", function () {
      // ideally plex would call their own javascript functions that actually perform these button actions
      // rather than simulating clicks on the elements that end up calling the functions anyway
      simulateClick(
        document.querySelector(
          "div[data-qa-id=playerControlsContainer] button[data-qa-id=resumeButton]"
        )
      );
    });
    navigator.mediaSession.setActionHandler("pause", function () {
      // ideally plex would call their own javascript functions that actually perform these button actions
      // rather than simulating clicks on the elements that end up calling the functions anyway
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

// everything below this point is just a quick way for this script to detect when changes happen to the playing media
// Plex hopefully already has events they are creating
// and events they are listening for in other scripts and could use what they already have

// Select the node that will be observed for mutations
var targetNode = document.querySelector(
  "div[data-qa-id=playerControlsContainer]"
);

// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (var mutation of mutationsList) {
    mediaControls();
  }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
