import StoreModule from "../module";

class InputAuth extends StoreModule {

   initState() {
      return {
         fieldLog: '',
         fieldPass: ''
      };
   }

   onChangeLog(text) {
      this.setState({
         ...this.getState(),
         fieldLog: text,
      }, `Обновлен логин`)
   }

   onChangePass(text) {
      this.setState({
         ...this.getState(),
         fieldPass: text,
      }, `Обновлен пароль`)
   }
}

export default InputAuth;