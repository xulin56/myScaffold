import { REQUEST_GOODS,RECEIVE_GOODS } from 'store/action/goods'

export const good = (state,action)=>{
	switch(action.type) {
		case REQUEST_GOODS :
			return {
		        ...state,
		        isFetching: true
		    }
		case RECEIVE_GOODS :
			return {
				...state,
				isFetching : false,
				goods : action.goods
			}
		default :
			return {
			    isFetching: false,
			    goods: []
			}
	}
}
