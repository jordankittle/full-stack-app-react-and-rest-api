import ShowErrors from './ShowErrors';
 
const CourseForm = (props) => {

const {
    errors,
    submit,
    cancel,
    submitText,
    elements
} = props;

function handleSubmit(event) {
    event.preventDefault();
    submit();
    }

    function handleCancel(event) {
    event.preventDefault();
    cancel();
    }

return(
    <>
        <ShowErrors errors={errors}/>
        <form onSubmit={handleSubmit}>
            <div className="main--flex">
                {elements()}
            </div>
            <button className="button" type="submit">{submitText}</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
    </>
);

};

export default CourseForm;