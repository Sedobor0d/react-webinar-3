export default {
   load: (id) => {
      return async (dispatch, getState, services) => {
         this.setState(this.initState(), 'Авторизация');
         try {
            const res = await this.services.api.request({
               url: '/api/v1/users/sign',
               method: 'POST',
               body: JSON.stringify(data)
            });

            if (!res.data.error) {
               this.setState({
                  ...this.getState(),
                  token: res.data.result.token,
                  user: res.data.result.user,
                  exists: true,
                  waiting: false
               }, 'Успешная авторизация');

               // Запоминаем токен, чтобы потом автоматически аутентифицировать юзера
               window.localStorage.setItem('token', res.data.result.token);

               // Устанавливаем токен в АПИ
               this.services.api.setHeader(this.config.tokenHeader, res.data.result.token);

               if (onSuccess) onSuccess();
            } else {
               this.setState({
                  ...this.getState(),
                  errors: simplifyErrors(res.data.error.data.issues),
                  waiting: false
               }, 'Ошибка авторизации');
            }

         } catch (e) {
            console.error(e);
         }
      }
   }
}