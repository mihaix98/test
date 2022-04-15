// Event listener for print course data
const printCoursesList = document.getElementById("printedCoursesList");
const tabs = document.getElementsByClassName("tablinks");
printCoursesList.addEventListener("click", function(e) {
    // Verifi if user target course button
    if(e.target.matches("button")){
        // Change all tabs links color in default nav color
        for(let i=0;i<tabs.length;i++){
            tabs[i].style.backgroundColor = "rgb(41, 41, 41)"; // default nav color
        }
        e.target.style.backgroundColor = "rgb(15, 130, 165)"; // change color current tab links to default active button
        // Call getCourseAndPrintData function
        getCourseAndPrintData(e.target.dataset.course);
    }
});
// Event listener for delete student from a course, using event delegation
const contentTable = document.getElementById("content-table");
const deleteButton = document.getElementsByClassName("deleteButton");
contentTable.addEventListener("click", function(e) {
    // Verifi if user target delete button (img recicle bin)
    if(e.target.matches("img")){
        const parent = e.target.parentElement; // Save parent of selected target
        // Call deleteStudent function
        deleteStudent(parent.dataset.course, parent.dataset.student, e.target);
    }
});
// Event listener for add student from a course, using event delegation
const dropDownStudentMenu = document.getElementById("dropDownStudentsMenu");
const addStudentButton = document.getElementsByClassName("addStudent");
dropDownStudentMenu.addEventListener("click", function(e) {
    // Verifi if user target button add student
    if(e.target.matches("button")){
        // Call addStudent
        addStudent(e.target.dataset.course, e.target.dataset.student);
    }
});