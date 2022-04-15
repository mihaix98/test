// GET REQUEST COURSES FOR COURSES BUTTONS AND PRINT IN NAVBAR
async function getCoursesAndPrintButtons(){
    let courseIntegralList = "";
            for(let i=0;i<Courses.length;i++){
                // Insert in "courseIntegralList" all buttons
                courseIntegralList += `<button class='tablinks' data-course="${Courses[i].id}">${Courses[i].name}</button>`;
            }
            // Print all data in class tab
            document.querySelector('.tab').innerHTML = courseIntegralList;
}

// GET COURSE FOR DETAILS
function getCourseAndPrintData(courseId){
    const currentCourse = [];
    for(let i=0;i<Courses.length;i++){
        if(Courses[i].id == courseId){
            currentCourse.push(Courses[i]);
        }
    }
    // Print courses data into tab
    // 1 --- OPEN TAB
    let tabcontent;
    tabcontent = document.getElementById('tabcontent');
    welcomeMessage = document.getElementById('welcomeMessage');
    // Set tab content to block after click and welcomeMessage content to none
    tabcontent.style.display = "block";
    welcomeMessage.style.display = "none";
    // Clear table
    document.getElementById('content-table').innerHTML = "";

    // 2 --- PRINT DATA COURSES
    // Print assigned teacher
    const selectAssignedTeacherZone = document.querySelector('#assignedTeacher');
    selectAssignedTeacherZone.innerHTML = `${currentCourse[0].assignedTeacher}`;
    // Select body table
    const studentTable = document.querySelector('#content-table');
    // Insert students in table
    for(let i=0;i<currentCourse[0].studentList.length;i++){
        let row = `<tr>
                        <td>${currentCourse[0].studentList[i].id}</td>
                        <td>${currentCourse[0].studentList[i].firstName}</td>
                        <td>${currentCourse[0].studentList[i].lastName}</td>
                        <td>${currentCourse[0].studentList[i].gender}</td>
                        <td>${currentCourse[0].studentList[i].address}</td>
                        <td>${currentCourse[0].studentList[i].hobbies}</td>
                        <td><a class="deleteButton" data-course="${courseId}" data-student="${currentCourse[0].studentList[i].id}"><img src="images/recycle-bin.png" alt="delete"></a></td>
                    </tr>`;
        studentTable.innerHTML += row;
    }
    // Call function add student to this course
    getStudentsAndInsertIntodropdownStudentsMenu(currentCourse[0]);
}

// Insert student into dropdown students menu
function getStudentsAndInsertIntodropdownStudentsMenu(currentOpenCourse){
    const dropdownStudentsMenuLocation = document.querySelector('#dropDownStudentsMenu');
    let studentIntegralList = "";
    for(let i=0;i<Students.length;i++){
        studentIntegralList += `<button class="addStudent" data-course="${currentOpenCourse.id}" data-student="${Students[i].id}">${Students[i].firstName} ${Students[i].lastName} (${Students[i].id})</button>`;
    }
    dropdownStudentsMenuLocation.innerHTML = studentIntegralList;
}