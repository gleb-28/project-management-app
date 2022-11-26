export const TEAM = [
	{
		fullName: 'Artsiom Fando',
		role: 'mentor',
		gitHubLink: 'https://github.com/artsiomfando/',
	},
	{
		fullName: 'Gleb Gruzdov',
		role: 'team lead',
		gitHubLink: 'https://github.com/gleb-28',
	},
	{
		fullName: 'Yan Chorny',
		role: 'team member',
		gitHubLink: 'https://github.com/janChorny',
	},
	{
		fullName: 'Nadya Rudenok',
		role: 'team member',
		gitHubLink: 'https://github.com/delfiahope',
	},
	{
		fullName: 'Anatoliy Aliaksandrau',
		role: 'team member',
		gitHubLink: 'https://github.com/AnAtoliyAK',
	},
];

export const LANGUAGES = ['en', 'ru'];

export const ERROR_MESSAGES_EN: { [key: number | string]: string } = {
	400: 'Something went wrong... Please try later',
	401: 'Sorry... Incorrect login or password',
	402: 'This file already exist',
	403: 'You are not logged in',
	404: 'Sorry.. Was not founded',
	409: 'This login already exist',
	LOGIN_DOES_NOT_EXIST: 'This login does not exist',
};

export const ERROR_MESSAGES_RU: { [key: number | string]: string } = {
	400: 'Что-то пошло не так... Пожалуйста, попробуйте позже',
	401: 'Извините... Неверный логин или пароль',
	402: 'Этот файл уже существует',
	403: 'Вы не авторизованы',
	404: 'Извините.. Не найдено',
	409: 'Этот логин уже существует',
	LOGIN_DOES_NOT_EXIST: 'Этот логин не существует',
};
