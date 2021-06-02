import axios from 'axios';

class NewsServiceComponent {
    addNews(newsObj) {
        return axios.post('http://localhost:8080/ppa/news/addnews/', newsObj);
    }

    deleteNews(newsId) {
        return axios.delete('http://localhost:8080/ppa/news/deletenews/' + newsId);
    }

    updateNews(newsObj) {
        return axios.put('http://localhost:8080/ppa/news/updatenews', newsObj);
    }

    listAllNews() {
        return axios.get('http://localhost:8080/ppa/news/viewallnews');
    }

    listNewsById(newsId) {
        return axios.get('http://localhost:8080/ppa/news/viewnewsbyid/' + newsId);
    }

    listNewsByLocation(location) {
        return axios.get('http://localhost:8080/ppa/news/viewnewsbylocation/' + location);
    }

    listNewsByReporter(userId){
        return axios.get('http://localhost:8080/ppa/news/viewnewsbyreporter/' + userId);
    }
}

export default new NewsServiceComponent;