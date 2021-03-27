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

export default ShowErrors;