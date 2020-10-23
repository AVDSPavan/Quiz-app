import { API } from "../../backend";

export const getQuizs = () => {
	return fetch(`${API}/quizs`)
		.then((response) => {
			return response.json();
		})
		.catch((err) => { return err});
};

