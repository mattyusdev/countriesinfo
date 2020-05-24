$(() => {

  searchCountries(
    "http://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag"
  )

  $("form").submit(e => e.preventDefault());

  $("input").keyup(() => {
    setTimeout(
      searchCountries(
        "http://restcountries.eu/rest/v2/name/" +
        $("input").val() +
        "?fields=name;topLevelDomain;capital;currencies;flag"
      ), 200)


    if ($("input").val() == '') {
      searchCountries(
        "http://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag"
      )
    }
  });

  $("button").click(() =>
    searchCountries(
      "http://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag"
    )
  );

  function searchCountries(target) {
    $.get(target, countries => {
      $("main").empty();
      let currencies;

      for (const country of countries) {

        for (const item of country.currencies) {
          currencies += ` ${item.code} ${item.name} ${item.symbol} <b>|</b>`
        }

        $("main").append(`
              <div>
                  <img src=${country.flag} alt="isr">
                  <h3>Name: <span class="light">${country.name}</span></h3>
                  <h4>Capital: <span class="light">${country.capital}</span></h4>
                  <h4>Domain: <span class="light">${country.topLevelDomain}</span></h4>
                  <h4>Currencies: <span class="light">${currencies.replace(/undefined/g, '')}</span></h4>
              </div>
              `);
        currencies = '';
      }
    });
  }
});
