// Config async
const initial = async () => {
    await Promise.all([getCourses(), getStudents()]);
};
initial().then(() => {
    getCoursesAndPrintButtons()
});

// GetCourses api call
async function getCourses(){
    const res = await axios.get(`http://localhost:3000/courses/`);
    for(let i=0;i<res.data.length;i++){
        let newCourse = new Course(res.data[i].id, res.data[i].name, res.data[i].assignedTeacher, res.data[i].studentList);
        Courses.push(newCourse);
    }
}

// GetStudents api call
function getStudents(){
    axios
        .get(`http://localhost:3000/students/`)
        .then(res => {
            for(let i=0;i<res.data.length;i++){
                let newStudent = new Student(res.data[i].id, res.data[i].firstName, res.data[i].lastName, res.data[i].gender, res.data[i].address, res.data[i].hobbies)
                Students.push(newStudent);
            }
            //console.log(Students);
        })
        .catch(err => console.error(err));
}

// Function add student with api request
function addStudent(currentCourseId, studentId){
    // Get course data and save a copy in saveCurrentCourse = [];
    let saveCurrentCourse = [];
    for(let i=0;i<Courses.length;i++){
        if(Courses[i].id == currentCourseId){
            saveCurrentCourse.push(Courses[i]);
        }
    }
    // Search student by id in local storage
    const studentAdded = [];
    for(let i=0;i<Students.length;i++){
            if(Students[i].id == studentId){
                studentAdded.push(Students[i]);
            }
    }
    // Verify if already exist student in this course
    if(saveCurrentCourse[0].studentList.some(student => student.id === studentAdded[0].id)){
        return alert(`Student with id ${studentAdded[0].id} is already enrolled in this course!`);
    }

    // (UPDATE) Put new Course object with new student in database
    saveCurrentCourse[0].studentList.push(studentAdded[0]);

    // Put data into database
    axios
    .put(`http://localhost:3000/courses/${currentCourseId}`,{
        id: saveCurrentCourse[0].id,
        name: saveCurrentCourse[0].name,
        assignedTeacher: saveCurrentCourse[0].assignedTeacher,
        studentList: saveCurrentCourse[0].studentList
    })
    .then(res => {
        alert('Student was successfully added to this course');
        // Update table, insert added student in table
        const table = document.getElementById("courseStudentListTable");
        const tableRow = table.length;
        // Set row
        const row = table.insertRow(tableRow);
        // Insert data in cell
        row.insertCell(0).innerHTML = studentAdded[0].id;
        row.insertCell(1).innerHTML = studentAdded[0].firstName;
        row.insertCell(2).innerHTML = studentAdded[0].lastName;
        row.insertCell(3).innerHTML = studentAdded[0].gender;
        row.insertCell(4).innerHTML = studentAdded[0].address;
        row.insertCell(5).innerHTML = studentAdded[0].hobbies;
        row.insertCell(6).innerHTML = `<a class="deleteButton" data-course="${saveCurrentCourse[0].id}" data-student="${studentAdded[0].id}"><img src="images/recycle-bin.png" alt="delete"></a>`;
    })
    .catch(err => console.error(err))
}
// Function deleteStudent with api request
function deleteStudent(currentCourseId, studentId, currentEvent){
    // Get course data and save a copy in saveCurrentCourse = [];
    let saveCurrentCourse = [];
    for(let i=0;i<Courses.length;i++){
        if(Courses[i].id == currentCourseId){
            saveCurrentCourse.push(Courses[i]);
        }
    }
    const newCourseStudentList = saveCurrentCourse[0].studentList.filter(student => student.id != studentId);
    // Update local data
    saveCurrentCourse[0].studentList = newCourseStudentList;
    // Put new Course object without deleted student
    axios
        .put(`http://localhost:3000/courses/${currentCourseId}`,{
            id: saveCurrentCourse[0].id,
            name: saveCurrentCourse[0].name,
            assignedTeacher: saveCurrentCourse[0].assignedTeacher,
            studentList: saveCurrentCourse[0].studentList
        })
        .then(res => {
            alert('Student was successfully deleted successfully!');
            // Update table and delete student from table
            const table = document.getElementById("courseStudentListTable");
            //search rowIndex for deleted row
            const i = currentEvent.parentNode.parentNode.parentNode.rowIndex;
            // delete table row student
            table.deleteRow(i);
        })
        .catch(err => console.error(err))
}
// Function createNewStudent with api request
function createNewStudent(evt){
    const formData = new FormData(form[0]);
    if(!formData.get('firstName') || !formData.get('lastName') || !formData.get('gender') || !formData.get('address') || !formData.get('hobbies')){
        return alert("All fields are required!");
    }
    // Generate id with array of objects 'Student.length' + 1
    const AutoGenerateStudentId = Students.length+1;
    // Create new student object local storage
    const newStudent = new Student(AutoGenerateStudentId, formData.get('firstName'), formData.get('lastName'), formData.get('gender'), formData.get('address'), formData.get('hobbies'))
    Students.push(newStudent);
    // Push new student into the database
    axios
        .post(`http://localhost:3000/students/`,{
            firstName: newStudent.firstName,
            lastName: newStudent.lastName,
            gender: newStudent.gender,
            address: newStudent.address,
            hobbies: newStudent.hobbies
        })
        .then(res => res)
        .catch(err => console.error(err));
    alert(`Student with first name "${newStudent.firstName}" was successfully created successfully!`);
}
