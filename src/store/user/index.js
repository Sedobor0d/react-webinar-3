import StoreModule from "../module";

class User extends StoreModule {

   initState() {
      return {
         user: {},
         token: '',
         serverError: []
      };
   }

   setServerError(message = []) {
      this.setState({
         ...this.getState(),
         serverError: message
      }, `Обработка ошибки на сервере`)
   }

   logOut() {
      const token = localStorage.getItem('token');
      if (token) {
         fetch("/api/v1/users/sign", {
            method: "DELETE",
            headers: {
               "X-Token": token,
               "Content-Type": "application/json",
            },
         })
            .then(() => {
               this.setState({
                  ...this.initState()
               }, `logout`)
               localStorage.removeItem('token');
            }).catch((e) => {
               console.log('error: ', e);
            })
      }
   }

   logIn({ login, password }) {
      fetch("/api/v1/users/sign", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ login, password }),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.error) {
               this.setServerError(data.error.data.issues)
            } else {
               this.setState({
                  ...this.initState(),
                  token: data.result.token,
                  user: data.result,
               }, `logIn`)
               localStorage.setItem('token', data.result.token);
            }
         }).catch((e) => {
            console.log('error: ', e);
         })
   }


}

export default User;