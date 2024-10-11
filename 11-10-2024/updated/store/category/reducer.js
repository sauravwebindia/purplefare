/* import { actionTypes } from "./action";


export const initialState = {

    allProducts: '',
    category: '',
    productsLoading: true,
   

 
}



function reducer (state = initialState, action){
    switch(action.type){
        
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                ...{allProducts:action.data, productsLoading:false}

            }
            
            case actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS:
                return {
                    ...state,
                    ...{category:action.payload, productsLoading:false}
                }

                default:
                    return state;
    }

}


export default reducer; */