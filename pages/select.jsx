import { useState, useEffect } from "react";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import moment from "moment/moment";
import supabase from "../supabase";
import Link from "next/link";

const Select = () => {
  // state to store data
  const [getdata, setData] = useState(null);
  const queryClient = new QueryClient();

  // query to get data
  const fetchData = async () => supabase.from("trainings").select("*");
  const { data, isFetching } = useQuery("selectFetch", fetchData);
  

  // get data
  // useEffect(() => {
  //   getList();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-20">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Content
                </th>
                <th scope="col" className="py-3 px-6">
                  Start Date
                </th>
                <th scope="col" className="py-3 px-6">
                  End Date
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.map((item) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      key={item.id}
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.title}
                      </th>
                      <td className="py-4 px-6">{item.content}</td>
                      <td className="py-4 px-6">
                        {moment(item.start_date_time).format("LLLL")}
                      </td>
                      <td className="py-4 px-6">
                        {moment(item.end_date_time).format("LLLL")}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={{
                            pathname: "/update",
                            query: { training: item.id },
                          }}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                  p;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Select;
