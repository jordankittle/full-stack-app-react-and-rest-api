
 const CourseForm = (props) => {

    const {
        errors,
        submit,
        submitText,
        elements
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
      }
    
      function handleCancel(event) {
        event.preventDefault();
        //cancel();
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

function ShowErrors({ errors }) {
    let errorList = null;
    if(errors.length){
        errorList = (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );
    }
    return errorList;
}

export default CourseForm;