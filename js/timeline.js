/* The nav is an editing timeline: clip widths match section heights,
   the playhead and timecode follow the scroll position. */
(function () {
  var nav = document.querySelector(".timeline");
  if (!nav) return;

  var track = nav.querySelector(".timeline__track");
  var playhead = nav.querySelector(".playhead");
  var timecode = document.querySelector("[data-timecode]");
  var links = Array.prototype.slice.call(track.querySelectorAll("a"));
  var sections = links.map(function (a) {
    return document.querySelector(a.hash);
  });

  var FPS = 30;
  var DURATION = 3 * 60 + 30; // fake runtime of the "edit", in seconds
  var tops = [];
  var heights = [];
  var queued = false;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function measure() {
    var y = window.scrollY;
    tops = [];
    heights = [];
    sections.forEach(function (section, i) {
      var rect = section.getBoundingClientRect();
      tops.push(rect.top + y);
      heights.push(rect.height);
      links[i].parentElement.style.setProperty("--w", Math.max(rect.height, 1));
    });
    update();
  }

  function update() {
    queued = false;
    var doc = document.documentElement;
    var maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
    var progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

    // A reading line that sweeps the whole document as you scroll.
    var line = progress * doc.scrollHeight;
    var active = 0;
    for (var i = 0; i < tops.length; i++) {
      if (line >= tops[i]) active = i;
    }
    var within = Math.min(Math.max((line - tops[active]) / heights[active], 0), 1);

    var trackLeft = track.getBoundingClientRect().left;
    var clip = links[active].getBoundingClientRect();
    var x = clip.left - trackLeft + within * clip.width;
    playhead.style.transform = "translateX(" + x.toFixed(1) + "px)";

    links.forEach(function (link, i) {
      if (i === active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });

    if (timecode) {
      var frames = Math.round(progress * DURATION * FPS);
      var s = Math.floor(frames / FPS);
      timecode.textContent =
        "00:" + pad(Math.floor(s / 60)) + ":" + pad(s % 60) + ":" + pad(frames % FPS);
    }
  }

  function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  if ("ResizeObserver" in window) new ResizeObserver(measure).observe(document.body);
  measure();
})();
