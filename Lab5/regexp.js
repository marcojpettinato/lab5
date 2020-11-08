//    Marco Pettinato
// CPSC - 44000 Software Engineering
// Sprint 1
// Fall 2020


// JavaScript source code
// Code to find regular expressions based on the user input
// output whether the expression searched for was indeed in the other expression.

function regExpCheck()
{
    var user = document.getElementById("sfor").value;
    console.log("searched for: " + user);

    var regExp  = RegExp(document.getElementById("sfor").value);
    console.log("regExp=" + user);
    console.log("regExp.test(user): " + regExp.test(user));

    document.getElementById("result").value = regExp.test(user);
}