import Repository, { baseUrl } from './Repository';

class AuthRepository {
    async Login(params) {
       const reponse = await Repository.post(`${baseUrl}/auth/login`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;        
    }

    async Register(params) {
        const reponse = await Repository.post(`${baseUrl}/auth/register`,params)
         .then((response) => {
             return response.data;
         })
         .catch((error) => ({ error: JSON.stringify(error) }));
         return reponse;        
    }
	
	async MyProfile(params) {
       const reponse = await Repository.post(`${baseUrl}/auth/fetch-myprofile`,params)
        .then((response) => {
            return response.data;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;        
    }
	
	
    async updateProfile(params) {
        const reponse = await Repository.post(`${baseUrl}/auth/update-profile`,params)
         .then((response) => {
             return response.data;
         })
         .catch((error) => ({ error: JSON.stringify(error) }));
         return reponse;        
    }

    async updatePassword(params) {
        const reponse = await Repository.post(`${baseUrl}/auth/update-password`,params)
         .then((response) => {
             return response.data;
         })
         .catch((error) => ({ error: JSON.stringify(error) }));
         return reponse;        
    }

    async updateProfilePic(params) {
        const reponse = await Repository.post(`${baseUrl}/auth/update-profilepic`,params)
         .then((response) => {
             return response.data;
         })
         .catch((error) => ({ error: JSON.stringify(error) }));
         return reponse;        
    }

    async updateLoginDetails(params) {
        const reponse = await Repository.post(`${baseUrl}/auth/update-login-info`,params)
         .then((response) => {
             return response.data;
         })
         .catch((error) => ({ error: JSON.stringify(error) }));
         return reponse;        
    }

    async ForgotPassword(params) {
        const reponse = await Repository.post(`${baseUrl}/forgot-password`,params)
         .then((response) => {
             return response.data;
         })
         .catch((error) => ({ error: JSON.stringify(error) }));
         return reponse;        
    }
	
	async MyReviewsRatings(params){
        const reponse = await Repository.post(`${baseUrl}/fetch-my-reviews-ratings`,params)
         .then((response) => {
             return response.data;
         })
         .catch((error) => ({ error: JSON.stringify(error) }));
         return reponse;
    }
}

export default new AuthRepository();