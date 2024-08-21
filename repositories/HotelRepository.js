import Repository, { baseUrl } from './Repository';

class HotelRepository {

    async searchKeyword(params){
        const reponse = await Repository.post(`${baseUrl}/search-keyword`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }


    async searchHotel(params) {
        const reponse = await Repository.post(`${baseUrl}/search-hotels`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;     
    }


    async searchHotelsFilters(params) {
        const reponse = await Repository.post(`${baseUrl}/fetch-hotel-filters`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;     
    }

    async fetchHotelBedsRooms(params){
        const reponse = await Repository.post(`${baseUrl}/fetch-hotelbeds-rooms`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }

    async fetchHotelBedsReviewsRatings(params){
        const reponse = await Repository.post(`${baseUrl}/fetch-hotelbeds-reviews-ratings`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse; 
    }
}

export default new HotelRepository();
