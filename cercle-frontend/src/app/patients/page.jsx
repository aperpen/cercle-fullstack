"use client";
import classes from './patients.module.css'

export default function PatientsTable() {
  return (
    <>
      <h1 className="text-5xl font-extrabold dark:text-white">List of patients</h1>
      <table className={classes.table}></table>
    </>
  );
}
