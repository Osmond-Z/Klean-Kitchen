import axios from "axios";

import {
  AgeType,
  ContactType,
  DataResult,
  Gender,
  Result,
  ResultType,
} from "../types/commonTypes";

export async function login(email: string, password: string): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/login?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    //   const response = await axios.post<Result>(url, {
    //       LoginName: email,
    //       Password: password
    //   });
    //   return response.data;
    return {
      type: ResultType.success,
      message: "success",

      showMessage: true,
      // loginName: "osmond951024@163.com",
    };
  } catch (err) {
    throw err;
  }
}
