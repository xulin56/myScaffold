export const RECEIVE_GOODS = 'receiveGoods';
export const REQUEST_GOODS = 'requestGoods';
const fetchData = (data)=> {
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(data);
		},2000)
	})
}

const requestGoods = ()=> {
	return {
		type: REQUEST_GOODS,
		goods : []
	}
}
const receiveGoods = (data)=>{
	return {
		type: RECEIVE_GOODS,
		goods : data
	}
}
export const getGoods = (data)=>{
		receiveGoods(data)
	}
