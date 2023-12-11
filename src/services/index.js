const baseUrl = 'http://localhost:8010/api/v1/articles'

export const getProducts = async (skip) => {
   try {
      const response = await fetch(baseUrl + `?limit=10&skip=${skip}&fields=items(_id, title, price),count`);
      const data = await response.json();
      return data.result
   } catch (error) {
      console.log('getProducts', error)
      return []
   }
}

export const getOneProduct = async (_id) => {
   try {
      const response = await fetch(baseUrl + `/${_id}?fields=_id, title, description, price, madeIn(title,code), category(title), edition`);
      const data = await response.json();
      return data.result
   } catch (error) {
      console.log('getOneProduct', error)
      return []
   }
}