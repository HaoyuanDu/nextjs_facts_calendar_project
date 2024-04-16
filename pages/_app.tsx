import { useEffect, useState } from "react";
import { TheDatePicker } from "../src/component/datePicker";
import { LoadingPage } from "../src/component/Loading";
import { Header } from "../src/component/Header";
import useFetchFacts from "../src/hooks/useFetchFacts";
import { FavoriteList } from "../src/component/FavoriteList";
import { SearchResult } from "../src/component/SearchResult";
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

  const [startDate, setStartDate] = useState<Date>(new Date());
  useEffect(() => {
    setDate(startDate.getMonth() + 1 + "/" + startDate.getDate());
    onSubmit();
  }, [startDate]);

  // if (isLoading) return <LoadingPage />;

  return (
    <div>
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 md:h-[100vh] sm:h-[10vh] w-full">
        <div>
          <section className="w-full md:w-[900px] lg:w-[1300px] p-4 flex flex-col text-center justify-center items-center bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-900 md-overflow-scroll ">
            <Header />

            <div className="relative flex  mt-6 ">
              <TheDatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                factDate={factDate}
                setDate={setDate}
              />
            </div>

            <button
              className=" flex justify-center  rounded-full border border-white text-sm font-bold leading-7 text-gray-600 px-12 my-2  hover:text-white  mt-4"
              onClick={onSubmit}
            >
              Search
            </button>
            <label className="label">
              {/* <span className="text-sm text-red-600 mt-4">
                {errors && errors.errorType == "fetchError"
                  ? errors.errorMessage
                  : ""}
              </span> */}
            </label>
            <SearchResult
              addFavorite={addFavorite}
              data={data}
              errors={errors}
            />

            <h1 className="text-4xl font-black mt-4">
              <span className="font-thin">Favorite List</span>
            </h1>
            <div>
              <FavoriteList
                favoriteList={favoriteList}
                removeFavorite={removeFavorite}
                errors={errors}
                data={data}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
