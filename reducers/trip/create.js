import Actions from "../../actions";


const getDefaultState = () => ({
    isLoading: false,
    error: null, 
    data: {}
})


function create(state,action) {

    if(typeof state === "undefined"){

        return getDefaultState()
    }

switch(action.type){
    case Actions.CREATE:
        return {
            isLoading : true,
            error : null, 
            data : {}

        }


    case Actions.CREATE_SUCCESS:
        return {
            isLoading : true,
            error : null, 
            data : action.data

        }


    case Actions.CREATE_FAIL:
        return {
            isLoading : false,
            error : action.error, 
            data : {}

        }

        
    default:
        return state;
    }

}

export default create;