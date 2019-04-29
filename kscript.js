import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 100,
  duration: "30s"
};

export default function() {
  http.get(`http://localhost:3004/homes/${Math.floor(Math.random() * 10000000)}/nearby`);
  sleep(0.125);
};