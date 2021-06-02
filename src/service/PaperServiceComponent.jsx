import axios from 'axios';

class PaperServiceComponent {
    addPaper(paperObj) {
        return axios.post('http://localhost:8080/ppa/paper/createpaper', paperObj);
    }

    deletePaper(paperId) {
        return axios.delete('http://localhost:8080/ppa/paper/deletepaper/' + paperId);
    }

    updatePaper(paperObj) {
        return axios.put('http://localhost:8080/ppa/paper/updatepaper', paperObj);
    }

    listAllPapers() {
        return axios.get('http://localhost:8080/ppa/paper/viewallpaper');
    }

    listPaperById(paperId) {
        return axios.get('http://localhost:8080/ppa/paper/viewpaperbyid/' + paperId);
    }

    listPaperByPublishDate(publishDate) {
        return axios.get('http://localhost:8080/ppa/paper/viewpaperbypublishdate/' + publishDate);
    }

    listPaperByEditor(userId){
        return axios.get('http://localhost:8080/ppa/paper/viewpaperbyeditor/' + userId);
    }
}

export default new PaperServiceComponent;