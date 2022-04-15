// ----- Modal Create Student implementation ------------------------------------------------------
// Get the elements by id
const modal = document.getElementById("createStudentOpenModal");
const createStudentButton = document.getElementById("createStudent");
const span = document.getElementsByClassName("close")[0];

// Open modal function
createStudentButton.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
  }
// Close modal function when click outside the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/* Submit method post */
const modalBody = document.querySelector('.modal-content');
const form = modalBody.querySelectorAll('.createStudentForm');
const submitButton = form[0].querySelector('button[id="createStudents"]');

document.addEventListener('DOMContentLoaded', function(){
    submitButton.addEventListener('click', createNewStudent, false);
}, false);
// ---------------------------------------------------------------------------------