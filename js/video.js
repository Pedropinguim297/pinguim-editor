/* Thumbnails are plain YouTube links. With JS, a click swaps the thumbnail for
   the player in place, so the heavy embed only loads when someone wants it. */
(function () {
  // YouTube refuses embeds without a Referer (error 153), which is what
  // happens when the page is opened straight from disk. Keep the plain link then.
  if (!/^https?:$/.test(location.protocol)) return;

  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-yt]");
    if (!link) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();

    var id = encodeURIComponent(link.getAttribute("data-yt"));
    var start = link.getAttribute("data-start");
    var iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&origin=" + encodeURIComponent(location.origin) +
      (start ? "&start=" + encodeURIComponent(start) : "");
    iframe.title = link.getAttribute("data-title") || "Vídeo do YouTube";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";

    link.replaceWith(iframe);
    iframe.focus();
  });
})();
