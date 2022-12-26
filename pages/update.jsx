import { useState, useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation
} from "react-query";
import { useRouter } from "next/router";
import moment from "moment/moment";
import supabase from "../supabase";

const Insert = () => {
  // state to handle submit
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [CheckUpdate, setCheckUpdate] = useState(false);
  const queryClient = useQueryClient();

  const router = useRouter();
  // set selected id 
  const id = router.query.training;

  // query to get data
  const { data } = useQuery({
    queryKey: ["updateFetch", id],
    queryFn: async () =>
      supabase.from("trainings").select("*").eq("id", id),
  });

  // to prevent many renders
  useEffect(() => {
    if (data) {
      // set title value
      setTitle(data.data[0].title);
      // set content value
      setContent(data.data[0].content);
      // set update staus 
      setCheckUpdate(true)
    }
  }, [data]);

  // handle data update
  const setTrain = async ({ title, content, start, end }) => {
    const { data, error } = await supabase
      .from("trainings")
      .update({
        title: title,
        content: content,
        start_date_time: start,
        end_date_time: end,
      })
      .eq("id", id);
      if (error) {
        console.log(error)
      }
  };

   const refresh = {
     onSuccess: () => {
       queryClient.invalidateQueries("selectFetch");
       queryClient.invalidateQueries("updateFetch");
     },
   };

   const { mutate } = useMutation(setTrain, refresh);

   const useUpdate = (title, content, start, end) => {
    return useMutation(
         supabase
      .from("trainings")
      .update({
        title: title,
        content: content,
        start_date_time: start,
        end_date_time: end,
      })
      .eq("id", id),
      {
        onSuccess: refresh
      }
    )
   }
  return (
    <div className="justify-center">
      <form
        className="w-full max-w-lg mx-auto mt-5"
        onSubmit={async (e) => {
          e.preventDefault();
          mutate({
            title: title,
            content: content,
            start: moment(start).format(),
            end: moment(end).format(),
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
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
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </div>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="context"
        >
          Current Training timing
        </label>
        <div className="flex items-center mb-10">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pointer-events-none"></div>
            <text
              name="current start"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {data && moment(data.data[0].start_date_time).format("LLLL")}
            </text>
          </div>
          <span className="mx-4 text-gray-500">to</span>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
            <text
              name="current end"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {data && moment(data.data[0].end_date_time).format("LLLL")}
            </text>
          </div>
        </div>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="context"
        >
          Update Training timing
        </label>
        <div className="flex items-center">
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
            <input
              name="start"
              type="datetime-local"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date start"
              value={start}
              onChange={(e) => {
                setStart(e.target.value);
              }}
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
              value={end}
              onChange={(e) => {
                setEnd(e.target.value);
              }}
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
      {CheckUpdate && (
        <div
          class="bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3 mt-10 mx-40"
          role="alert"
        >
          <p class="font-bold">Thank you</p>
          <p class="text-sm">New training details have been updated.</p>
        </div>
      )}
    </div>
  );
};

export default Insert;
