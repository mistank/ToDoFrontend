import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import TasksTable from "./TasksTable.jsx";
import { IconButton, Button, ButtonGroup, ButtonToolbar } from "rsuite";
import "rsuite/Button/styles/index.css";
import "rsuite/ButtonGroup/styles/index.css";
import "rsuite/ButtonToolbar/styles/index.css";
import { ThemeContext } from "../../ThemeContext.jsx";

const apiURL = "http://localhost:8000";
export default function TaskListView() {
  const { userInfo } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activeButton, setActiveButton] = useState("Date");
  const [activeSubOption, setActiveSubOption] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  useEffect(() => {
    setTasks((prevTasks) => sortTasks([...prevTasks], sortBy));
  }, [sortBy]);

  const fetchUserTasks = (skip = 0, limit = 100) => {
    axios
      .get(`${apiURL}/tasks-assigned-to-user/${userInfo.id}`, {
        params: { skip, limit },
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const buttonStyles = (isActive, isFirst) => ({
    backgroundColor: isActive ? "#5051F9" : "transparent",
    color: darkTheme ? "white" : isActive ? "white" : "black",
    border: "1px solid #5051F9",
    width: "100px", // Postavite širinu dugmadi
    borderRadius: isFirst ? "20px 0px 0px 20px" : "0px 20px 20px 0px", // Zaobljenje ivica
    padding: "10px 20px", // Dodajte padding za bolji izgled
    textAlign: "center", // Centrirajte tekst
  });

  const subButtonStyles = (isActive) => ({
    backgroundColor: isActive ? "#5051F9" : "transparent",
    color: darkTheme ? "white" : isActive ? "white" : "black",
    border: "1px solid #5051F9",
    width: "100px", // Postavite širinu dugmadi
    borderRadius: "20px", // Zaobljenje ivica
    padding: "10px 20px", // Dodajte padding za bolji izgled
    textAlign: "center", // Centrirajte tekst
    margin: "5px", // Dodajte margin za razmak između dugmadi
  });

  const filterTasks = (tasks) => {
    console.log("Filter by: ", filterBy);
    if (filterBy === "Today") {
      const today = new Date().toISOString().split("T")[0];
      console.log("Danas je: ", today);
      return tasks.filter((task) => task.deadline.split("T")[0] === today);
    } else if (filterBy === "This week") {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
      return tasks.filter(
        (task) =>
          new Date(task.deadline) >= startOfWeek &&
          new Date(task.deadline) <= endOfWeek,
      );
    } else if (filterBy === "Next week") {
      const now = new Date();
      const startOfNextWeek = new Date(
        now.setDate(now.getDate() - now.getDay() + 7 + 1),
      );
      const endOfNextWeek = new Date(
        now.setDate(now.getDate() - now.getDay() + 13),
      );
      return tasks.filter(
        (task) =>
          new Date(task.deadline) >= startOfNextWeek &&
          new Date(task.deadline) <= endOfNextWeek,
      );
    } else if (filterBy === "High") {
      return tasks.filter((task) => task.priority === "High");
    } else if (filterBy === "Medium") {
      return tasks.filter((task) => task.priority === "Medium");
    } else if (filterBy === "Low") {
      return tasks.filter((task) => task.priority === "Low");
    }
    return tasks;
  };

  const sortTasks = (tasks) => {
    console.log("Sort by: ", sortBy);
    if (sortBy === "date") {
      console.log("Sortiram po datumu");
      return tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortBy === "priority") {
      console.log("Sortiram po prioritetu");
      const priorityOrder = ["High", "Medium", "Low"];
      return tasks.sort(
        (a, b) =>
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority),
      );
    }
    return tasks;
  };

  const sortedAndFilteredTasks = sortTasks(filterTasks(tasks));

  const handleToggle = (button) => {
    setActiveButton(button);
    setActiveSubOption(null);
    setFilterBy("");
    if (button === "Date") {
      setSortBy("date");
    } else if (button === "Priority") {
      setSortBy("priority");
    }
  };

  const handleSubToggle = (option) => {
    setActiveSubOption(option);
    if (["High", "Medium", "Low"].includes(option)) {
      setSortBy("date");
      setFilterBy(option);
    } else if (["Today", "This week", "Next week"].includes(option)) {
      setSortBy("priority");
      setFilterBy(option);
    } else {
      setSortBy(null);
      setFilterBy(null);
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between pr-8">
        <h2 className="text-3xl font-bold xs:text-lg">Your tasks</h2>
        {/* Ubaciti combo box za filtraciju */}
        <div>
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                style={buttonStyles(activeButton === "Date", true)}
                onClick={() => handleToggle("Date")}
              >
                Date
              </Button>
              <Button
                style={buttonStyles(activeButton === "Priority", false)}
                onClick={() => handleToggle("Priority")}
              >
                Priority
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <ButtonToolbar>
          <ButtonGroup>
            {activeButton === "Date" ? (
              <>
                <Button
                  style={subButtonStyles(activeSubOption === "Today")}
                  onClick={() => handleSubToggle("Today")}
                >
                  Today
                </Button>
                <Button
                  style={subButtonStyles(activeSubOption === "This week")}
                  onClick={() => handleSubToggle("This week")}
                >
                  This week
                </Button>
                <Button
                  style={subButtonStyles(activeSubOption === "Next week")}
                  onClick={() => handleSubToggle("Next week")}
                >
                  Next week
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={subButtonStyles(activeSubOption === "High")}
                  onClick={() => handleSubToggle("High")}
                >
                  High
                </Button>
                <Button
                  style={subButtonStyles(activeSubOption === "Medium")}
                  onClick={() => handleSubToggle("Medium")}
                >
                  Medium
                </Button>
                <IconButton
                  style={subButtonStyles(activeSubOption === "Low")}
                  onClick={() => handleSubToggle("Low")}
                >
                  Low
                </IconButton>
              </>
            )}
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <TasksTable tasks={sortedAndFilteredTasks} setTasks={setTasks} />
    </>
  );
}
