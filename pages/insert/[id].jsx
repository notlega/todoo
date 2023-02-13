import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../supabase";
import Link from "next/link";

const { DateTime } = require("luxon");

const Insert = () => {
  // state to handle submit
  const [handleSubmit, setHandleSubmit] = useState(null);
  const [checkSubmit, setCheckSubmit] = useState(false);
  const [getUser, setUser] = useState(null);
  const [getName, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // insert data function
  async function insertItem() {
    // console.log(DateTime.fromJSDate(handleSubmit.start).toISO());
    const { error } = await supabase.from("trainings_2").insert({
      title: handleSubmit.title,
      content: handleSubmit.content,
      start_date_time: DateTime.fromJSDate(handleSubmit.start).toISO(),
      end_date_time: DateTime.fromJSDate(handleSubmit.end).toISO(),
      userid: getUser,
    });

    if (error) {
      console.log(error);
    }
  }

    const router = useRouter();
    const { id } = router.query;
    console.log(id);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  
  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  useEffect(() => {
      setUser(localStorage.getItem("user"));
      setName(localStorage.getItem("name").toString());
    // check if the form has been filled in
    if (handleSubmit !== null) {
      // call data insert function
      insertItem();
      // status for success submit
      setCheckSubmit(true)
    }
  }, [handleSubmit]);


  return (
    <div>
      <form
        className="w-full max-w-lg mx-auto mt-5"
        onSubmit={async (e) => {
          e.preventDefault();
          setHandleSubmit({
            title: e.target[0].value,
            content: e.target[1].value,
            start: new Date(e.target[2].value),
            end: new Date(e.target[3].value),
          });
        }}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <h4>User name: {getName}</h4> <br />
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
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="content"
              type="text"
              placeholder="Training for ..."
              value={content}
              onChange={handleContentChange}
              required
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
              required
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
              required
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
      <Link
        className="bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mt-5 ml-60"
        href={`/select/${id}`}
      >
        Go to select
      </Link>
      {checkSubmit && (
        <div
          className="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 mt-10 mx-40"
          role="alert"
        >
          <p className="font-bold">Thank you</p>
          <p className="text-sm">New training details have been added.</p>
        </div>
      )}
    </div>
  );
};

export default Insert;
