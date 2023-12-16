import React, { memo } from 'react';
import './style.css';
import Input from '../input';
import ErrorMessage from '../error-message';
import PropTypes from 'prop-types'

const Form = (props) => {
   const callbacks = {
      onSubmit: (e) => {
         e.preventDefault();
         const login = props.select.fieldLog.replace(/\s/g, "");
         const password = props.select.fieldPass.replace(/\s/g, "");

         props.callbacks.formSubmit({ login: login || undefined, password: password || undefined })
      },
      changeLog: (text) => props.callbacks.onChangeLog(text),
      changePass: (text) => props.callbacks.onChangePass(text),
   }

   return (
      <form className='Form' onSubmit={callbacks.onSubmit}>
         <h2 className='Form-head'>{props.head}</h2>

         <div className='Form-field'>
            <label>{props.t('auth-form.username')}</label>
            <Input value={props.select.fieldLog} type='text' onChange={callbacks.changeLog} />
         </div>

         <div className='Form-field'>
            <label>{props.t('auth-form.password')}</label>
            <Input value={props.select.fieldPass} type='password' onChange={callbacks.changePass} />
         </div>

         <div className='Form-error'>
            {props.select.serverError.map((item) => (

               <ErrorMessage key={item.path}>
                  {item.message}
               </ErrorMessage>
            ))}
         </div>

         <button
            type="submit"
            className='Form-btn'
         >
            {props.btn}
         </button>
      </form>
   );
};

Form.propTypes = {
   select: PropTypes.shape({
      serverError: PropTypes.arrayOf(PropTypes.object),
      fieldLog: PropTypes.string,
      fieldPass: PropTypes.string,
   }).isRequired,
   callbacks: PropTypes.shape({
      formSubmit: PropTypes.func,
      onChangeLog: PropTypes.func,
      onChangePass: PropTypes.func,
   }).isRequired,
   btn: PropTypes.string,
   title: PropTypes.string,
   t: PropTypes.func,
};

export default memo(Form);