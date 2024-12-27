import React, { useRef }  from 'react'
import './FormContact.css'
import emailjs from '@emailjs/browser'; 

const FormContact = () => {
  const form = useRef();
  
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_83uk73b', 'template_a2f7da5', form.current, {
        publicKey: '8iraw47hTOmTB718C',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Your message was sent succefully');
        },
        (error) => {
          console.log('FAILED...', error);
          alert('failed');
        }
      );
  };

  return (
    <div className='flex justify-center'>
      <form className='form-part' ref={form} onSubmit={sendEmail}>
        <h1 className='h1 flex justify-center mb-9'>Write Us a Message</h1>
        <div className="contact-form-group">
          <input type="text" name="user_name" placeholder='Full name' className='input border rounded'/>
          <input type="text" name="user_email" placeholder='Email' className='input border rounded'/>
        </div>
        <textarea name="message" placeholder='Your message...' className='border rounded'/>
        <input type="submit" value="Send" id='submit-message'/>
      </form>
    </div>
  );
};

export default FormContact;
