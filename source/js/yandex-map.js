ymaps.ready(init);

function init() {
  var map = new ymaps.Map("my-map", {
    center: [59.93886466, 30.32310321],
    zoom: 17,
    controls: [],
    behaviors: ["drag"],
  });

  var point = new ymaps.Placemark([59.93886466, 30.32310321],
    {
      hintContent: "Магазин Кэт энерджи",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "img/map-pin.png",
      iconImageSize: [60, 50],
      iconImageOffset: [-30, -30],
    });
  map.geoObjects.add(point);
}
