import userEvent from "@testing-library/user-event";
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import Game from "../pages/Game";
import App from "../App";
import { mock_test, invalidToken} from './helpers/mock_test';

// correctAnswer - incorrectAnswers

describe('Desenvolva testes para atingir 90% de cobertura da tela de Jogo',() => {

  test('Verifique se existe um timer renderizado na pg', () => {
    renderWithRouterAndRedux(<Game />);

    const timer = screen.getByText(/Timer/i);
    expect(timer).toBeInTheDocument()
  });
  test('Verifique se as informações do player estão na tela', async () => {

    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock_test),
    });
   
    renderWithRouterAndRedux(<App />);
    const name = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: /play/i });
    userEvent.type(name, 'Maria Clara');
    userEvent.type(email, 'maria@test.com');
    userEvent.click(btnPlay);

    await waitFor(() => {
      const img = screen.getByTestId('header-profile-picture');
      expect(img).toBeInTheDocument();
    }, 5000);

    const nameGame = screen.getByTestId('header-player-name');
    expect(nameGame).toBeInTheDocument();
    const score = screen.getByTestId('header-score');
    expect(score).toBeInTheDocument();
 
  });
  test('Verifique se a categoria e pergunta estão presentes na tela', async () => {

    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock_test),
    });
    renderWithRouterAndRedux(<Game />);

    await waitFor(() => {
      const categoria = screen.getByTestId("question-category");
      expect(categoria).toBeVisible();
      const pergunta = screen.getByTestId("question-text");
      expect(pergunta).toBeInTheDocument();
    })

    });
  
  test('Verifique se as opções de respostas são renderizadas na tela e se respondem ao click', async () => {

    localStorage.setItem('token', '504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mock_test),
    });
    renderWithRouterAndRedux(<Game />);

    await waitFor(()=>{
    const respostas = screen.getByTestId('answer-options');
    expect(respostas).toBeInTheDocument();
    userEvent.click(respostas);
  })

  })
  })

