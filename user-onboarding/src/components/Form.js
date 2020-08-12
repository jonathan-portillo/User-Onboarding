import React, { useState, useEfffect } from "react";

const Form = () => {
  return (
    <div>
      <form>
        <label htmlFor="name">
          Name
          <input id="name" type="text" name="name" />
        </label>
        <label htmlFor="email">
          Email
          <input id="email" type="text" name="email" />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" type="password" name="password" />
        </label>
        <label htmlFor="terms" className="terms">
          Read T & C?
          <input id="terms" type="checkbox" name="terms" />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Form;

// Name
// Email
// Password
// Terms of Service (checkbox)
// A Submit button to send our form data to the server.
