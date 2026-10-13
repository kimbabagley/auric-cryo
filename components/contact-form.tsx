"use client";

import { useState } from "react";

export function ContactForm() {
  const [shown, setShown] = useState(false);

  return (
    <form
      className="panel"
      action="#"
      onSubmit={(event) => {
        event.preventDefault();
        setShown(true);
      }}
    >
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input name="name" autoComplete="off" required />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="off" required />
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit" className="btn btn-primary">
        Send message
      </button>
      {shown ? (
        <p className="form-note" role="status">
          Demo only. This form does not send.
        </p>
      ) : null}
    </form>
  );
}
