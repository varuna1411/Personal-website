(function () {
  var feedUrl = "https://aminmyhead.substack.com/feed";
  var CACHE_KEY = "substack_posts_cache";
  var CACHE_DURATION = 1000 * 60 * 30; // 30 minutes
  
  var proxies = [
    "https://corsproxy.io/?",
    "https://api.allorigins.win/raw?url=",
    "https://api.codetabs.com/v1/proxy?quest="
  ];

  // Load cached posts immediately for instant display
  function loadFromCache() {
    try {
      var cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        var data = JSON.parse(cached);
        if (data.posts && data.posts.length > 0) {
          renderHomePreview(document.getElementById("substack-home-preview"), data.posts);
          renderBlogGrid(document.getElementById("substack-blog-grid"), data.posts);
          return data;
        }
      }
    } catch (e) {}
    return null;
  }

  function saveToCache(posts) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        posts: posts,
        timestamp: Date.now()
      }));
    } catch (e) {}
  }

  function isCacheValid() {
    try {
      var cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        var data = JSON.parse(cached);
        return (Date.now() - data.timestamp) < CACHE_DURATION;
      }
    } catch (e) {}
    return false;
  }

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
    
    // Sort posts by date (newest first)
    var sortedPosts = posts.slice().sort(function(a, b) {
      return new Date(b.pubDate) - new Date(a.pubDate);
    });
    
    var html = "";
    var limit = Math.min(3, sortedPosts.length);
    for (var i = 0; i < limit; i++) {
      var p = sortedPosts[i];
      html += '<a href="' + p.link + '" target="_blank" rel="noopener" class="blog-list-item">';
      html += '<span class="blog-list-title">' + (p.title || "").replace(/</g, "&lt;") + '</span>';
      html += '<span class="blog-list-meta">' + p.readTime + ' min read</span>';
      html += '</a>';
    }
    container.innerHTML = html;
  }

  function getYear(dateStr) {
    if (!dateStr) return "Unknown";
    var d = new Date(dateStr);
    return d.getFullYear().toString();
  }

  function renderBlogGrid(container, posts) {
    if (!container || !posts.length) return;
    
    // Group posts by year
    var postsByYear = {};
    for (var i = 0; i < posts.length; i++) {
      var p = posts[i];
      var year = getYear(p.pubDate);
      if (!postsByYear[year]) {
        postsByYear[year] = [];
      }
      postsByYear[year].push(p);
    }
    
    // Get years sorted in descending order
    var years = Object.keys(postsByYear).sort(function(a, b) {
      return b - a;
    });
    
    var html = "";
    for (var y = 0; y < years.length; y++) {
      var year = years[y];
      var yearPosts = postsByYear[year];
      
      html += '<div class="blog-year-group">';
      html += '<h3 class="blog-year-header">' + year + '</h3>';
      html += '<div class="blog-list">';
      
      for (var i = 0; i < yearPosts.length; i++) {
        var p = yearPosts[i];
        html += '<a href="' + p.link + '" target="_blank" rel="noopener" class="blog-list-item">';
        html += '<span class="blog-list-title">' + (p.title || "").replace(/</g, "&lt;") + '</span>';
        html += '<span class="blog-list-meta">';
        if (p.formattedDate) html += p.formattedDate + ' · ';
        html += p.readTime + ' min read</span>';
        html += '</a>';
      }
      
      html += '</div></div>';
    }
    container.innerHTML = html;
  }

  function tryFetch(proxyIndex) {
    if (proxyIndex >= proxies.length) {
      // Only show fallback if we have no cached data
      if (!loadFromCache()) {
        renderFallback();
      }
      return;
    }
    
    var proxyUrl = proxies[proxyIndex] + encodeURIComponent(feedUrl);
    
    fetch(proxyUrl, { 
      method: 'GET',
      headers: { 'Accept': 'application/rss+xml, application/xml, text/xml' }
    })
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
        // Save to cache for next time
        saveToCache(posts);
        renderHomePreview(document.getElementById("substack-home-preview"), posts);
        renderBlogGrid(document.getElementById("substack-blog-grid"), posts);
      })
      .catch(function (err) {
        tryFetch(proxyIndex + 1);
      });
  }

  function renderFallback() {
    var fallbackPosts = [
      { title: "Introduction", link: "https://aminmyhead.substack.com/", readTime: 3, formattedDate: "Jan 1, 2024", pubDate: "2024-01-01" },
      { title: "Supercharge your intern experience", link: "https://aminmyhead.substack.com/", readTime: 5, formattedDate: "Feb 15, 2024", pubDate: "2024-02-15" },
      { title: "Why working at a Startup should be a priority", link: "https://aminmyhead.substack.com/", readTime: 6, formattedDate: "Mar 10, 2024", pubDate: "2024-03-10" }
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
      renderBlogGrid(blogContainer, fallbackPosts);
    }
  }

  // Load cached data immediately for instant display
  var cachedData = loadFromCache();
  
  // Fetch fresh data in background (skip if cache is still valid)
  if (!isCacheValid()) {
    tryFetch(0);
  }
})();
