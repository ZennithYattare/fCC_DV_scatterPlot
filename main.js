/** @format */

import { scatterPlot } from "./scatterPlot";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <div class="bg-[#242424] flex h-screen w-screen place-items-center">
    <div class="min-w-[960px] w-[960px] h-[650px] border-4 border-t-slate-200 border-l-slate-200 border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] shadow-[5px_5px_5px_black] mx-auto p-4">
    <heading>
      <h1 id="title" class="text-4xl mx-auto w-max">Professional Bicycle Racing Doping Allegations</h1>
    </heading>
      <div id="scatter-plot" class="m-0 p-0"></div>
    </div>
  </div>
`;

scatterPlot(document.querySelector("#scatter-plot"));
