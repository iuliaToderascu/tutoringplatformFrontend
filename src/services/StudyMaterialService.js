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

const createStudyMaterial = (title, educationLevel, tags, contentFile, coverImageFile) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('educationLevel', educationLevel);
    formData.append('tags', tags);
    formData.append('contentFile', contentFile);
    formData.append('coverImageFile', coverImageFile);

    return http.post("https://localhost:7071/studymaterials", formData);
}

const StudyMaterialService = {
    get,
    getStudyMaterials,
    getAll,
    createStudyMaterial
};
export default StudyMaterialService;