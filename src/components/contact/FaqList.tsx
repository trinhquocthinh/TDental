import { contactFaqs } from '@/data/contact';

export function FaqList() {
  return (
    <ul className="faq-list">
      {contactFaqs.map(faq => (
        <li className="faq-item" key={faq.question}>
          <h3 className="h3">{faq.question}</h3>
          <p className="faq-text">{faq.answer}</p>
        </li>
      ))}
    </ul>
  );
}
