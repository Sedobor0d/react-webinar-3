import StoreModule from "../module";

class Profile extends StoreModule {

   initState() {
      return {
         profile: {
            name: '',
            phone: '',
            email: '',
         },
         isLoading: false
      };
   }

   setProfle(data = {}) {
      this.setState({
         ...this.initState(),
         profile: data,
      }, `setProfle`)
   }

   async setUser() {
      this.setState({
         ...this.getState(),
         isLoading: true,
      }, `isLoading`)
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
               const profile = {
                  name: data.result.profile.name,
                  phone: data.result.profile.phone,
                  email: data.result.email,
               }
               this.setState({
                  ...this.initState(),
                  profile: profile,
                  isLoading: false,
               }, `getUser`)
            }).catch((e) => {
               console.log('error: ', e);
               this.setState({
                  ...this.getState(),
                  isLoading: false,
               }, `getUser`)
            })
      } else {
         this.setState({
            ...this.getState(),
            isLoading: false,
         }, `isLoading`)
      }
   }

}

export default Profile;