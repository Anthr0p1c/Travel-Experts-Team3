function redirect() { //send search parameter to the google
    var search = document.getElementById("search").value;

    document.getElementById("search").value = "Search";
    document.getElementById("search").setAttribute("placeholder", "");
    window.location.assign("http://www.google.com/search?q=" + search);

    return true;
}

function clearSearchButton() { // clear the search button after sending the search query.
    document.getElementById("search").setAttribute("placeholder", "");
    document.getElementById("search").value = "";
    return true;
}

function openImageInWindow(packageInfo) { // when click the "QuickSearch" button new window open with package information
    var myWindow = window.open("Package", "",
        "toolbar=no,scrollbars=yes,resizable=yes,top=100,left=600,width=400,height=400");
    myWindow.document.write("<p>" + packageInfo + "</p>");
    myWindow.document.title = "Quick View";


}
