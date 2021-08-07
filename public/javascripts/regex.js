function Validate()
{
    const formData = {
        email: function() { return document.getElementById("email").value},
        password:function() { return document.getElementById("password").value},
        fname:function() { return document.getElementById("fname").value},
        lname:function() { return document.getElementById("lname").value},
        address:function() { return document.getElementById("address").value},
        postal:function() { return document.getElementById("postal").value},
        province:function() { return document.getElementById("province").value},
        country:function() { return document.getElementById("country").value}
    }

    regexEmail = /^[^\\s@]+@[^\s@]+\.[^\s@]+$/
    regexPassword = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/
    regexAddress = /^\s*\S+(?:\s+\S+){2}/
    regexPostal = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/

    returnString = ""
    for (x in formData) {
        if (formData[x].length < 1) {
            returnString = "All elements must be filled out."
        }
        else if (regexEmail.test(formData[email])==false){
            returnString = "Must use a valid email address."
        }
        else if (regexPassword.test(formData[password])==false){
            returnString = "Must use a valid email address."
        }
        else if (regexAddress.test(formData[address])==false){
            returnString = "Must use a valid email address."
        }
        else if (regexPostal.test(formData[postal])==false){
            returnString = "Must use a valid email address."
        }
    }

    if (returnString != "") {
       return document.getElementById("errors").innerHTML = returnString
    }
    
    return true

}