import { useState } from "react";
import moment from "moment/moment";
import supabase from "../supabase";

const Insert = () => {
  // state to handle submit
  const [handleSubmit, setHandleSubmit] = useState(null);

  // insert data function
  async function insertItem() {
    const { error } = await supabase.from("trainings").insert({
      title: handleSubmit.title,
      content: handleSubmit.content,
      start_date_time: handleSubmit.start,
      end_date_time: handleSubmit.end,
    });

      if (error) {
        console.log(error)
      }
  }

  // check if the form has been filled in
  if (handleSubmit !== null ) {
    
    // call data insert function
    insertItem();
    // console.log(handleSubmit)

  }
  return (
    <form
      className="w-full max-w-lg mx-auto mt-5"
      onSubmit={async (e) => {
        e.preventDefault();
        await setHandleSubmit({
          title: e.target[0].value,
          content: e.target[1].value,
          start: moment(e.target[2].value).format(),
          end: moment(e.target[3].value).format(),
        });
      }}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="title"
            type="text"
            placeholder="training 1"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="context"
          >
            Content
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="context"
            type="text"
            placeholder="Training for ..."
          />
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
          <input
            name="start"
            type="datetime-local"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date start"
          />
        </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
          <input
            name="end"
            type="datetime-local"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date end"
          />
        </div>
      </div>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-5"
        type="submit"
        htmlFor="add training"
      >
        Submit
      </button>
    </form>
  );
};

export default Insert;
