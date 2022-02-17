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
        this.issues.push(newBook)
    }
    removeIssue(id) {
        this.issues = this.issues.filter((issue) => issue.id !== id)
    }
    getIssue(id) {
        return this.issues.find((issue) => issue.id === id)
    }
}

const IssueLibrary = new IssueLibrary()



//Util
const IssueToDoc = (issue) => {
    return {
        title: book.title,
        author: book.author,
        pages: book.pages,
        isRead: book.isRead,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
}