import axios from 'axios';

class CategoryServiceComponent {
    listAllCategories() {
        return axios.get('http://localhost:8080/ppa/category/viewallcategories');
    }

    addNewCategory(categoryObj) {
        return axios.post('http://localhost:8080/ppa/category/addcategory', categoryObj);
    }

    deleteCategory(categoryId) {
        return axios.delete('http://localhost:8080/ppa/category/deletecategory/' + categoryId);
    }

    updateCategory(categoryObj) {
        return axios.put('http://localhost:8080/ppa/category/updatecategory', categoryObj);
    }

    listCategoryByName(categoryName) {
        return axios.get('http://localhost:8080/ppa/category/viewcategorybyname/' + categoryName);
    }

    listCategoryById(categoryId) {
        return axios.get('http://localhost:8080/ppa/category/viewcategorybyid/' + categoryId);
    }
}

export default new CategoryServiceComponent;