import { deleteRequestDoc, getRequestDoc, postRequestDoc, putRequestDoc } from "../../common/api/doctor.api"
import { URLS } from "../../common/api/URLS"
import * as Types from '../reducer/ActionTypes'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";


export const fetchDoctors = () => {
	return async (dispatch) => {
		// try {
		//     dispatch(loadingDoc())
		//     const res = await getRequestDoc(URLS.doctor)
		//     if (res.status === 200 || res.status === 201) {
		//         dispatch({ type: Types.FETCH_DOC, payload: res.data })
		//     }
		// } catch (error) {
		//     dispatch(errorDoc(error.message))
		// }
		try {
			dispatch(loadingDoc())
			const querySnapshot = await getDocs(collection(db, "doctors"));
			const data = []
			querySnapshot.forEach((doc) => {
				data.push({ id: doc.id, ...doc.data() })
			});
			dispatch({ type: Types.FETCH_DOC, payload: data })
		} catch (error) {
			dispatch(errorDoc(error.message))
		}
	}
}

export const addDoctors = (data) => {
	return async (dispatch) => {
		// try {
		//     dispatch(loadingDoc())
		//     const res = await postRequestDoc(URLS.doctor, data)
		//     if (res.status === 200 || res.status === 201) {
		//         dispatch({ type: Types.ADD_DOC, payload: data })
		//     }
		// } catch (error) {
		//     dispatch(errorDoc(error.message))
		// }

		try {
			dispatch(loadingDoc())
			const imgName = Math.floor(Math.random() * 10000).toString()
			const profImagesRef = ref(storage, `doctors/${imgName}`);
			uploadBytes(profImagesRef, data.img).then((snapshot) => {
				getDownloadURL(snapshot.ref).then(async (url) => {
					const docRef = await addDoc(collection(db, "doctors"), { ...data, img: url, imgName });
					dispatch({ type: Types.ADD_DOC, payload: { ...data, id: docRef.id, img: url, imgName } })
				})
			});
		} catch (error) {
			dispatch(errorDoc(error.message))
		}
	}
}

export const deleteDoctors = data => {
	return async (dispatch) => {
		// try {
		// 	dispatch(loadingDoc())
		// 	const res = await deleteRequestDoc(`${URLS.doctor}/`, id)
		// 	if (res.status === 200 || res.status === 201) {
		// 		dispatch({ type: Types.DELETE_DOC, payload: id })
		// 	}
		// } catch (error) {
		// 	dispatch(errorDoc(error.message))
		// }
		try {
			dispatch(loadingDoc())
			const profImgRef = ref(storage, `doctors/${data.imgName}`);
			await deleteObject(profImgRef)
			await deleteDoc(doc(db, "doctors", data.id));
			dispatch({ type: Types.DELETE_DOC, payload: data.id })
		} catch (error) {
			dispatch(errorDoc(error.message))
		}
	}
}

export const updateDoctors = data => {
	return async (dispatch) => {
		try {
			dispatch(loadingDoc())

			if (typeof data.img === 'object') {
				await deleteObject(ref(storage, `doctors/${data.imgName}`))
				const imgName = Math.floor(Math.random() * 1000).toString()
				const profImagesRef = ref(storage, `doctors/${imgName}`);
				uploadBytes(profImagesRef, data.img).then((snapshot) => {
					getDownloadURL(snapshot.ref).then(async (url) => {
						const doctorsRef = doc(db, "doctors", data.id);
						await updateDoc(doctorsRef, { ...data, img: url, imgName });
						dispatch({ type: Types.UPDATE_DOC, payload: { ...data, img: url, imgName } })
					})
				});
			} else {
				const doctorsRef = doc(db, "doctors", data.id);
				await updateDoc(doctorsRef, data);
				dispatch({ type: Types.UPDATE_DOC, payload: data })
			}
		} catch (error) {
			dispatch(errorDoc(error.message))
		}
		// try {
		// 	dispatch(loadingDoc())
		// 	const res = await putRequestDoc(`${URLS.doctor}/`, data)
		// 	if (res.status === 200 || res.status === 201) {
		// 		dispatch({ type: Types.UPDATE_DOC, payload: data })
		// 	}
		// } catch (error) {
		// 	dispatch(errorDoc(error.message))
		// }
	}
}

const errorDoc = (error) => {
	return dispatch => dispatch({ type: Types.ERROR_DOC, payload: error })
}

const loadingDoc = () => {
	return dispatch => dispatch({ type: Types.LOADING_DOC })
}