
//***********************************************************************
//FireBase FireStore config info
const firebaseConfig = {
    apiKey: "AIzaSyBug1r28BxHjsRCdgAbie1lyYcXERyv-ZE",
    authDomain: "proyectopracticas-c146e.firebaseapp.com",
    projectId: "proyectopracticas-c146e",
    storageBucket: "proyectopracticas-c146e.appspot.com",
    messagingSenderId: "886989010593",
    appId: "1:886989010593:web:bcd37ad30713939b9622e0",
    measurementId: "G-KF72HYK7NG"
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
//***********************************************************************

//Object creation so it's easer to manipulate the issues
class Issue {
    constructor(
        title = '',
        description = '',
        severity = '',
        status = '',
        asignee = '',
        asigneeId = ''
    ) {
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.status = status;
        this.asignee = asignee;
        this.asigneeId = asigneeId;
    }
}

var issue

//DOM REQUESTS -> Used to send/recieve data to fireStore
const form = document.getElementById("issueForm")
const title = document.querySelector(".title-class")
const description = document.querySelector(".description-class")
const severity = document.querySelector(".severity-class")
const status = document.querySelector(".status-class")
const asignee = document.querySelector(".asignee-class")



//Initial data from fireStore, stored from other sessions
db.collection("IssueDB").doc("IssueDBId").get().then((doc) => {

    //creates an object "Issue" with the data allocated in the firestore DB
    issue = new Issue(doc.data().title, doc.data().description, doc.data().severity, doc.data().status, doc.data().asignee, doc.data().asigneeId)


    //restores the title value and the description value from the object "issue"
    title.setAttribute('value', issue.title)
    description.textContent = issue.description


    //Selects the option that matches with the object's value
    var selected1 = document.querySelector(`.${issue.severity}`)
    selected1.setAttribute('selected', 'selected')

    var selected2 = document.querySelector(`.${issue.status}`)
    selected2.setAttribute('selected', 'selected')

    var selected3 = document.querySelector(`.${issue.asigneeId}`)
    selected3.setAttribute('selected', 'selected')

})


//AUTOSAVE -> Just a setInterval with the content of a submit. We send all our data to the DB within intervals of 1 sec
setInterval(() => {
    db.collection("IssueDB").doc("IssueDBId").set({
        title: title.value,
        description: description.value,
        severity: severity.options[severity.selectedIndex].text,
        status: status.options[status.selectedIndex].text,
        asignee: asignee.options[asignee.selectedIndex].text,
        asigneeId: asignee.options[asignee.selectedIndex].value
    }).then(() => {
    }).catch((error) => {
        console.error("Error writing document: ", error)
    })
}, 1000)
