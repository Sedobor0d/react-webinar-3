const baseUrl = 'http://localhost:8010/api/v1/articles'

export const getAllProducts = async () => {
   try {
      const response = await fetch(baseUrl + `?limit=10&fields=items(_id, title, price),count`);
      const data = await response.json();
      return data.result
   } catch (error) {
      console.log('getAllProducts', error)
      return []
   }
}
export const getSpecificProducts = async (skip) => {
   try {
      const response = await fetch(baseUrl + `?limit=10&skip=${skip}&fields=items(_id, title, price),count`);
      const data = await response.json();
      return data.result
   } catch (error) {
      console.log('getSpecificProducts', error)
      return []
   }
}

export const getOneProduct = async () => {
   const request = axios.post(baseUrl, newObject)
   return request.then(response => response.data)
}