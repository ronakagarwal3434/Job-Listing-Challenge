var selected = 0;

var roleSelected = [];

// This function is for hiding the list which does not have the selected role.
function hideListsWithoutRole(role) {

  // Traversing all the list and looking for text inside the <li>.
  for (i = 1; i <= 10; i++) {
    var listNo = i.toString();
    var className = ".list-" + listNo;
    var listText = $(className + " li").text();

    // Hiding the list which does not have the particular "role".
    if (listText.indexOf(role) == -1) {
      $(className).hide();
    }
    else {

    }
  }
}

// This function is for unhiding the list which has the "role".
function unhideListsWithRole() {
  for (j = 1; j <= 10; j++) {
    var listNo = j.toString();
    var className = ".list-" + listNo;
    var listText = $(className + " li").text();

    var foundAllItems = true; // If there is a single role in roleSelected that is not found, mark this as false so we can decide to hide it.

    console.log(listText);

    for (i = 0; i < roleSelected.length; i++) {
      if (listText.indexOf(roleSelected[i]) == -1) {
        foundAllItems = false;
        break; // The moment we find one missing, there's no need to keep checking. We know we don't want to display this entry.
      }
    }

    if (foundAllItems) {
      $(className).show();
    }
    else {
      $(className).hide();
    }
  }
}

// To add the selected role on the top box.
$("li").click(function () {

  // For the first role selection we have to create the new box on the top and then add the selected role.
  if (selected === 0) {
    $(".upper-div").addClass("role-selected");

    // Adding the selecetd role to above box.
    var role = $(this).text();
    $(".upper-div ul").append("<li>" + role + "<span>X</span></li>");
    $(".upper-div span").addClass("X");

    // To make note of number of all the different types of role got selected.
    selected++;

    // To make note of all the different types of role got selected.
    roleSelected.push(role);

    // Hiding the lists which does not contain the selected role.
    hideListsWithoutRole(role);
  }
  else {
    // Adding the selecetd role to above box.
    var role = $(this).text();
    if (!roleSelected.includes(role)) {
      $(".upper-div ul").append("<li>" + role + "<span>X</span></li>");
      $(".upper-div span").addClass("X");

      // To make note of number of all the different types of role got selected.
      selected++;

      // To make note of all the different types of role got selected.
      roleSelected.push(role);

      // Hiding the lists which does not contain the selected role.
      hideListsWithoutRole(role);

    }
  }
});

// To deselect the selected role by clicking on "X".
$(document).on("click", ".X", function () {

  // Removing the element from roleSelected Array.
  var roleWithX = $(event.path[1]).text();
  var temp = roleWithX.substring(0, roleWithX.length - 1);
  var index = roleSelected.indexOf(temp);
  roleSelected[index] = roleSelected[roleSelected.length - 1];
  roleSelected[roleSelected.length - 1] = temp;
  roleSelected.pop();

  // var roleWithX = $(event.path[1]).text();
  // var role = roleWithX.substring(0,roleWithX.length-1);
  // var indexOfRoleInRoleSelected =  roleSelected.indexOf(role);
  // delete roleSelected[indexOfRoleInRoleSelected];  

  // Unhiding.
  unhideListsWithRole();

  // Removing the selected role from above box.
  $(this).remove();
  $(event.path[1]).remove();

});
