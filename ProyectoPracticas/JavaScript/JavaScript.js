

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
window.addEventListener('load', (event) => {
    console.log('The page has fully loaded');
    //setupRealTimeListener();
    console.log(issueLibrary);
});

//Data Structure
class Issue {
    constructor(
        title = '',
        description = '',
        severity = '',
        status = '',
        asignee = ''
    ) {
        this.title = title;
        this.description = description;
        this.severity = severity;
        this.status = status;
        this.asignee = asignee;
    }
}
class IssueLibrary {
    constructor() { this.issues = [] }

    addIssue(newIssue) {
        this.issues.push(newIssue)
    }
    removeIssue(id) {
        this.issues = this.issues.filter((issue) => issue.id !== id)
    }
    removeAllIssues() {
        this.issues = []
    }
    getIssue(id) {
        return this.issues.find((issue) => issue.id === id)
    }
}

const issueLibrary = new IssueLibrary()
//issueLibrary.removeAllIssues();

//INTERFACE


const addIssueBtn = document.getElementById('addIssueBtn')
const addIssueModal = document.getElementById('addIssueModal')
const errorMsg = document.getElementById('errorMsg')
const addIssueForm = document.getElementById('addIssueForm')
const issuesGrid = document.getElementById('issuesGrid')

const updateIssuesGrid = () => {
    resetIssuesGrid()
    for (let issue of issueLibrary.issues) {
        createIssueCard(issue)
    }
}
const resetIssuesGrid = () => {
    issuesGrid.innerHTML = ''
}


//DB


//FIRESTORE

let unsubscribe
var z = 0;



const addIssueDB = (newIssue) => {
    db.collection('Issue').add(issueToDoc(newIssue))
}

const removeIssueDB = async (title) => {
    db.collection('Issue')
        .doc(await getIssueIdDB(title))
        .delete()
}

const getIssueIdDB = async (title) => {
    const snapshot = await db
        .collection('Issue')
        .where('title', '==', title)
        .get()
    const issueId = snapshot.docs.map((doc) => doc.id).join('')
    return issueId
}
const setupRealTimeListener = () => {
    unsubscribe = db
        .collection('Issue')
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
            issueLibrary.issues = docsToIssues(snapshot.docs)
            updateIssuesGrid()
        })
}

//Util
const issueToDoc = (issue) => {
    return {
        title: issue.title,
        description: issue.description,
        severity: issue.severity,
        status: issue.status,
        asignee: issue.asignee
    }
}

const docsToIssues = (docs) => {
    return docs.map((doc) => {
        return new Issue(
            doc.data().title,
            doc.data().description,
            doc.data().severity,
            doc.data().status,
            doc.data().asignee
        )
    })
}

const docToIssue = (doc) => {
    return new Issue(
        doc.data().title,
        doc.data().description,
        doc.data().severity,
        doc.data().status,
        doc.data().asignee
    )

}

var issuesRef = db.collection("IssueDB")

const getInputValue = id => document.getElementById(id).value

const form = document.getElementById("issueForm")
const title = document.querySelector(".title-class")
const description = document.querySelector(".description-class")
const severity = document.querySelector(".severity-class")
const status = document.querySelector(".status-class")
const asignee = document.querySelector(".asignee-class")
const submit = document.querySelector(".submit-class")

submit.addEventListener("click", (e) => {
    e.preventDefault();
    db.collection("IssueDB").doc("IssueDBId").set({
        title: title.value,
        description: description.value,
        severity: severity.options[severity.selectedIndex].text,
        status: status.options[status.selectedIndex].text,
        asignee: asignee.options[asignee.selectedIndex].text
    }).then(() => {
        console.log("Document succesfully writen")
    }).catch((error) => {
        console.error("Error writing document: ", error)
    })
})


//for (let i = 0; i < 3; i++) {
//    db.collection("Issues").add({
//        id: i,
//        title: "title" + i,
//        description: "description" + i,
//        severity: "severity" + i,
//        status: "status" + i,
//        asignee: "asignee" + i,
//        createdAt: firebase.firestore.FieldValue.serverTimestamp()
//    }).then(() => {
//        console.log("Document successfully written!");
//    })
//}

//document.getElementById("issueForm").addEventListener("submit", submitForm)

//function submitForm(e) {
//    e.preventDefault();

//    var title = getInputValue("title")
//    var description = getInputValue("description")
//    var severity = getInputValue("severity")
//    var status = getInputValue("status")
//    var asignee = getInputValue("asignee")

//    saveIssue(title, description, severity, status, asignee);
//}


//function saveIssue(title, description, severity, status, asignee) {
//    issuesRef.add({
//        title: title,
//        description: description,
//        severity: severity,
//        status: status,
//        asignee: asignee
//    })
//}

//setInterval(function () {
//    var form = $('#issueForm');
//    var method = form.attr('post').toLowerCase();      // "get" or "post"
//    var action = form.attr('submit');                    // url to submit to
//    $[method](action, form.serialize(), function (data) {
//        // Do something with the server response data      
//        // Or at least let the user know it saved
//    });
//}, 10000);