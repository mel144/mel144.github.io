// Create your global variables below:
var materials = ["Plastic", "Paper", "Metal", "Glass", "Batteries", "MISC"];
var uses = ["Electronics", "Household", "Garden", "Automotive", "Hazardous", "Food Containers"];
var metals = ["Aluminum", "Brass", "Copper", "Steel", "Zinc", "MISC"];
var ids = ["first", "second", "third", "fourth", "fifth", "sixth"];
var spans = ["one", "two", "three", "four", "five", "six"];
var itemInfo;
var categoryType;
var event;

function init() {
  categoryType = new URLSearchParams(window.location.search);

  document.getElementById("screen").onkeydown = function (ev) {
    search(ev.keyCode);
  }

  if (categoryType.has('type')) {
    console.log(categoryType.get('type'));

    if (categoryType.get('type') == 'Uses') {
      displayCategory(uses);
    } else if (categoryType.get('type') == 'Metal') {
      displayCategory(metals);
    }
    else if (categoryType.get('type') == "Material") {
      displayCategory(materials);
    }
  } else if (categoryType.has('item')) {
    if (categoryType.get('item') == 'Aluminum') {
      itemInfo = "This is extra information about Aluminum and how to recycle it. See the map below for locations.";
      displayItem(false);
    } else if (categoryType.get('item') == 'pizzabox') {
      categoryType = new URLSearchParams("?item=Pizza Box");
      itemInfo = "This item is not recyclable. Pizza boxes that are tarnished with food, or any paper prduct that is stained with grease or food, are not recyclable.";
      displayItem(true);
    }
  } 
};

function mapClick(currentPage) {
  if (currentPage === 'NearMe') {
    var map = document.getElementById("nearMeMap");
    if (map != null) {
      map.src = "images/map06.png";
    }
  }
}

function updateCategory(index) {
  var type = categoryType.get('type');

  if (type == 'Material') {
    if (materials[index] == 'Metal') {
      window.location.href = "Category.html?type=" + materials[index];
    } else {
      window.location.href = "underConstruction.html";
    }
  } else if (type == 'Metal') {
    if (metals[index] == Aluminum) {
      window.location.href = "itemPage.html?item=" + metals[index];
    } else {
      window.location.href = "underConstruction.html";
    }
  } else if (type == 'Uses') {
    window.location.href = "underConstruction.html";
  }
  else {
    window.location.href = "underConstruction.html?type=" + type;
  }
}

function displayCategory(data) {
  var image;
  for (i = 0; i < ids.length; i++){

    image = document.getElementById(ids[i]);

    image.src = "images/" + data[i] + ".png";
    document.getElementById(spans[i]).innerHTML = data[i];
  }
}

function displayItem(hideMap) {
  if (hideMap) {
    document.getElementById("itemMap").style.display = "none";
  }
  document.getElementById("itemName").textContent = categoryType.get('item');
  document.getElementById("itemInfo").textContent = itemInfo;
}

function search(char) {
  var searchText = document.getElementById("searchBar").value;

  if (char == 13) {
    if (searchText.search("izza") != -1 ||
      searchText.search("ardboard") != -1 ||
      searchText.search("ox") != -1) {

      window.location.href = "searchResults.html?type=search";
    } else {
      window.location.href = "underConstruction.html";
    }
  }
}

function goBack() {
  var type = categoryType.get('type');

  switch (type) {
    case 'Plastic':
    case "Paper":
    case "Metal":
    case "Glass":
    case "Batteries":
      console.log("here");
      window.location.href = "Category.html?type=Material";
      break
    case "Electronics":
    case "Household":
    case "Garden":
    case "Automotive":
    case "Hazardous":
    case "Food Containers":
      window.location.href = "Category.html?type=Uses";
      break;
    case "Aluminum":
    case "Brass":
    case "Copper":
    case "Steel":
    case "Zinc":
      window.location.href = "Category.html?type=Metal";
    default:
      window.location.href = "HomePage.html";
  }
}

init();
