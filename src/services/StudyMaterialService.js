import http from "./http-common";

const get = id => {
    return http.get(`/studymaterials/${id}`);
};

const getStudyMaterials = tutorId => {
    return http.get(`/studymaterials/${tutorId}`)
}
const getAll = () => {
    fetch("https://localhost:7071/studymaterials")
        .then((response) => response.json())
        .then((response) => {
        //console.log(response)
        return response;
    });
    // return http.get('studyMaterials');
};


const StudyMaterialService = {
    get,
    getStudyMaterials,
    getAll,
};
export default StudyMaterialService;