const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
	{
		question: "Подтверди, что ты не робот:",
		answers: ["Я не робот", "Я робот"],
		correct: 1,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();

submitButton.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
};

function showQuestion() {

	questions[questionIndex]['question'];

	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	headerContainer.innerHTML = title;

	let answerNumber = 1;


	for (answerText of questions[questionIndex]['answers']){
		const questionTemplate = ` <li>
																<label>
																	<input value="%number%" type="radio" class="answer" name="answer" />
																	<span>%answer%</span>
																</label>
															</li>`;

		let answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', answerNumber);

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	};

};

function checkAnswer() {
	checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if (!checkedRadio) {
		submitButton.blur();
		return;
	};

	const userAnswer = parseInt(checkedRadio.value);

	if (userAnswer == questions[questionIndex]['correct']) {
		score++;
	};

	if (questionIndex !== questions.length-1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		clearPage();
		showResults();
	}

};

function showResults() {
	const resultsTamplate = `	<h2 class="title">%title%</h2>
														<h3 class="summary">%message%</h3>
														<p class="result">%result%</p>`;
														
	let title, message;

	if (score == questions.length) {
		title = 'Поздравляю! 🎉';
		message = 'Ты ответил на все вопросы 😎';
	} else if ((score * 100) / questions.length > 50) {
		title = 'Неплохой результат! ✌';
		message = 'Ты дал более половины правильных ответов 😊';
	} else {
		title = 'Стоит постараться (╯°□°）╯';
		message = 'Пока у тебя меньше половины правильных ответов 😢';
	}

	let result = `${score} из ${questions.length}`;

	const finalMessage = resultsTamplate.replace('%title%', title).replace('%message%', message).replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	submitButton.blur();
	submitButton.innerText = 'Начать заново';
	submitButton.onclick = function() {
		history.go();
	};
};