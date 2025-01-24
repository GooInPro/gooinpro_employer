import employerStore from "../../stores/employerStore.js";


const EmployerDetailComponent = () => {

    const eno = employerStore(state => state.eno);
    const refreshToken = employerStore(state => state.refreshToken);

    return (
        <>
        <h1> employer detail component </h1>
        <p>{eno}</p>
        <h1>{refreshToken}</h1>
        </>
    )
}

export default EmployerDetailComponent;