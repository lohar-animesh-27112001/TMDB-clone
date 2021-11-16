// Controller
// import { fetchPopularMovies, fetchSearchResult } from "./models";
// import {
//     renderCards,
//     showSpinner,
//     clearSpinner,
//     submitValue,
//     takeInput,
//     clearFields,
//     swapPage,
// } from "./view/view";
// import { elements } from "./view/base";

// async function loadPopularData() {
//     showSpinner();
//     let { results } = await fetchPopularMovies();
//     clearSpinner();
//     renderCards(results);
// }

// loadPopularData();

// elements.input.addEventListener("change", takeInput);

// let searchresult = "";
// elements.form.addEventListener("submit", async(e) => {
//     searchresult = submitValue(e);
//     clearFields();
//     let { results } = await fetchSearchResult(searchresult.trim());
//     renderCards(results);
// });
// elements.categories.addEventListener("click", async(e) => {
//     let link = swapPage(e);
//     let { results } = await fetchPopularMovies(link.trim());
//     console.log(results);
//     renderCards(results);
//     console.log(link.trim());
// });

// ---------------------------------------

import { fetchPopularMovies } from "./models";
import { elements } from "./view/base";
import {
    renderCards,
    showSpinner,
    clearSpinner,
    takeInput,
    submitValue,
    clearFields,
} from "./view/view";
async function loadPopularData() {
    showSpinner();
    let { results } = await fetchPopularMovies();
    clearSpinner();
    renderCards(results);
    // console.log(await fetchPopularMovies());
}
loadPopularData();
elements.input.addEventListener(`change`, takeInput);
let searchresult = "";
let value = elements.form.addEventListener(`submit`, (e) => {
    searchresult = submitValue(e);
    clearFields(e);
});
console.log(value);