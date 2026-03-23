(function (global) {

var dc = {};
var homeHtmlUrl = "snippets/home-snippet.html";
var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

function insertHtml(selector, html) {
  document.querySelector(selector).innerHTML = html;
}

function showLoading(selector) {
  insertHtml(selector, "<div class='text-center'>Loading...</div>");
}

document.addEventListener("DOMContentLoaded", function () {
  showLoading("#main-content");

  $ajaxUtils.sendGetRequest(homeHtmlUrl, function (responseText) {
    insertHtml("#main-content", responseText);
  }, false);

  document.addEventListener("click", function (event) {
    if (event.target.closest("#specials-tile")) {
      loadRandomCategory();
    }
  });
});

function loadRandomCategory() {
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    function (response) {
      var randomCategory = chooseRandomCategory(response);
      var short_name = "'" + randomCategory.short_name + "'";
      dc.loadMenuItems(short_name);
    }
  );
}

function chooseRandomCategory(categories) {
  var randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

dc.loadMenuItems = function (categoryShort) {
  alert("Loaded category: " + categoryShort);
};

global.$dc = dc;

})(window);
