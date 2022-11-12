import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import Game from "../pages/Game";
import App from "../App";

// correctAnswer - incorrectAnswers

describe('Desenvolva testes para atingir 90% de cobertura da tela de Jogo',() => {
  // jest.setTimeout(60000)
  // const timeout = 4000

  test('Verifique se existe um timer renderizado na pg', () => {
    renderWithRouterAndRedux(<Game />);

    const timer = screen.getByText(/Timer/i);
    expect(timer).toBeInTheDocument()
  });
  test('Verifique se há categoria e pergunta na pg', async () => {
    renderWithRouterAndRedux(<Game />)

        const categoria = screen.findByText(/Entertainment:/i)

        await waitFor(categoria, {timeout: 4000 })
        expect(categoria).toBeInTheDocument();
 

})
})