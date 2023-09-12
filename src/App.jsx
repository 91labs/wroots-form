import React from "react";
import Form from "./pages/Form";
import JobIcon from './images/jobhead.png';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="block w-full p-4 mx-auto mb-12 relative">
      <ToastContainer />
      <div className="flex flex-row gap-2 items-center bg-white bg-opacity-70 backdrop-blur-md sticky top-0 z-10 mb-8">
        <img src={JobIcon} width={60}/>
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold text-gray-800">
            Create a New Job Posting
          </h1>
          <p className="text-lg text-gray-500">
            Use this form to create a new Job Posting. All Jobs Posted will be
            showing in Wrae App.
          </p>
        </div>
      </div>
      <Form />
    </div>
  );
}

export default App;
