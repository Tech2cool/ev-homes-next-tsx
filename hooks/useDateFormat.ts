"use client";
import moment from "moment-timezone";

export const dateFormatWithTime = (dateStr: moment.MomentInput) => {
  const localTime = moment.utc(dateStr).local().format("DD MMM YYYY HH:mm");
  return localTime;
};

export const dateFormatOnly = (dateStr: moment.MomentInput) => {
  if (!dateStr) return "NA";
  const localTime = moment.utc(dateStr).local().format("DD MMM YYYY");
  return localTime;
};

export const timeFormatOnly = (dateStr: moment.MomentInput) => {
  if (!dateStr) return "NA";
  const localTime = moment.utc(dateStr).local().format("hh:mm a");
  return localTime;
};
