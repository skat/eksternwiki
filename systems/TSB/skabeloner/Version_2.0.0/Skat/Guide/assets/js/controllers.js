
function MenuListCtrl($scope, $location, $route) {

  $scope.$route = $route;

  $scope.getClass = function(path) {
    if ($location.path().substr(0, path.length) == path) {
      return "skts-globalmenu-link-markeret";
    } else {
      return "";
    }
  };

  $scope.menues = [
  {"href": "/skts-introduktion",
    "text": "Introduktion"},
  {"href": "/skts-rammer",
    "text": "Rammer"},
  {"href": "/skts-tags",
    "text": "Tags"},
  {"href": "/skts-teksttyper",
    "text": "Teksttyper"},
  {"href": "/skts-menutyper",
    "text": "Menuer"},
  {"href": "/skts-links",
    "text": "Links"},
  {"href": "/skts-felter",
    "text": "Felter"},
  {"href": "/skts-knapper",
    "text": "Knapper"},
  {"href": "/skts-linjer",
    "text": "Linjer"},
  {"href": "/skts-komponenter",
    "text": "Komponenter"},
  {"href": "/skts-position",
    "text": "Position"},
  {"href": "/skts-javascript",
    "text": "Javascript"},
  {"href": "/skts-udgaaet",
    "text": "Udg&aring;et"}
  ];
}

function ContentCtrl($scope, $location, $route) {
  $scope.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  }
}

