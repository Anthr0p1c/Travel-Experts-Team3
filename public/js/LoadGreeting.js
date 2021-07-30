

function getGreetingMessage() {
    var greetingArray = ["HELLO", "HI", "GOOD BYE", "HEY", "GOOD MORNING", "WHAT'S UP"];
    var randomGreeting = Math.floor(Math.random() * greetingArray.length);
    console.log("randomGreeting-------------------", randomGreeting);
    var greetingMessage = greetingArray[randomGreeting];
    return greetingMessage;

}

//module.exports.myGreeting = getGreetingMessage();

document.getElementById("greet").innerHTML = getGreetingMessage();