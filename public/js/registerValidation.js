// < !--Course: Web Application development
// Date: 2021 / 07 / 08
// Author: Sujani Wijesundera
// User / customer registration input validation JS.
// -->

function validateForm() {// validate the form 

    //get the input fields values
    var firstName = document.getElementById("txtFirstName");
    fName = firstName.value;

    var lastName = document.getElementById("txtLastName");
    lName = lastName.value;

    var pwd = document.getElementById("txtPassword").value;
    var confirmPwd = document.getElementById("txtConfirmPassword").value;

    var email = document.getElementById("txtEmail").value;
    var postalCode = document.getElementById("txtPostalCode").value;

    //check the first name empty or length less than 4
    if (fName == "" || fName.length < 4) {
        var nameDes = document.getElementById("nameDescription"); // span id for user guide description

        nameDes.innerText = null; // delete the previous description guide message when user is going to enter data.
        myField = document.getElementById("myFieldSet"); //get the field set
        var height = myField.offsetHeight; // get the height of the fieldset

        myField.style.height = (height + 20) + "px"; // increase the height to display message properly
        document.getElementById("blankMsgName").innerHTML = "**First Name Can't be empty or too short"; // set the error message to span
        return false;

    }
    //check the first name is a number
    if (!isNaN(firstName)) {
        var nameDes = document.getElementById("nameDescription");
        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");
        var height = document.getElementById('myFieldSet').offsetHeight;
        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgName").innerHTML = "**Only characters are allowed";
        return false;
    }

    //check the last name empty or length less than 6
    if (lName == "" || lName.length < 6) {
        var nameDes = document.getElementById("lNameDescription");
        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");
        var height = document.getElementById('myFieldSet').offsetHeight;
        myField.style.height = (height + 40) + "px";
        document.getElementById("blankMsgLName").innerHTML = "**Last Name Can't be empty or too short";
        return false;
    }

    //character data validation
    if (!isNaN(lName)) {
        document.getElementById("blankMsgLName").innerHTML = "**Only characters are allowed";
        return false;
    }

    //check empty password field
    if (pwd == "") {
        var nameDes = document.getElementById("pNameDescription");

        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");

        var height = document.getElementById('myFieldSet').offsetHeight;

        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgPName").innerHTML = "**Password must not be empty";
        return false;
    }


    //minimum password length validation
    if (pwd.length < 8) {
        var nameDes = document.getElementById("pNameDescription");

        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");

        var height = document.getElementById('myFieldSet').offsetHeight;

        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgPName").innerHTML = "**Minimum Password Length is 8";
        return false;
    }

    //maximum length of password validation
    if (pwd.length > 15) {
        var nameDes = document.getElementById("pNameDescription");

        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");

        var height = document.getElementById('myFieldSet').offsetHeight;

        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgPName").innerHTML = "**Maximum Password Length is 15";
        return false;
    }

    //check password has special characters,
    if (pwd.indexOf("%") != -1 || pwd.indexOf("&") != -1) {

        var nameDes = document.getElementById("pNameDescription");

        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");

        var height = document.getElementById('myFieldSet').offsetHeight;

        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgPName").innerHTML = "**Special Characters %,& are not allowed.";
        return false;
    }


    //check empty confirm password field
    if (confirmPwd == "") {
        var nameDes = document.getElementById("pConfirmNameDescription");

        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");

        var height = document.getElementById('myFieldSet').offsetHeight;

        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgPConfirmName").innerHTML = "**Confirm Password should not be empty.";
        return false;
    }
    //check password and confirm password are same or not
    if (pwd != confirmPwd) {
        var nameDes = document.getElementById("pConfirmNameDescription");
        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");
        var height = document.getElementById('myFieldSet').offsetHeight;
        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgPConfirmName").innerHTML = "**Confirm Password does not match with the password.";
        return false;
    }

    //check empty email field
    if (email == "" || email.length < 6) {
        var nameDes = document.getElementById("EmailDescription");

        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");

        var height = document.getElementById('myFieldSet').offsetHeight;

        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgEmail").innerHTML = "**Email Address Should Not Be Empty or too short.";
        return false;
    }

    //check valid email
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        var nameDes = document.getElementById("EmailDescription");

        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");

        var height = document.getElementById('myFieldSet').offsetHeight;

        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgEmail").innerHTML = "**Enter Valid Email Address.";
        return false;
    }


    if (!validatePostalCode()) {
        var nameDes = document.getElementById("postalDescription");

        nameDes.innerText = null;
        myField = document.getElementById("myFieldSet");

        var height = document.getElementById('myFieldSet').offsetHeight;

        myField.style.height = (height + 20) + "px";
        document.getElementById("blankMsgPostal").innerHTML = "**Enter Valid Postal Code.";
        return false;
    }


    return true;
}
//Validate the postalcode if user enters it
//refer the source https://patriqueouimet.ca/tip/canadian-postal-code-regex-in-javascript    
function validatePostalCode() {
    postalCode = document.getElementById("txtPostalCode").value;
    if (postalCode == "") {
        return true;
    }
    else {
        const postalCodeRegex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d$/i);
        if (postalCodeRegex.test(postalCode)) {
            return true;
        }
        else {
            return false;
        }
    }
}






