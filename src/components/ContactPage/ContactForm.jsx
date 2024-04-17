import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border-[1px] border-richblue-300 bg-richblue-400 text-white rounded-xl p-7 pt-4 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-normal font-semibold text-richblack-5">
        Got a Idea? Partner with Us at Our Farmer's Market Platform. <br /> Let's Grow Together!
      </h1>
      <p className="text-richblack-200 font-semibold">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;