import StoreModule from "../module";

class User extends StoreModule {

   initState() {
      return {
         profile: {
            name: '',
            phone: '',
            email: '',
         },
         token: '',
         serverError: []
      };
   }

   setServerError(message) {
      this.setState({
         ...this.getState(),
         serverError: message
      }, `Обработка ошибки на сервере`)
   }

   async load() {
      const token = localStorage.getItem('token');
      if (token) {
         fetch("/api/v1/users/self?fields=*", {
            method: "GET",
            headers: {
               "X-Token": token,
               "Content-Type": "application/json",
            },
         })
            .then((data) => data.json())
            .then((data) => {
               console.log('data: ', data);
               const profile = {
                  name: data.result.profile.name,
                  phone: data.result.profile.phone,
                  email: data.result.email,
               }
               this.setState({
                  ...this.initState(),
                  token: token,
                  profile: profile,
               }, `load`)
            }).catch((e) => {
               console.log('error: ', e);
            })
      }
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
            .then((data) => data.json())
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
               const profile = {
                  name: data.result.user.profile.name,
                  phone: data.result.user.profile.phone,
                  email: data.result.user.email,
               }
               this.setState({
                  ...this.initState(),
                  token: data.result.token,
                  profile: profile,
               }, `logIn`)
               localStorage.setItem('token', data.result.token);
            }
         }).catch((e) => {
            console.log('error: ', e);
         })
   }


}

export default User;