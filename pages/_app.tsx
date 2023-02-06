import { useEffect, useState } from "react";
import { TheDatePicker } from "../src/component/datePicker";
import { LoadingPage } from "../src/component/Loading";
import { Header } from "../src/component/Header";
import useFetchFacts from "../src/hooks/useFetchFacts";
import { FavoriteList } from "../src/component/FavoriteList";
import "../styles/globals.css";

const App = () => {
  const {
    data,
    isLoading,
    factDate,
    setDate,
    onSubmit,
    addFavorite,
    removeFavorite,
    favoriteList,
    errors,
  } = useFetchFacts();

  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    setDate(startDate?.getMonth() + 1 + "/" + startDate.getDate());
    onSubmit();
  }, [startDate]);

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
        <div>
          <section className="w-full md:max-w-[1300px] p-4 flex flex-col text-center items-center justify-center md:px-10  bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
            <Header />

            <div className="relative flex mt-10 md:mt-4">
              <TheDatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                factDate={factDate}
                setDate={setDate}
              />
            </div>
            <button
              className="book-demo block min-w-[120px] rounded-full border border-white  px-4 text-sm font-bold leading-7 text-gray-600 transition  hover:text-white  mt-4"
              onClick={onSubmit}
            >
              Search
            </button>
            <label className="label">
              <span className="text-sm text-red-600">
                {errors && errors.errorType == "fetchError"
                  ? errors.errorMessage
                  : ""}
              </span>
            </label>
            <div className="flex flex-wrap justify-between text-zinc-700">
              {data ? (
                <div className="inline-flex items-baseline justify-center md:max-w-[1000px] md:px-5 lg:p-6 h-6 lg:h-[150px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700 mt-5 ">
                  <span>{data}</span>
                  <div>
                    <button
                      className="justify-center block min-w-[120px] rounded-full border border-white  px-4 text-sm font-bold leading-7 text-gray-600   hover:text-white  mt-4"
                      onClick={addFavorite}
                    >
                      addFavorite
                    </button>
                    <label className="label">
                      <span className="text-sm text-red-600">
                        {errors && errors.errorType == "duplicateError"
                          ? errors.errorMessage
                          : ""}
                      </span>
                    </label>
                  </div>
                </div>
              ) : (
                <span className="inline-flex items-baseline justify-center md:max-w-[1000px] md:px-5 lg:p-6 h-6 lg:h-full bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700 mt-5">
                  Example: January 1st is the day in 1806 that the French
                  Republican Calendar is abolished.
                  <button
                    className=" block min-w-[120px] rounded-full border border-white  px-4 text-sm font-bold leading-7 text-gray-600   hover:text-white  mt-4"
                    onClick={addFavorite}
                  >
                    addFavorite
                  </button>
                </span>
              )}
            </div>
            <h1 className="text-4xl font-black mt-4">
              <span className="font-thin">Favorite List</span>
            </h1>
            <div className="inline-flex items-baseline justify-center md:max-w-[1000px] md:px-5 lg:p-6 h-6 lg:h-[350px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700 mt-5 overflow-scroll">
              <div>
                <FavoriteList
                  favoriteList={favoriteList}
                  removeFavorite={removeFavorite}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
