"use client";

import { useState } from "react";

export function ContactForm() {
  const [shown, setShown] = useState(false);

  return (
    <form
      action="#"
      onSubmit={(event) => {
        event.preventDefault();
        setShown(true);
      }}
    >
      <label>
        Name
        <input name="name" autoComplete="off" />
      </label>
      <label>
        Message
        <textarea name="message" />
      </label>
      <button type="submit">Submit</button>
      {shown ? <p>Demo only. This form does not send.</p> : null}
    </form>
  );
}
