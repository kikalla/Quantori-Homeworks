import { useEffect, useState } from "react";
import "./header.css";
import { DEFAULT_CITY, key } from "../../config";
import React from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import TasksState from "../../models/TasksStore";
import { formActions } from "../../store/form-slice";
import { NavLink, useSearchParams } from "react-router-dom";
import { tasksActions } from "../../store/tasks-slice";

const AppHeader: React.FC = () => {
  const dispatch: ThunkDispatch<TasksState, unknown, AnyAction> = useDispatch();

  const changeFormVisibility = () => {
    dispatch(formActions.toggleAddFormVisibility({}));
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("task") || "";
  const searchURL = search !== "" ? `?task=${search}` : "";

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const task = event.target.value;
    if (task) {
      setSearchParams({ task });
    } else {
      setSearchParams({});
    }
    dispatch(tasksActions.updateSearch({ search: search }));
  };

  useEffect(() => {
    dispatch(
      tasksActions.updateSearch({ search: searchParams.get("task") || "" })
    );
  }, [dispatch, searchParams]);

  interface WeatherResponse {
    location: {
      name: string;
    };
    current: {
      temp_c: number;
      condition: {
        icon: string;
      };
    };
  }

  interface NavigationPosition {
    coords: {
      latitude: number;
      longitude: number;
    };
  }

  const [temp, setTemp] = useState("");
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    (async () => {
      const getWeatherForUserLocation = async (
        position: NavigationPosition
      ) => {
        const { latitude, longitude } = position.coords;
        try {
          const locationResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const locationData = await locationResponse.json();
          const locationCity = locationData.address.city;

          const weatherRes = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${key}&q=${locationCity}&aqi=no`
          );
          if (weatherRes.status !== 200) throw new Error();

          const weatherData: WeatherResponse = await weatherRes.json();

          setTemp(`${weatherData.current.temp_c}° `);
          setCity(locationCity);
          setWeatherIcon(weatherData.current.condition.icon);
        } catch {
          setTemp(`Something Went Wrong`);
          setCity(``);
        }
      };

      const getWeatherForDefaultLocation = async () => {
        try {
          const weatherRes = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${key}&q=${DEFAULT_CITY}&aqi=no`
          );
          if (weatherRes.status !== 200) throw new Error();
          const weatherData: WeatherResponse = await weatherRes.json();
          setTemp(`${weatherData.current.temp_c}° `);
          setWeatherIcon(weatherData.current.condition.icon);
        } catch {
          setTemp(`Something Went Wrong`);
          setCity(``);
        }
      };

      navigator.geolocation.getCurrentPosition(
        getWeatherForUserLocation,
        getWeatherForDefaultLocation
      );
    })();
  }, []);

  return (
    <header className="header flex">
      <div className="header__container flex">
        <h1>To Do List</h1>
        <span className="header__weather flex">
          <img src={weatherIcon} alt="" />
          <span className="header__weather--temp">{temp}</span>
          <span className="header__weather--city">{city}</span>
        </span>
      </div>
      <div className="header__search flex">
        <input
          onChange={searchHandler}
          type="text"
          placeholder="Search Task"
          className="header__input"
          value={search}></input>
        <button className="header__button" onClick={changeFormVisibility}>
          + New Task
        </button>
      </div>
      <div className="flex header__sort-wrapper">
        <NavLink
          className={"header__sort header__sort--work"}
          to={`/work${searchURL}`}>
          Work
        </NavLink>
        <NavLink
          className={"header__sort header__sort--other"}
          to={`/other${searchURL}`}>
          Other
        </NavLink>
        <NavLink
          className={"header__sort header__sort--home"}
          to={`/home${searchURL}`}>
          Home
        </NavLink>
        <NavLink
          className={"header__sort header__sort--health"}
          to={`/health${searchURL}`}>
          Health
        </NavLink>
        <NavLink
          className={"header__sort header__sort--reset"}
          to={`/${searchURL}`}>
          Reset Sort
        </NavLink>
      </div>
    </header>
  );
};

export default React.memo(AppHeader);
