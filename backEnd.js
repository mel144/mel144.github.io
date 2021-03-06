// Create your global variables below:
var materials = ["Plastic", "Paper", "Metal", "Glass", "Batteries", "MISC"];
var uses = ["Electronics", "Household", "Garden", "Automotive", "Hazardous", "Food"];
var metals = ["Aluminum", "Brass", "Copper", "Steel", "Iron", "MISC"];
var electronics = ["Computer", "Phone", "Calculator", "MP3 Player", "Chargers", "MISC"];
var ids = ["first", "second", "third", "fourth", "fifth", "sixth"];
var spans = ["one", "two", "three", "four", "five", "six"];
var itemInfo;
var categoryType;
var event;
var nearMe2 = false;

function init() {
  categoryType = new URLSearchParams(window.location.search);

  document.getElementById("screen").onkeydown = function (ev) {
    search(ev.keyCode);
  }

  if (categoryType.has('text')) {
    console.log(categoryType.get('text'));
    document.getElementById("searchBar").value = categoryType.get('text');
  }

  if (document.getElementById("directions") != null) {
    document.getElementById("directions").hidden = true;
  }

  if (categoryType.has('type')) {
    console.log(categoryType.get('type'));

    if (categoryType.get('type') == 'Uses') {
      displayCategory(uses);
      document.getElementById("title").innerHTML = "Uses";
    } else if (categoryType.get('type') == 'Metal') {
      displayCategory(metals);
      document.getElementById("title").innerHTML = "Metals";
    }
    else if (categoryType.get('type') == "Material") {
      displayCategory(materials);
      document.getElementById("title").innerHTML = "Materials";
    } else if (categoryType.get('type') == 'Electronics') {
      displayCategory(electronics);
      document.getElementById("title").innerHTML = "Electronics";
    }
  } else if (categoryType.has('item')) {
    if (categoryType.get('item') == 'Aluminum') {
      document.getElementById("title").innerHTML = "Aluminum";
      itemInfo = "There is no limit to the amount of times aluminum cans can be recycled. Aluminum does not need to be cleaned before recycling. See the map below for locations to recycle aluminum.";
      displayItem(false);
    } else if (categoryType.get('item') == 'pizzabox') {
      document.getElementById("title").innerHTML = "Pizza Box";
      categoryType = new URLSearchParams("?item=Cardboard Pizza Box");
      itemInfo = "This item is not recyclable. Pizza boxes that are tarnished with food, or any paper products that are stained with grease, are not recyclable.";
      displayItem(true);
    }
  } 
};

function mapClick(currentPage) {
  if (currentPage === 'NearMe') {
    var newHeight = "485px";
    var map = document.getElementById("nearMeMap");
    if (map != null) {
      map.style.height = newHeight;
      map.src = "images/map09V2.png";
      document.getElementById("tech").hidden = true;
      document.getElementById("directions").hidden = false;
      categoryType = new URLSearchParams("?type=nearMe2");
    }
  } else if (currentPage == 'directions') {
    var map = document.getElementById("nearMeMap");
    if (map != null) {
      map.style.height = newHeight;
      categoryType = new URLSearchParams("?type=nearMe3");
      document.getElementById("directions").hidden = true;
      map.src = "images/directionsV2.jpg";
    }
  } else if (currentPage == 'item') {
    var map = document.getElementById("itemMap");
    if (map != null) {
      map.src = "images/map10.png";
      document.getElementById("item-Tech").hidden = true;
      document.getElementById("item-Directions").hidden = false;
      categoryType = new URLSearchParams("?type=item2");
    }
  } else if (currentPage == 'item-Directions') {
    console.log("item-directions");
    var map = document.getElementById("itemMap");
    if(map != null) {
      categoryType = new URLSearchParams("?type=item3");
      document.getElementById("item-Directions").hidden = true;
      map.src = "images/map11.png";
    }
  }
}

function updateCategory(index) {
  var type = categoryType.get('type');

  if (type == 'Material') {
    if (materials[index] == 'Metal') {
      window.location.href = "Category.html?type=" + materials[index];
    } else {
      window.location.href = "underConstruction.html?prev='" + window.location.href + "'";
    }
  } else if (type == 'Metal') {
    if (metals[index] == 'Aluminum') {
      window.location.href = "ItemPage.html?item=" + metals[index];
    } else {
      window.location.href = "underConstruction.html?prev='" + window.location.href + "'";
    }
  } else if (type == 'Uses') {
    if (uses[index] == 'Electronics') {
      window.location.href = "Category.html?type=" + uses[index];
    } else {
      window.location.href = "underConstruction.html?prev='" + window.location.href + "'";
    }
  } 
  else {
    window.location.href = "underConstruction.html?prev='" + window.location.href + "'";
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
      searchText.search("ox") != -1 ||
      searchText.search("laze") != -1) {

      window.location.href = "searchResults.html?type=search&text=" + searchText;
    } else {
      window.location.href = "underConstruction.html?prev='" + window.location.href + "'";
    }
  }
}

function goBack() {
  if (categoryType.has('prev')) {
    var loc = categoryType.get('prev');
    window.location.href = loc.substring(1, loc.length - 1);
  } else if (categoryType.has('item')) {
    var item = categoryType.get('item');
    console.log(item);
    switch (item) {
      case 'Cardboard Pizza Box':
        window.location.href = "searchResults.html?type=search&text=pizza";
        break;
      case 'Aluminum':
        window.location.href = "Category.html?type=Metal";
        break;
      default:
        window.location.href = "HomePage.html";
    }
  } else {
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
      case "Food":
        window.location.href = "Category.html?type=Uses";
        break;
      case "Aluminum":
      case "Brass":
      case "Copper":
      case "Steel":
      case "Iron":
        window.location.href = "Category.html?type=Metal";
        break;
      case "nearMe2":
        window.location.href = "NearMe.html?type=nearMe";
        break;
      case "nearMe3":
        mapClick('NearMe');
        break;
      case "item2":
        window.location.href = "ItemPage.html?item=Aluminum";
        break;
      case "item3":
        mapClick('item');
        break;
      default:
        window.location.href = "HomePage.html";
    }
  }
}

function goHome() {
  window.location.href = "HomePage.html";
}

init();
