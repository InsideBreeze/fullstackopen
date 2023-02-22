import axios from "axios";
import React, { FormEvent, useEffect } from "react";
import ErrorNotification from "./ErrorNotification";
import { DiaryEntry, InputFields } from "./types";

const App = () => {
  const [diaries, setDiaries] = React.useState<DiaryEntry[]>([]);
  const [fileds, setFields] = React.useState<InputFields>({
    date: "",
    comment: "",
    weather: "",
    visibility: "",
  });
  const [errorMessge, setErrorMessage] = React.useState<string | null>(null);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3001/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      });
  }, []);

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<DiaryEntry>(
        "http://localhost:3001/api/diaries",
        fileds
      );
      setDiaries(diaries.concat(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
        setTimeout(() => setErrorMessage(null), 3000);
      } else if (error instanceof Error) {
        console.error(error.message);
      }
      console.log("la", error);
    }
    setFields({
      date: "",
      comment: "",
      weather: "",
      visibility: "",
    });
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <ErrorNotification message={errorMessge} />

      <form onSubmit={handleSumbit}>
        <div>
          date{" "}
          <input
            value={fileds.date}
            onChange={(e) => setFields({ ...fileds, date: e.target.value })}
          />
        </div>
        <div>
          visibility{" "}
          <input
            value={fileds.visibility}
            onChange={(e) =>
              setFields({ ...fileds, visibility: e.target.value })
            }
          />
        </div>
        <div>
          weather{" "}
          <input
            value={fileds.weather}
            onChange={(e) => setFields({ ...fileds, weather: e.target.value })}
          />
        </div>
        <div>
          comment{" "}
          <input
            value={fileds.comment}
            onChange={(e) => setFields({ ...fileds, comment: e.target.value })}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h3>Diary entries</h3>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
