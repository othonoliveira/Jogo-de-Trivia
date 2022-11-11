import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import Feedback from "../pages/Feedback";
import { act } from "react-dom/test-utils";
import App from "../App";


describe('% Funcs e % Lines da linha Feedback é maior ou igual a 90.', () => {
  test('Se o placar com o valor total dos pontos e acertos são renderizados na tela de feedback', () => {
    renderWithRouterAndRedux(<Feedback />);

    const score = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    expect(score).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
  });

  test('Teste se é renderizado o botão Play Again e se o mesmo redireciona para home', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/feedback'); });

    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/')
  });
  test('Teste se é renderizado o botão Ranking e se o mesmo redireciona para a página Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/feedback'); });

    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/ranking')

  })
})