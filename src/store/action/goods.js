export const RECEIVE_GOODS = 'receiveGoods';
export const REQUEST_GOODS = 'requestGoods';

// const data = [{
// 			name: 'iPhone 7',
// 			price: '6,888',
// 			amount: 37
// 		}, {
// 			name: 'iPad',
// 			price: '3,488',
// 			amount: 82
// 		}, {
// 			name: 'MacBook Pro',
// 			price: '11,888',
// 			amount: 15
// 		}];
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
export const getGoods = (data)=>
	async (dispatch)=> {
		dispatch(requestGoods());
		let good = await fetchData(data);
		dispatch(receiveGoods(good));
	}
