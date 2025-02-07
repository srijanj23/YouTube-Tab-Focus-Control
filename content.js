"use strict";

let videoElement = null;
let isPageReady = false;

function getVideoElement() {
  // Try the new, most specific selector first
  let video = document.querySelector(".ytp-large-play-button.ytp-button"); // Example - REPLACE THIS!
  if (video) {
    video = video.closest("video"); //select the parent video element.
    if (video) return video;
  }

  // Keep the more general selectors as fallbacks
  video = document.querySelector("video.html5-main-video"); // Less likely to work now
  if (video) {
    return video;
  }

  video = document.querySelector("video"); // Even less likely
  if (video) {
    return video;
  }

  video = document.querySelector("#movie_player video"); // Least likely
  if (video) {
    return video;
  }
  // ... (rest of the function remains the same) ...
}

function handleVisibilityChange() {
  if (!videoElement) {
    //If the page hasn't finished loading, it is pointless to continue.
    return;
  }

  if (document.hidden) {
    // Pause the video when the tab loses focus
    if (!videoElement.paused) {
      // Check if it's already paused
      videoElement.pause();
    }
  } else {
    // Play the video when the tab gains focus
    // Only play if the user didn't manually pause it.
    // Check readyState:  readyState > 2 means the video has loaded enough metadata to play.
    if (videoElement.readyState > 2 && videoElement.paused) {
      videoElement.play().catch((error) => {
        // Autoplay was probably prevented.  Log the error (and possibly show a message to the user)
        console.error("Autoplay failed:", error);
        // You might want to add a UI element here to tell the user to click to play.
      });
    }
  }
}

//DOMContentLoaded is fired when the initial HTML document has been completely loaded and parsed.
document.addEventListener("DOMContentLoaded", async () => {
  videoElement = await getVideoElement(); // Get the video element. Use await because getVideoElement is now asynchronous.
  isPageReady = true;

  if (videoElement) {
    //only add the event listener once the video has been located.
    document.addEventListener("visibilitychange", handleVisibilityChange);
  } else {
    console.error("The video element was not found");
  }
});

//For Single-Page Applications (SPA), like new YouTube layouts, DOMContentLoaded only fires once.
// Use MutationObserver to watch for changes in the DOM that might indicate a new video page has loaded.
const observer = new MutationObserver(async (mutations) => {
  //Check if the video has changed or has just appeared.
  let newVideo = await getVideoElement(); // Re-fetch, as the element might have changed

  if (newVideo && newVideo !== videoElement) {
    //New video has been loaded
    //Remove old one, it is needed to avoid potential memory problems.
    if (videoElement) {
      //remove the listener from old video.
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }

    videoElement = newVideo;

    if (videoElement) {
      //only add the event listener once the video has been located.
      document.addEventListener("visibilitychange", handleVisibilityChange);
      //If the page has been loaded and the user is focused on the tab, play the video.
      handleVisibilityChange(); // Call this to handle the initial state.
    }
  }
});

// Wrap the observer setup in a function to ensure document.body exists and is a valid Node
function startObserving() {
  if (document.body && document.body.nodeType === Node.ELEMENT_NODE) {
    // Start observing the document body for changes in its child nodes or subtree.
    observer.observe(document.body, {
      childList: true, // Watch for additions/removals of child nodes.
      subtree: true, // Watch all descendants, not just direct children.
    });
  } else {
    // If document.body is not yet ready, wait a bit and try again
    setTimeout(startObserving, 50); // Check again in 50ms
  }
}
startObserving();
