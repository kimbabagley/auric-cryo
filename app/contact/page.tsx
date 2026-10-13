import type { Metadata } from "next";
import { ContactForm } from "../../components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="section page-top">
      <div className="container contact-grid">
        <div>
          <h1>Contact</h1>
          <p className="lead">This demo has no inbox. You can try the form, but messages stay in your browser.</p>
          <p className="fine">For laboratory research use only. Not for human consumption.</p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
