   //David Grant
   
   //Regex Validation
    function Validate() {
      
        emailD=document.getElementById("email").value
        passwordD=document.getElementById("password").value
        passwordDB=document.getElementById("passwordB").value
        fnameD=document.getElementById("firstname").value
        lnameD=document.getElementById("lastname").value
  
  
        var formData = {
            email:emailD,
            password:passwordD,
            fname:fnameD,
            lname:lnameD,
           
        }
        
  
        regexEmail = /^[^\\s@]+@[^\s@]+\.[^\s@]+$/
        regexPassword = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/
  
  
        returnString = ""
        for (x in formData) {
            if (formData[x].length < 1) {
                returnString = "All elements must be filled out."
            }
        }
        if (passwordD != passwordDB) {
          returnString = "Passwords must match."
        }
        if (regexEmail.test(formData["email"])==false){
          returnString = "Must use a valid email address."
        }
        else if (regexPassword.test(formData["password"])==false){
          returnString = "Must use a valid email address."
        }
        
        
  
        if (returnString != "") {
          document.getElementById("errors").innerHTML = returnString
        }
        else {
          document.getElementById("errors").innerHTML = "Thank you for registering!"
        }
    }