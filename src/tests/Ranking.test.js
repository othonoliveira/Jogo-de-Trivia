import App from "../App";
import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import Ranking from "../pages/Ranking";

describe('Desenvolva testes para atingir 90% de cobertura da tela de Ranking', () => {
  test('Teste se renderiza o h1 Ranking', () => {
    renderWithRouterAndRedux(<Ranking />);

    const rankingTitle = screen.getByRole('heading', {name: /Ranking/i});
    expect(rankingTitle).toBeInTheDocument();
  });
  test('Verifique o nome e score do jogador na tela',() => {
    const name = screen.findByTestId(' `player-name-${index}`');
    expect(name).toBeVisible;

    const score = screen.findByTestId(' `player-score-${index}`');
    expect(score).toBeVisible;
  })
  test('Verifique se há o botão Play Again que redireciona para Home', () => {
    const { history } = renderWithRouterAndRedux(<App />);


    act(() => { history.push('/ranking'); });

    const btnPlayAgain = screen.getByTestId('btn-go-home')
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/')
  })
})