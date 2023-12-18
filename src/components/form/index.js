import React, { memo, useState } from 'react';
import './style.css';
import Input from '../input';
import ErrorMessage from '../error-message';
import PropTypes from 'prop-types'

const Form = (props) => {
   const [log, setLog] = useState('')
   const [pass, setPass] = useState('')

   const callbacks = {
      onSubmit: (e) => {
         e.preventDefault();
         const login = log.replace(/\s/g, "");
         const password = pass.replace(/\s/g, "");

         props.formSubmit({ login: login || undefined, password: password || undefined })
      }
   }

   return (
      <form className='Form' onSubmit={callbacks.onSubmit}>
         <h2 className='Form-head'>{props.title}</h2>

         <div className='Form-field'>
            <label>{props.t('auth-form.username')}</label>
            <Input value={log} type='text' onChange={setLog} />
         </div>

         <div className='Form-field'>
            <label>{props.t('auth-form.password')}</label>
            <Input value={pass} type='password' onChange={setPass} />
         </div>

         <div className='Form-error'>
            {props.serverError.map((item) => (
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
   serverError: PropTypes.arrayOf(PropTypes.object).isRequired,
   formSubmit: PropTypes.func.isRequired,
   btn: PropTypes.string,
   title: PropTypes.string,
   t: PropTypes.func,
};

export default memo(Form);