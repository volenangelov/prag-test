import React, { useState, FormEvent } from 'react';

interface ContactFormProps {
  formId: any;
  siteUrl: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ formId, siteUrl }) => {

    const [formData, setFormData] = useState({
    'your-name': '',
    'your-email': '',
    'your-subject': '',
    'your-message': '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: false, error: '' });

    try {
      // Using the Next.js API route instead of directly calling WordPress
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.status === 'mail_sent') {
        setFormStatus({ submitting: false, success: true, error: '' });
        setFormData({ 'your-name': '', 'your-email': '', 'your-subject': '', 'your-message': '' });
      } else {
        setFormStatus({ 
          submitting: false, 
          success: false, 
          error: data.message || 'Unknown error occurred' 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ 
        submitting: false, 
        success: false, 
        error: 'Failed to submit form. Please try again later.' 
      });
    }
  };
  
  return (
    <div className="py-6 lg:pt-6 pb-8 lg:pb-12 px-6 lg:px-12 flex justify-center h-full items-center dark:border-gray-500 dark:border">
      <form onSubmit={handleSubmit} className="w-full">
          <div className="form-row">
            <input
              type="text"
              id="your-name"
              name="your-name"
              value={formData['your-name']}
              onChange={handleInputChange}
              placeholder='Full name'
              className="w-full mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="form-row">
            <input
              type="email"
              id="your-email"
              name="your-email"
              value={formData['your-email']}
              onChange={handleInputChange}
              placeholder='Email address'
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="form-row">
            <input
              type="text"
              id="your-subject"
              name="your-subject"
              value={formData['your-subject']}
              onChange={handleInputChange}
              placeholder='Subject'
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="form-row">
            <textarea
              id="your-message"
              name="your-message"
              value={formData['your-message']}
              onChange={handleInputChange}
              rows={5}
              placeholder='Message'
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {formStatus.error && (
            <div className="error-message p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {formStatus.error}
            </div>
          )}
          
          <div className="form-row">
            <button
              type="submit"
              disabled={formStatus.submitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {formStatus.submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
    </div>
  );
};

export default ContactForm;
// "use client";
// import React, { useState, useEffect } from 'react';

// interface ContactFormProps {
//   formId: any;
//   siteUrl: string;
// }

// const ContactForm: React.FC<ContactFormProps> = ({ formId, siteUrl }) => {
//   const [loading, setLoading] = useState(true);
//   const [formHTML, setFormHTML] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [submitResult, setSubmitResult] = useState<{
//     status: string;
//     message: string;
//   } | null>(null);

//   // Fetch the form HTML from WordPress
//   useEffect(() => {
//     const fetchForm = async () => {
//       try {
//         const response = await fetch(
//           `${siteUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}`
//         );
//         const data = await response.json();
        
//         if (data.properties && data.properties.form) {
//           setFormHTML(data.properties.form);
//         } else {
//           console.error('Form data structure is not as expected:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching form:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchForm();
//   }, [formId, siteUrl]);

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSubmitting(true);
//     setSubmitResult(null);

//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     try {
//       const response = await fetch(
//         `${siteUrl}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       const result = await response.json();
//       setSubmitResult({
//         status: result.status,
//         message: result.message
//       });
      
//       // If submission was successful, reset the form
//       if (result.status === 'mail_sent') {
//         form.reset();
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setSubmitResult({
//         status: 'error',
//         message: 'An unexpected error occurred. Please try again later.'
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Create a container ref to inject the form
//   const formContainerRef = React.useRef<HTMLDivElement>(null);

//   // Once we have the form HTML, inject it into the DOM
//   useEffect(() => {
//     if (formHTML && formContainerRef.current) {
//       formContainerRef.current.innerHTML = formHTML;
      
//       // Find the form element and add our submit handler
//       const formElement = formContainerRef.current.querySelector('form');
//       if (formElement) {
//         formElement.addEventListener('submit', handleSubmit as any);
//       }
//     }
    
//     // Cleanup function to remove event listener
//     return () => {
//       if (formContainerRef.current) {
//         const formElement = formContainerRef.current.querySelector('form');
//         if (formElement) {
//           formElement.removeEventListener('submit', handleSubmit as any);
//         }
//       }
//     };
//   }, [formHTML]);

//   if (loading) {
//     return <div className="py-4">Loading form...</div>;
//   }

//   return (
//     <div className="cf7-form-container">
//       {submitResult && (
//         <div 
//           className={`p-4 mb-4 rounded ${
//             submitResult.status === 'mail_sent' 
//               ? 'bg-green-100 text-green-700 border border-green-400' 
//               : 'bg-red-100 text-red-700 border border-red-400'
//           }`}
//         >
//           {submitResult.message}
//         </div>
//       )}
      
//       <div 
//         ref={formContainerRef} 
//         className="cf7-form-wrapper"
//       />
      
//       {submitting && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-5 rounded-lg shadow-lg">
//             <p>Sending your message...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactForm;