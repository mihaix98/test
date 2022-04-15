const counterCourse = [];
const counterStudent = [];
let Courses = [];
let Students = [];

function Course(id, name, assignedTeacher, studentList){
    // verify if the parameters exist
    if(!id || !name || !assignedTeacher || !studentList){
        return console.log("Required property is missing");
    }
    // verify if the parameters is correct type
    if(typeof id !== "number" || typeof name !== "string" || typeof assignedTeacher !== "string" || typeof studentList !== "object"){
        // return error invalid property
        return console.log("Invalid required property type");
    }
    // Verify if courseid is unique
    if(!counterCourse.includes(id)){
        this.id = id;
        this.name = name;
        this.assignedTeacher = assignedTeacher;
        this.studentList = studentList;
        // Add student function
        this.addStudent = function(studentName){
            // Verify if already exist student in this course
            if(!this.studentList.includes(studentName)){
                this.studentList.push(studentName);
                studentName[this.name + "Grade"] = null;
                openCoursesTab(this);
                return console.log("Student with id " + studentName.id + " was successfully added to this course");
            }
            alert("Student with id " + studentName.id + " is already enrolled in this course!");
        }
        // Print student function
        this.printStudentList = function(){
            return console.log(this.studentList);
        }
        // Delete student function
        this.deleteStudent = function(id){
            for(let i=0;i<studentList.length;i++){
                if(studentList[i].id === id){
                    delete this.studentList[i][this.name + "Grade"];
                    studentList.splice(i, 1);
                    // Calculate average
                    this.average();
                    // Refresh table
                    openCoursesTab(this);
                    return console.log("Student with id " + id + " was successfully deleted from this course");
                }
            }
            console.log("Student id is invalid resulting in failing to delete the specified student from this course");
        }
        // Average general for course
        this.average = function(){
            let average = 0;
            let number = 0;
            for(let i=0;i<=studentList.length-1;i++){
                if(this.studentList[i][this.name + "Grade"] !== null){
                    average += this.studentList[i][this.name + "Grade"];
                    number += 1;
                }
            }
            average = average / number;
            // Average grade set to course
            if(!average){
                average = 0;
            }
            this.averageGrade = average;
            console.log("Average grade for the course " + this.name + " is: " + average);
        }

        // Sorting students function - mai am de lucrat
        this.sortStudents = function(){
                this.studentList.sort((a, b) => (a[this.name + "Grade"] > b[this.name + "Grade"]) ? 1 : -1);
                console.log(this.name);
                console.log("Students was sorted successfully!")
                return studentList; 
        }
        // push number to save courseid - for unique id
        counterCourse.push(id);
        // return successfully message
        return console.log("Course was successfully created");
    }
    console.log("Course with id " + id + " already exists");
}

function Student(id, firstName, lastName, gender, address, hobbies){
    // verify if the parameters exist
    if(!id || !firstName || !lastName || !gender){
        return console.log("Required property is missing"); 
    }
    // verify if the parameters is correct type
    if(typeof id !== "number" || typeof firstName !== "string" || typeof lastName !== "string" || typeof gender !== "string"){
        // return error invalid property
        return console.log("Invalid required property type");
    }
    // Verify if studentid is unique
    if(!counterStudent.includes(id)){
        // verify address
        if(address && typeof address !== 'string') return console.log('Invalid additional address property type');
        this.address = address || null;
        // verify hobbies
        if(hobbies && typeof hobbies !== 'string') return console.log('Invalid additional address property type');
        this.hobbies = hobbies || null;

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;

        // Add qualifier
        this.setgrade = function(Course, grade){
            courseGrade = Course.name + "Grade";
            // Aditional verify is exist this course grade
            if(this[courseGrade] === undefined){
                return console.log("This student doesn't participate in the specified course.");
            }
            if(grade <  1 || grade > 10){
                return console.log("The grade need to between 1-10.")
            }
            this[courseGrade] = grade;
            console.log("You set student grade " + this.firstName + " successfully!");
            Course.average();
            return;
        }

        // push number to save studentid - for unique id
        counterStudent.push(id);
        // return successfully message
        return console.log("Student was successfully created");
    }
    console.log("Student with id " + id + " already exists");
}

// Function Course above average
function aboveAverage(Course){
    const courseGrade = Course.averageGrade;
    for(let i=0;i<Course.studentList.length;i++){
        const studentList = Course.studentList[i];
        if(studentList[Course.name + "Grade"] > courseGrade){
            console.log(studentList);
        }
    }
    return console.log("Course average is " + courseGrade);
}