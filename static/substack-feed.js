(function () {
  var feedUrl = "https://aminmyhead.substack.com/feed";
  
  var proxies = [
    "https://api.allorigins.win/raw?url=",
    "https://corsproxy.io/?",
    "https://api.codetabs.com/v1/proxy?quest="
  ];

  function stripCdata(s) {
    return (s || "").replace(/<!\[CDATA\[|\]\]>/g, "").trim();
  }

  function getTag(xml, tag) {
    var re = new RegExp("<" + tag + "[^>]*>([\\s\\S]*?)</" + tag + ">", "i");
    var m = xml.match(re);
    return m ? stripCdata(m[1]) : "";
  }

  function estimateReadTime(content) {
    var text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    var wordCount = text.split(" ").length;
    var minutes = Math.ceil(wordCount / 200);
    return minutes < 1 ? 1 : minutes;
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    var d = new Date(dateStr);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }

  function parseItems(xml, limit) {
    var items = [];
    var itemRe = /<item>([\s\S]*?)<\/item>/gi;
    var match;
    while ((match = itemRe.exec(xml)) !== null && items.length < (limit || 20)) {
      var block = match[1];
      var title = getTag(block, "title");
      var link = getTag(block, "link");
      var pubDate = getTag(block, "pubDate");
      var content = getTag(block, "content:encoded") || getTag(block, "description");
      var readTime = estimateReadTime(content);
      if (title && link) {
        items.push({ 
          title: title, 
          link: link, 
          pubDate: pubDate, 
          readTime: readTime,
          formattedDate: formatDate(pubDate)
        });
      }
    }
    return items;
  }

  function renderHomePreview(container, posts) {
    if (!container || !posts.length) return;
    var html = "";
    var limit = Math.min(5, posts.length);
    for (var i = 0; i < limit; i++) {
      var p = posts[i];
      html += '<a href="' + p.link + '" target="_blank" rel="noopener" class="blog-list-item">';
      html += '<span class="blog-list-title">' + (p.title || "").replace(/</g, "&lt;") + '</span>';
      html += '<span class="blog-list-meta">' + p.readTime + ' min read</span>';
      html += '</a>';
    }
    container.innerHTML = html;
  }

  function renderBlogGrid(container, posts) {
    if (!container || !posts.length) return;
    var html = "";
    for (var i = 0; i < posts.length; i++) {
      var p = posts[i];
      html += '<a href="' + p.link + '" target="_blank" rel="noopener" class="blog-list-item">';
      html += '<span class="blog-list-title">' + (p.title || "").replace(/</g, "&lt;") + '</span>';
      html += '<span class="blog-list-meta">';
      if (p.formattedDate) html += p.formattedDate + ' · ';
      html += p.readTime + ' min read</span>';
      html += '</a>';
    }
    container.innerHTML = html;
  }

  function tryFetch(proxyIndex) {
    if (proxyIndex >= proxies.length) {
      renderFallback();
      return;
    }
    
    var proxyUrl = proxies[proxyIndex] + encodeURIComponent(feedUrl);
    
    fetch(proxyUrl)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(function (xml) {
        if (!xml || xml.indexOf("<item>") === -1) {
          throw new Error("Invalid RSS");
        }
        var posts = parseItems(xml, 20);
        if (posts.length === 0) {
          throw new Error("No posts found");
        }
        renderHomePreview(document.getElementById("substack-home-preview"), posts);
        renderBlogGrid(document.getElementById("substack-blog-grid"), posts);
      })
      .catch(function (err) {
        tryFetch(proxyIndex + 1);
      });
  }

  function renderFallback() {
    var fallbackPosts = [
      { title: "Introduction", link: "https://aminmyhead.substack.com/", readTime: 3, formattedDate: "Jan 1, 2024" },
      { title: "Supercharge your intern experience", link: "https://aminmyhead.substack.com/", readTime: 5, formattedDate: "Feb 15, 2024" },
      { title: "Why working at a Startup should be a priority", link: "https://aminmyhead.substack.com/", readTime: 6, formattedDate: "Mar 10, 2024" }
    ];

    var homeContainer = document.getElementById("substack-home-preview");
    var blogContainer = document.getElementById("substack-blog-grid");

    if (homeContainer) {
      var html = "";
      for (var i = 0; i < fallbackPosts.length; i++) {
        var p = fallbackPosts[i];
        html += '<a href="' + p.link + '" target="_blank" rel="noopener" class="blog-list-item">';
        html += '<span class="blog-list-title">' + p.title + '</span>';
        html += '<span class="blog-list-meta">' + p.readTime + ' min read</span>';
        html += '</a>';
      }
      homeContainer.innerHTML = html;
    }

    if (blogContainer) {
      var html = "";
      for (var i = 0; i < fallbackPosts.length; i++) {
        var p = fallbackPosts[i];
        html += '<a href="' + p.link + '" target="_blank" rel="noopener" class="blog-list-item">';
        html += '<span class="blog-list-title">' + p.title + '</span>';
        html += '<span class="blog-list-meta">' + p.formattedDate + ' · ' + p.readTime + ' min read</span>';
        html += '</a>';
      }
      blogContainer.innerHTML = html;
    }
  }

  tryFetch(0);
})();
