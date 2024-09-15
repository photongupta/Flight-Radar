const fetchData = (url: string) => {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject({ errorMessage: "API fetch fails" });
      }
    })
    .catch(() => {
      return Promise.reject({ errorMessage: "API fetch fails" });
    });
};

export const getFlights = () =>
  fetchData(`https://flight-status-mock.core.travelopia.cloud/flights`);
export const getFlightDetails = (id: number) =>
  fetchData(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`);
