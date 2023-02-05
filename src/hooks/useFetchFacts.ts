import { useState, useEffect } from "react";
import { dataBase } from "../constants/dataBase";

export type ErrorProps = {
  errorMessage: string;
  errorType?: string;
};

const useFetchFacts = () => {
  const [data, setData] = useState("");
  const [factDate, setFactDate] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState(dataBase);

  const [errors, setErrors] = useState<ErrorProps | null>();
  const BASE_URL = "http://numbersapi.com/";

  useEffect(() => {
    setFavoriteList(dataBase);
  }, [dataBase]);

  const onSubmit = () => {
    if (!factDate) return;
    getFact(factDate);
  };
  const getFact = (date: string) => {
    setLoading(true);

    fetch(`${BASE_URL}${date}/date`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://numbersapi.com",

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.text())
      .then(
        (data) => {
          setData(data);
          setLoading(false);
          setErrors(null);
        },
        (error) => {
          console.log("error", error.typeError);
          setLoading(true);
          setErrors({
            errorType: "fetchError",
            errorMessage:
              "Mixed Content: The page at 'https://haoyuandu.github.io/Facts_Calendar_ReactJs/' was loaded over HTTPS, but requested an insecure resource 'http://numbersapi.com/1/5/date'. This request has been blocked; the content must be served over HTTPS.",
          });
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const setDate = (date: string) => {
    setFactDate(date);
  };

  const addFavorite = () => {
    if (dataBase.has(factDate)) {
      const facts = dataBase.get(factDate);
      for (let i of facts!) {
        if (i == data) {
          setErrors({
            errorType: "duplicateError",
            errorMessage: "This fact already exist in the list",
          });
          // setError("This fact already exist in the list");
          console.log("it already there");
          return;
        }
      }
      facts!.push(data);
      dataBase.set(factDate, facts!);
    } else {
      dataBase.set(factDate, [data]);
    }
    setFavoriteList(new Map(dataBase));
  };
  return {
    data,
    isLoading,
    factDate,
    setDate,
    onSubmit,
    addFavorite,
    favoriteList,
    errors,
  };
};

export default useFetchFacts;
