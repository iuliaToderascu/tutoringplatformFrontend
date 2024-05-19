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

const createStudyMaterial = (studyMaterial) => {
    return http.post("https://localhost:7071/studymaterials", studyMaterial, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


const StudyMaterialService = {
    get,
    getStudyMaterials,
    getAll,
    createStudyMaterial
};

export default StudyMaterialService;