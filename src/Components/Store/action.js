// Action types
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Action creators
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});
export const fetchChartData = (chartType, chartData) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:5000/generate_chart", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chartType, chartData }),
      });

      if (response.ok) {
        const chartData = await response.json();
        dispatch(fetchDataSuccess(chartData));
      } else {
        dispatch(fetchDataFailure('Error fetching data'));
      }
    } catch (error) {
      dispatch(fetchDataFailure('Error fetching data'));
    }
  };
};
