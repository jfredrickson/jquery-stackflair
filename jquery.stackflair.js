(function ($) {
  $.fn.stackflair = function (options) {
    var apiKey = 'oqFdVxOq65VMmykWDEz6qQ((';
    
    var defaults = {
      site: 'stackoverflow.com',
      userId: 1,
      classPrefix: 'jquery-stackflair-'
    };
    var settings = $.extend(defaults, options);
    
    var containers = [];
    
    this.each(function () {
      var container = $(this);
      var flair = $('<div/>').addClass(settings.classPrefix + 'container');
      flair.appendTo(container);
      containers.push(flair);
    });
    
    var buildBadgeData = function (user, badgeType) {
      var badge = $('<span/>').addClass(settings.classPrefix + badgeType);
      var badgeIcon = $('<span/>').addClass(settings.classPrefix + badgeType + '-icon');
      var badgeCount = $('<span/>').addClass(settings.classPrefix + badgeType + '-count');
      badgeIcon.html('&#9679;');
      badgeCount.html(user.badge_counts[badgeType]);
      badge.append(badgeIcon);
      badge.append(badgeCount);
      return badge;
    };
    
    var buildFlair = function (user) {
      containers.forEach(function (entry) {
        var flair = entry;
        var flairInner = $('<div/>').addClass(settings.classPrefix + 'inner');
        var userLink = $('<a/>').attr('href', user.link);
        flairInner.appendTo(userLink);
        userLink.appendTo(flair);
        
        var image = $('<img/>').attr({
          src: user.profile_image,
          alt: user.display_name
        });
        
        var displayName = $('<div/>').addClass(settings.classPrefix + 'displayname');
        displayName.html(user.display_name);
        
        var reputation = $('<div/>').addClass(settings.classPrefix + 'reputation');
        reputation.html(user.reputation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        
        var badges = $('<div/>').addClass(settings.classPrefix + 'badges');
        badges.append(buildBadgeData(user, 'gold'));
        badges.append(buildBadgeData(user, 'silver'));
        badges.append(buildBadgeData(user, 'bronze'));
        
        var info = $('<div/>').addClass(settings.classPrefix + 'info');
        info.append(displayName);
        info.append(reputation);
        info.append(badges);
        
        flairInner.append(image);
        flairInner.append(info);
      });
    };
    
    $.ajax({
      url: 'https://api.stackexchange.com/2.2/users/' + settings.userId + '?site=' + settings.site + '&jsonp=?',
      dataType: 'jsonp',
      data: {
        apikey: apiKey
      },
      success: function (data) {
        buildFlair(data['items'][0]);
      }
    });
    
    return this;
    
  };
}(jQuery));