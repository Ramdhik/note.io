import React from 'react';

const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#fff] p-6 flex flex-col gap-4 max-w-md w-full">
    {children}
  </form>
);

export const FormInput = ({ label, ...props }) => (
  <label className="flex flex-col font-bold text-black dark:text-white gap-2">
    {label}
    <input
      {...props}
      className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-lg px-4 py-2 font-bold shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
    />
  </label>
);

export const FormTextarea = ({ label, ...props }) => (
  <label className="flex flex-col font-bold text-black dark:text-white gap-2">
    {label}
    <textarea
      {...props}
      className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-lg px-4 py-2 font-bold shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition resize-none"
    />
  </label>
);

export default Form;
