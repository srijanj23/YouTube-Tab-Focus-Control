# YouTube Focus Play

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Automatically pauses YouTube videos when you switch tabs and resumes playback when you return.  This extension helps you stay focused and conserve bandwidth while multitasking.

## Features

*   **Automatic Pause:** Pauses the currently playing YouTube video when the tab loses focus (becomes inactive).
*   **Automatic Resume:** Resumes playback when the YouTube tab regains focus (becomes active).
*   **Lightweight:**  Minimal impact on browser performance.
*   **No Configuration Needed:** Works out of the box.
*   **SPA Compatible:** Works correctly with YouTube's single-page application design (handles navigation within YouTube).
*  **Open Source:** feel free to contribute.

## Installation (Manual - Unpacked Extension)

Since this extension is not published on the Chrome Web Store, you'll need to install it manually as an unpacked extension:

1.  **Download the Code:**
    *   Clone this repository: `git clone <your-repository-url>`  (Replace `<your-repository-url>` with the actual URL of your GitHub repository).  *OR*
    *   Download the code as a ZIP file (click the "Code" button on the GitHub page, then select "Download ZIP").  Unzip the downloaded file.

2.  **Enable Developer Mode:**
    *   Open Google Chrome.
    *   Go to `chrome://extensions/`.
    *   In the top-right corner, toggle the "Developer mode" switch to the *on* position.

3.  **Load the Extension:**
    *   Click the "Load unpacked" button.
    *   Navigate to the folder where you cloned or unzipped the extension's code (the folder containing `manifest.json`).
    *   Select the folder and click "Open" (or "Select Folder").

4.  **Verify Installation:**
    *   The extension should now appear in your list of extensions on `chrome://extensions/`.  Make sure it's enabled (the toggle switch is blue).
    *   Go to YouTube and open a video to test it.

## How it Works

This extension uses a `content script` that runs on YouTube pages (`https://www.youtube.com/*`).  It uses the `visibilitychange` event to detect when the tab becomes hidden or visible.  A `MutationObserver` is used to handle navigation within YouTube (since YouTube is a Single-Page Application).

## Troubleshooting

*   **Video Doesn't Pause/Resume:**
    *   Make sure the extension is enabled in `chrome://extensions/`.
    *   Reload the extension (click the "Reload" button on the extension's card in `chrome://extensions/`).
    *   Ensure you're on a YouTube video page.
    *   Check the Chrome DevTools console (right-click on the page, select "Inspect," then go to the "Console" tab) for any error messages.
    *   YouTube frequently updates its site. If the extension stops working, the CSS selectors used to find the video element may need to be updated.  See the "Contributing" section below for instructions on how to update the selectors.

*   **Other Issues:**
    *   If you encounter any other problems, please [open an issue](<your-repository-url>/issues) on GitHub (replace `<your-repository-url>` with your repository's URL).  Include detailed steps to reproduce the problem, the URL of the YouTube video you were watching, and any error messages from the console.

## Contributing

Contributions are welcome!  If you find a bug or want to add a feature, please follow these steps:

1.  **Fork the Repository:** Click the "Fork" button on the GitHub page to create your own copy of the repository.
2.  **Create a Branch:** Create a new branch for your changes (e.g., `git checkout -b fix-pause-issue`).
3.  **Make Your Changes:** Modify the code.  If you need to update the CSS selectors for finding the video element:
    *   Open a YouTube video.
    *   Right-click on the video and select "Inspect."
    *   In the DevTools, find the `<video>` tag that represents the main video player.
    *   Identify the best CSS selector (class, ID, or combination) to select the video element.
    *   Update the `getVideoElement` function in `content.js` with the new selector.
    *   Test your changes thoroughly.
4.  **Commit Your Changes:** Commit your changes with a clear and descriptive commit message (e.g., `git commit -m "Fix: Update video element selector"`).
5.  **Push to Your Fork:** Push your changes to your forked repository (e.g., `git push origin fix-pause-issue`).
6.  **Create a Pull Request:** Go to the original repository on GitHub and create a pull request from your branch to the `main` branch.  Describe your changes and why they're needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  (You'll need to create a file named `LICENSE` in your repository and paste the MIT license text into it.)
