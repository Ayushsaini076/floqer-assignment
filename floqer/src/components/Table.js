import React, { useEffect, useState } from "react";
import Card from "./Card";
import Papa from "papaparse";
import Graph from "./Graph";
const Table = () => {
  const [data, setData] = useState([]);
  const [job, setJob] = useState(new Map());
  const [salary, setSalary] = useState(new Map());
  const [titles, setTitles] = useState(new Map());
  const [tcount, setTcount] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [second, setSecond] = useState(false);
  const [tnames, setTnames] = useState([]);

  const jobs = new Map();
  const salaries = new Map();
  const title = new Map();
  const tcnt = new Map();
  useEffect(() => {
    fetch("/salaries.csv")
      .then((res) => res.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (res) => {
            setData(res.data);
          },
        });
      });
    // var jobs = 0;
    console.log(data);
    for (const obj of data) {
      for (const key in obj) {
        if (key == "work_year") {
          if (jobs.has(obj[key])) {
            jobs.set(obj[key], jobs.get(obj[key]) + 1);
          } else {
            jobs.set(obj[key], 1);
          }

          // if (title.has(obj[key])) {
          //   const arr = title.get(obj[key]);
          //   if (!arr.includes(obj["job_title"])) {
          //     arr.push(obj["job_title"]);
          //   }
          // } else {
          //   title.set(obj[key], [obj["job_title"]]);
          // }

          if (tcnt.has(obj[key])) {
            const nested = tcnt.get(obj[key]);
            if (nested.has(obj["job_title"])) {
              nested.set(obj["job_title"], nested.get(obj["job_title"]) + 1);
            } else {
              nested.set(obj["job_title"], 1);
            }
          } else {
            tcnt.set(obj[key], new Map());

            const nested = tcnt.get(obj[key]);

            if (nested.has(obj["job_title"])) {
              nested.set(obj["job_title"], nested.get(obj["job_title"]) + 1);
            } else {
              nested.set(obj["job_title"], 1);
            }
          }

          if (salaries.has(obj[key])) {
            salaries.set(
              obj[key],
              salaries.get(obj[key]) + parseInt(obj["salary_in_usd"], 10)
            );
          } else {
            salaries.set(obj[key], parseInt(obj["salary_in_usd"], 10));
          }
        }
      }
    }
    
    
    console.log(tcnt);
    setTcount(tcnt);
    console.log(jobs);
    setJob(jobs);
    console.log(salaries);
    setSalary(salaries);
    setLoading(false);
    
  }, [loading]);

  
  return (
    <>
      <div className="h-[100%]">
        <div className="mt-[3rem] ml-[7rem]">
          <div className="w-[90%] h-auto grid grid-cols-4 gap-[5rem] items-center place-items-center text-[2rem] rounded-[1rem] p-[1rem] bg-[#0360D9] text-white">
            <span>Year</span>
            <span>Number of Jobs</span>
            <span>Avg Salary in USD</span>
            <span>More details</span>
          </div>
          {loading == true ? (
            <>
              <div className="h-[5rem] w-[90%] mt-[2rem] animate-pulse bg-white" />
              <div className="h-[5rem] w-[90%] mt-[2rem] animate-pulse bg-white" />
              <div className="h-[5rem] w-[90%] mt-[2rem] animate-pulse bg-white" />
              <div className="h-[5rem] w-[90%] mt-[2rem] animate-pulse bg-white" />
              <div className="h-[5rem] w-[90%] mt-[2rem] animate-pulse bg-white" />
            </>
          ) : (
            <div className="h-[50%]">
              <Card
                
                jcount = {tcount.get("2020")}
                year={2020}
                jobs={job.get("2020")}
                avg={salary.get("2020") / job.get("2020")}
              />
              <Card
                
                jcount = {tcount.get("2021")}
                year={2021}
                jobs={job.get("2021")}
                avg={salary.get("2021") / job.get("2021")}
              />
              <Card
              
              jcount = {tcount.get("2022")}
                year={2022}
                jobs={job.get("2022")}
                avg={salary.get("2022") / job.get("2022")}
              />
              <Card
              jcount = {tcount.get("2023")}
                year={2023}
                jobs={job.get("2023")}
                avg={salary.get("2023") / job.get("2023")}
              />
              <Card
              jcount = {tcount.get("2024")}
                year={2024}
                jobs={job.get("2024")}
                avg={salary.get("2024") / job.get("2024")}
              />
            </div>
          )}

        </div>
        
        <div className="w-[100%] h-[55%]  mt-[3.5rem] flex justify-around items-center">
          {loading == true ? (
            <>
              <div className="h-[20rem] w-[45%] bg-white" />
              <div className="h-[20rem] w-[45%] animate-pulse bg-white" />
            </>
          ) : (
            <>
              <Graph mapData={job} name={"Number of jobs each year"} />
              <Graph mapData={salary} name={"Avg salary of employees in USD"} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
