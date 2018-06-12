export const RECEIVE_GOODS = 'receiveGoods';
export const REQUEST_GOODS = 'requestGoods';

export const getGoods = (data)=>{
		return {
			type: RECEIVE_GOODS,
			goods : data
		}
}
