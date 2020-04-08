ymaps.ready(init);

let iconSize = [60, 50];

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
      iconImageHref: "/img/map-pin.png",
      iconImageSize: iconSize,
      iconImageOffset: [-30, -30],
    });
  map.geoObjects.add(point);
}
