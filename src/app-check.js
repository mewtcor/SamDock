
    var favorites = [
      { name: 'Stremio', symbol: 'S', brand: 'stremio', description: 'Your films and shows.', matches: ['stremio'] },
      { name: 'YouTube', symbol: '▶', brand: 'youtube', description: 'Watch what you love.', matches: ['youtube'] },
      { name: 'Netflix', symbol: 'N', brand: 'netflix', description: 'Stories for every mood.', matches: ['netflix'] },
      { name: 'Prime Video', symbol: 'prime video', brand: 'prime', description: 'Films, series and more.', matches: ['prime video', 'amazon prime'] },
      { name: 'Disney+', symbol: 'Disney+', brand: 'disney', description: 'A world of stories.', matches: ['disney+'] },
      { name: 'Apple TV', symbol: 'tv+', brand: 'appletv', description: 'Originals and favourites.', matches: ['apple tv', 'appletv'] }
    ];
    var installed = [];
    var isTv = !!(window.tizen && tizen.application);
    var dock = document.getElementById('dock');
    var notice = document.getElementById('notice');
    var noticeTimer;

    function showNotice(message) {
      notice.textContent = message;
      notice.className = 'show';
      clearTimeout(noticeTimer);
      noticeTimer = setTimeout(function () { notice.className = ''; }, 4000);
    }
    function appFor(item) {
      return installed.find(function (app) {
        return item.matches.indexOf((app.name || '').toLowerCase()) !== -1;
      }) || installed.find(function (app) {
        var name = (app.name || '').toLowerCase();
        return item.matches.some(function (part) { return name.indexOf(part) !== -1; });
      });
    }
    function launch(item) {
      if (!isTv) { showNotice('PC preview. App launching works on the TV.'); return; }
      var app = appFor(item);
      if (!app) { showNotice(item.name + ' is not installed on this TV. Find it in Samsung Apps.'); return; }
      try {
        tizen.application.launch(app.id, function () {}, function (error) {
          showNotice('Could not open ' + item.name + ': ' + error.message);
        });
      } catch (error) { showNotice('Could not open ' + item.name + ': ' + error.message); }
    }
    function renderDock() {
      dock.textContent = '';
      favorites.forEach(function (item) {
        var button = document.createElement('button');
        var app = appFor(item);
        button.className = 'tile ' + item.brand + (isTv && !app ? ' missing' : '');
        button.type = 'button';
        button.innerHTML = '<span class="symbol"></span><span><span class="name"></span><span class="status"></span></span>';
        button.querySelector('.symbol').textContent = item.symbol;
        button.querySelector('.name').textContent = item.name;
        button.querySelector('.status').textContent = isTv ? (app ? 'Open app' : 'Not installed') : 'Preview';
        button.addEventListener('click', function () { launch(item); });
        button.addEventListener('focus', function () {
          document.getElementById('shelfTitle').textContent = item.name;
          document.getElementById('shelfDescription').textContent = isTv && !app ? 'Not installed on this TV' : item.description;
        });
        dock.appendChild(button);
      });
      dock.querySelector('button').focus();
    }
    function updateClock() {
      var now = new Date();
      document.getElementById('time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      document.getElementById('date').textContent = now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });
    }
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 37 || event.keyCode === 39) {
        var buttons = Array.prototype.slice.call(dock.querySelectorAll('button'));
        var index = buttons.indexOf(document.activeElement);
        buttons[(index + (event.keyCode === 39 ? 1 : -1) + buttons.length) % buttons.length].focus();
        event.preventDefault();
      }
      if (event.keyCode === 13 && document.activeElement.tagName === 'BUTTON') {
        event.preventDefault();
        document.activeElement.click();
      }
    });
    updateClock();
    setInterval(updateClock, 10000);
    var wallpapers = document.querySelectorAll('.wallpaper');
    var currentWallpaper = 0;
    setInterval(function () {
      wallpapers[currentWallpaper].classList.remove('active');
      currentWallpaper = (currentWallpaper + 1) % wallpapers.length;
      wallpapers[currentWallpaper].classList.add('active');
    }, 60000);
    renderDock();
    if (isTv) {
      try { tizen.application.getAppsInfo(function (apps) { installed = apps; renderDock(); }, function () { showNotice('Could not read installed apps.'); }); }
      catch (error) { showNotice('Could not read installed apps: ' + error.message); }
    }
