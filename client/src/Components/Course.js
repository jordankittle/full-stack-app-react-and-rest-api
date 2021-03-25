
function Course({ course }) {
  return (
    <>
        <a className="course--module course--link" href={`/course/${course.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 class="course--title">{course.title}</h3>
        </a>
    </>
  );
  
}

export default Course;
