'use strict';

var InfoBarComponent = function (componentId, thisElement) {
  var component = this;

  component.el = thisElement || element(by.id(componentId));
  component.infoBoxes = component.el.all(by.css('.info-box'));
  component.infoBox = function(name) {
    var box = component.el.element(by.css('.info-box.-' + name));
    return {
      el: box,
      title: box.element(by.css('.info-box-content>.title')),
      value: box.element(by.css('.value')),
      badge: function (name) {
        var badge = name ? box.element(by.css('.badge.-' + name)) : box.element(by.css('.badge'));
        return {
          value: badge.element(by.css('.value')),
          title: badge.element(by.css('.title')),
          el: badge
        };
      }
    };
  };
};

module.exports = InfoBarComponent;
