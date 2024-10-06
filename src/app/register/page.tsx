'use client';
import React, { FormEvent } from 'react';
import toast from 'react-hot-toast';

export default function RegistrationPage() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      // @ts-expect-error form includes email input
      email: event.target.email.value,
      // @ts-expect-error form includes password input
      password: event.target.password.value,
    };

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      toast('Registration successful!');
    }
  }

  return (
    <form
      id='register'
      onSubmit={handleSubmit}
    >
      <h2>Sign Up</h2>
      <label htmlFor='email'>Email:</label>
      <input
        id='email'
        type='email'
        name='email'
        // value={this.state.username}
        // onChange={this.handleInputChange}
      />
      <label htmlFor='password'>Password:</label>
      <input
        id='password'
        type='password'
        name='password'
        // value={this.state.password}
        // onChange={this.handleInputChange}
      />
      <label htmlFor='passwordConfirm'>Re-enter password:</label>
      <input
        id='passwordConfirm'
        type='password'
        name='passwordConfirm'
        // value={this.state.password2}
        // onChange={this.handleInputChange}
      />
      {/* <label htmlFor="is_teacher">Check this box if you are a teacher.</label>
    <input
        id="is_teacher"
        type="checkbox"
        checked={!!this.state.is_teacher}
        name="is_teacher"
        value={this.state.is_teacher}
        onChange={this.handleCheckboxChange}
    /> */}
      {/* <p id='error'>{this.state.errorMessage}</p> */}
      <input
        type='submit'
        value='Submit'
      />
      <p>
        If you are a teacher, please{' '}
        <a href='mailto:yinwebapp@gmail.com'>contact us</a> for special
        permissions.
      </p>
    </form>
  );
}
