window.addEventListener('load', (event) => {
    console.log('The page has fully loaded');
    setupRealTimeListener();
    console.log(issueLibrary);
});

//Data Structure
class Issue {
    constructor(
        id = '',
        title = '',
        description = '',
        severity = '',
        status = '',
        asignee = ''
    ) {
        this.id = id;
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
issueLibrary.removeAllIssues();

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

const createIssueCard = (issue) => {
    const issueCard = document.createElement('div')
    const issueContent = document.createElement('div')
    const title = document.createElement('div')
    const description = document.createElement('div')
    const severity = document.createElement('div')
    const status = document.createElement('div')
    const asignee = document.createElement('div')
    const buttonGroup = document.createElement('div')
    const editBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    issueCard.classList.add('issue-card')
    issueContent.classList.add('issue-content')
    buttonGroup.classList.add('button-group')
    editBtn.classList.add('button')
    removeBtn.classList.add('button')

    removeBtn.onclick = removeIssue
    editBtn.onclick = editIssueCard

    title.textContent = issue.title
    description.textContent = issue.description
    severity.textContent = issue.severity
    status.textContent = issue.status
    asignee.textContent = issue.asignee
    editBtn.textContent = 'Edit'
    removeBtn.textContent = 'Remove'



    issueContent.appendChild(title)
    issueContent.appendChild(description)
    issueContent.appendChild(severity)
    issueContent.appendChild(status)
    issueContent.appendChild(asignee)
    issueCard.appendChild(issueContent)
    buttonGroup.appendChild(editBtn)
    buttonGroup.appendChild(removeBtn)
    issueCard.appendChild(buttonGroup)
    issuesGrid.appendChild(issueCard)


}


const createBlankIssueCard = (issue) => {

    const issueCard = document.createElement('form')
    const issueContent = document.createElement('div')
    const formGroup1 = document.createElement('div')
    const pTitle = document.createElement('label')
    const title = document.createElement('input')
    const formGroup2 = document.createElement('div')
    const pDescription = document.createElement('label')
    const description = document.createElement('textarea')
    const formGroup3 = document.createElement('div')
    const pSeverity = document.createElement('label')
    const severity = document.createElement('select')
    const optionHigh = document.createElement('option')
    const optionMed = document.createElement('option')
    const optionLow = document.createElement('option')
    const formGroup4 = document.createElement('div')
    const pStatus = document.createElement('label')
    const status = document.createElement('select')
    const optionToDo = document.createElement('option')
    const optionDoing = document.createElement('option')
    const optionDone = document.createElement('option')
    const formGroup5 = document.createElement('div')
    const pAsignee = document.createElement('label')
    const asignee = document.createElement('select')
    const optionAsignee = document.createElement('option')
    const br1 = document.createElement('br')
    const br2 = document.createElement('br')
    //const extraNav = document.createElement('nav')

    const buttonGroup = document.createElement('div')
    const editBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    formGroup1.classList.add('form-group')
    formGroup2.classList.add('form-group')
    formGroup3.classList.add('form-group')
    formGroup4.classList.add('form-group')
    formGroup5.classList.add('form-group')

    issueCard.classList.add('issue-card')
    issueContent.classList.add('issue-content')
    buttonGroup.classList.add('button-group')
    editBtn.classList.add('button')
    removeBtn.classList.add('button')
    //optionAsignee.setAttribute('v-for', 'item in asigneeList')
    //optionAsignee.setAttribute('id', 'app')
    title.setAttribute('type', 'text')

    removeBtn.onclick = removeIssue
    editBtn.onclick = editIssueCard

    pTitle.textContent = "Title"
    pDescription.textContent = "Description"
    pSeverity.textContent = "Severity"
    pStatus.textContent = "Status"
    pAsignee.textContent = "Asignee"

    title.classList.add('form-control')
    description.classList.add('form-control')
    severity.classList.add('form-select')
    status.classList.add('form-select')
    asignee.classList.add('form-select')

    //optionAsignee.textContent = '{{ item.name }}'

    optionHigh.textContent = "High"
    optionMed.textContent = "Medium"
    optionLow.textContent = "Low"

    optionToDo.textContent = "To do"
    optionDoing.textContent = "Doing"
    optionDone.textContent = "Done"

    editBtn.textContent = 'Edit'
    removeBtn.textContent = 'Remove'

    //extraNav.innerHTML = "<script>var app = new Vue({el: \"#app\",data: {asigneeList: []},created: function () {axios.get(url + \"users\").then(function (response) {app.asigneeList = response.data;}).catch(function (error) {console.log(error);})}});</script>";


    severity.appendChild(optionHigh)
    severity.appendChild(optionMed)
    severity.appendChild(optionLow)

    status.appendChild(optionToDo)
    status.appendChild(optionDoing)
    status.appendChild(optionDone)

    asignee.appendChild(optionAsignee)

    formGroup1.appendChild(pTitle)
    formGroup1.appendChild(br1)
    formGroup1.appendChild(title)
    formGroup2.appendChild(pDescription)
    formGroup2.appendChild(br2)
    formGroup2.appendChild(description)
    formGroup3.appendChild(pSeverity)
    formGroup3.appendChild(severity)
    formGroup4.appendChild(pStatus)
    formGroup4.appendChild(status)
    formGroup5.appendChild(pAsignee)
    formGroup5.appendChild(asignee)

    issueContent.appendChild(formGroup1)
    issueContent.appendChild(formGroup2)
    issueContent.appendChild(formGroup3)
    issueContent.appendChild(formGroup4)
    issueContent.appendChild(formGroup5)

    issueCard.appendChild(issueContent)
    buttonGroup.appendChild(editBtn)
    buttonGroup.appendChild(removeBtn)
    issueCard.appendChild(buttonGroup)
    //issueCard.appendChild(extraNav)
    issuesGrid.appendChild(issueCard)

}
const editIssueCard = (issue) => {

}
const removeIssue = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.firstChild.innerHTML.replaceAll(
        '"',
        ''
    )
    /* issueLibrary.removeIssue(title)*/
    removeIssueDB(title)
    updateIssuesGrid()

}




//DB


//FIRESTORE
const db = firebase.firestore()
let unsubscribe
var z = 0;

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




//db.collection("Issues").get().then((querySnapshot) => {
//    querySnapshot.forEach((doc) => {
//        issueLibrary.addIssue(docToIssue(doc));
//    });
//});

const addIssueDB = (newIssue) => {
    db.collection('Issues').add(issueToDoc(newIssue))
}

const removeIssueDB = async (title) => {
    db.collection('Issues')
        .doc(await getIssueIdDB(title))
        .delete()
}

const getIssueIdDB = async (title) => {
    const snapshot = await db
        .collection('Issues')
        .where('title', '==', title)
        .get()
    const issueId = snapshot.docs.map((doc) => doc.id).join('')
    return issueId
}
const setupRealTimeListener = () => {
    unsubscribe = db
        .collection('Issues')
        .orderBy('createdAt')
        .onSnapshot((snapshot) => {
            issueLibrary.issues = docsToIssues(snapshot.docs)
            updateIssuesGrid()
        })
}

//Util
const issueToDoc = (issue) => {
    return {
        id: issue.id,
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
            doc.data().id,
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
        doc.data().id,
        doc.data().title,
        doc.data().description,
        doc.data().severity,
        doc.data().status,
        doc.data().asignee
    )

}
//BUTTONS
addIssueBtn.onclick = createBlankIssueCard
