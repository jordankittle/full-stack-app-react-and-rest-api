
const Course = ({ course }) => (
    <>
        <a className="course--module course--link" href={`/course/${course.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
        </a>
    </>
);

export default Course;
