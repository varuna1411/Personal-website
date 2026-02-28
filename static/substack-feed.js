(function () {
  var feedUrl = "https://aminmyhead.substack.com/feed";
  var proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(feedUrl);

  function stripCdata(s) {
    return (s || "").replace(/<!\[CDATA\[|\]\]>/g, "").trim();
  }

  function getTag(xml, tag) {
    var re = new RegExp("<" + tag + "[^>]*>([\\s\\S]*?)</" + tag + ">", "i");
    var m = xml.match(re);
    return m ? stripCdata(m[1]) : "";
  }

  function formatDate(str) {
    try {
      var d = new Date(str);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch (e) {
      return str;
    }
  }

  function parseItems(xml, limit) {
    var items = [];
    var itemRe = /<item>([\s\S]*?)<\/item>/gi;
    var match;
    while ((match = itemRe.exec(xml)) !== null && items.length < (limit || 10)) {
      var block = match[1];
      var title = getTag(block, "title");
      var link = getTag(block, "link");
      var pubDate = getTag(block, "pubDate");
      var desc = getTag(block, "description") || getTag(block, "content:encoded");
      if (desc) {
        desc = desc.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
        if (desc.length >= 160) desc += "\u2026";
      }
      if (title && link) items.push({ title: title, link: link, pubDate: pubDate, description: desc });
    }
    return items;
  }

  function renderHomePreview(container, posts) {
    if (!container || !posts.length) return;
    var html = "";
    for (var i = 0; i < Math.min(3, posts.length); i++) {
      var p = posts[i];
      html += '<a href="' + p.link + '" target="_blank" rel="noopener" class="card-link">';
      html += '<div class="card-image"><img src="https://picsum.photos/seed/s' + (i + 1) + '/800/500" alt=""></div>';
      html += '<h3 class="card-title font-display">' + (p.title || "").replace(/</g, "&lt;") + "</h3>";
      html += '<p class="card-excerpt">' + (p.description || "").replace(/</g, "&lt;") + "</p>";
      if (p.pubDate) html += '<span class="card-date">' + formatDate(p.pubDate) + "</span>";
      html += "</a>";
    }
    container.innerHTML = html;
  }

  function renderBlogGrid(container, posts) {
    if (!container || !posts.length) return;
    var html = "";
    for (var i = 0; i < posts.length; i++) {
      var p = posts[i];
      html += '<a href="' + p.link + '" target="_blank" rel="noopener" class="card-link">';
      html += '<div class="card-image"><img src="https://picsum.photos/seed/sb' + i + '/800/500" alt=""></div>';
      html += '<h2 class="card-title font-display">' + (p.title || "").replace(/</g, "&lt;") + "</h2>";
      html += '<p class="card-excerpt">' + (p.description || "").replace(/</g, "&lt;") + "</p>";
      if (p.pubDate) html += '<span class="card-date">' + formatDate(p.pubDate) + "</span>";
      html += '<span class="read-more">Read on Substack →</span>';
      html += "</a>";
    }
    container.innerHTML = html;
  }

  fetch(proxyUrl)
    .then(function (r) { return r.text(); })
    .then(function (xml) {
      var posts = parseItems(xml, 12);
      renderHomePreview(document.getElementById("substack-home-preview"), posts);
      renderBlogGrid(document.getElementById("substack-blog-grid"), posts);
    })
    .catch(function () {});
})();
